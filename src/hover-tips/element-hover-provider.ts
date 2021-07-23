import { HoverProvider, TextDocument, Position, CancellationToken, ProviderResult, Hover, workspace, MarkdownString, Range } from 'vscode'
import CnDocument from '../document/zh-CN'
import {typeAttribute as CnTypeAttribute} from '../document/zh-CN'
import EnDocument from '../document/en-US'
import {TypeAttribute} from '../document'

import { generator, toKebabCase } from '../utils'
import { ExtensionConfigutation, ExtensionLanguage } from '../'
import { TagObject } from '.'

export class ElementHoverProvier implements HoverProvider {
  private _position!: Position
  private _document!: TextDocument
  private _token!: CancellationToken
  private tagReg: RegExp = /<([\w-]+)\s*/g
  private attrReg: RegExp = /(?:\(|\s*)([\w-]+)=?/
  private typeReg: RegExp = /type=\"([^\"]*)\"/
  private instance: Record<string, null | undefined | Hover> = {}

  provideHover(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Hover> {
    this._document = document
    this._position = position
    this._token = token

    const tag: TagObject | undefined = this.getTag()

    if (!/^[F|f]ormulate/.test(tag?.text || '')) {
      // 如果不是element的标签(E|el开头) 则返回 null 表示没有hover
      return null
    }

    const attr = this.getAttr()
    const range = this.getHoverRange(attr)

    return this.getHoverInstance(tag, attr, range)
  }

  /**
   * 获取标签
   */
  getTag(): TagObject | undefined {
    let line = this._position.line
    let tag: TagObject | string | undefined
    let txt = this.getTextAfterPosition(this._position)

    // 向前搜索 最多十行 搜索标签
    while (this._position.line - line < 10 && line >= 0) {
      if (line !== this._position.line) {
        txt = this._document.lineAt(line).text
      }
      tag = this.matchTag(this.tagReg, txt, line)
      if (tag === 'break') {
        return undefined
      }
      if (tag) {
        return <TagObject>tag
      }
      line--
    }
    return undefined
  }

  /**
   * 获取属性
   */
  getAttr(): string {
    const txt = this.getTextAfterPosition(this._position)
    let end = txt.length
    let start = txt.lastIndexOf(' ', this._position.character) + 1
    let parsedTxt = this._document.getText(new Range(this._position.line, start, this._position.line, end))
    return this.matchAttr(this.attrReg, parsedTxt)
  }

  getFormulateType(): string {
    let txt = this.getTextAfterPosition(this._position)
    let match: RegExpExecArray | null
    if( match =this.typeReg.exec(txt)) {
      return match[1]
    }
    return ''
  }

  /**
   * 获取高亮范围
   * @param attr 属性名称
   */
  getHoverRange(attr: string): Range {
    const line = this._document.lineAt(this._position.line).text
    const start = line.indexOf(attr)
    const end = start + attr.length
    const range = new Range(this._position.line, start, this._position.line, end)
    return range
  }

  /**
   * 匹配标签
   * @param reg 匹配模式串
   * @param txt 待匹配字符
   * @param line 匹配行
   */
  matchTag(reg: RegExp, txt: string, line: number): TagObject | string | undefined {
    let match: RegExpExecArray | null
    let arr: TagObject[] = []

    if (/<\/?[-\w]+[^<>]*>[\s\w]*<?\s*[\w-]*$/.test(txt) || (this._position.line === line && (/^\s*[^<]+\s*>[^<\/>]*$/.test(txt) || /[^<>]*<$/.test(txt[txt.length - 1])))) {
      return 'break'
    }
    while ((match = reg.exec(txt))) {
      arr.push({
        text: match[1],
        offset: this._document.offsetAt(new Position(line, match.index))
      })
    }
    return arr.pop()
  }

  /**
   * 匹配标签
   *
   * @param reg 匹配模式
   * @param txt 待匹配字符
   */
  matchAttr(reg: RegExp, txt: string): string {
    let match: RegExpExecArray | null
    match = reg.exec(txt)
    if (!/"[^"]*"/.test(txt) && match) {
      return match[1]
    }
    return ''
  }

  /**
   * 获取前置内容
   * @param position 位置信息
   */
  getTextBeforePosition(position: Position): string {
    const wordRange = this._document.getWordRangeAtPosition(position)
    const start = new Position(position.line, 0)
    const end = wordRange?.end || position
    const range = new Range(start, end)
    return this._document.getText(range)
  }

  /**
   * 获取当前位置直到单词结束的内容
   *
   * @param position 文档位置
   */
  getTextAfterPosition(position: Position): string {
    const wordRange = this._document.getWordRangeAtPosition(position)
    const start = new Position(position.line, 0)
    let endIndex = (wordRange?.end || position).character
    const text = this._document.lineAt(position).text
    while (endIndex < text.length && /[\w-]/.test(text.charAt(endIndex))) {
      endIndex++
    }
    const end = new Position(position.line, endIndex)
    const range = new Range(start, end)
    return this._document.getText(range)
  }

  /**
   * 获取Hover实例
   *
   * @param tag 标签
   * @param attr 属性
   * @param range 区域
   */
  getHoverInstance(tag: TagObject | undefined, attr: string, range: Range) {
    const config = workspace.getConfiguration().get<ExtensionConfigutation>('vueformulate-helper')
    const language = config?.language || ExtensionLanguage.cn

    const kebabCaseTag = tag?.text || ''
    //const kebabCaseAttr = toKebabCase(attr)

    return this.createHoverInstance(language, kebabCaseTag, attr, range)
  }

  /**
   * 创建Hover实例
   *
   * @param language 语言
   * @param tag 标签
   * @param attr 属性
   * @param range 范围
   */
  createHoverInstance(language: ExtensionLanguage, tag: string, attr: string, range: Range): null | Hover {
    let document: Record<string, any>
    let typeAttribute: TypeAttribute[]
    if (language === ExtensionLanguage.en) {
      document = EnDocument
      typeAttribute = []
    } else {
      document = CnDocument
      typeAttribute = CnTypeAttribute
    }
    if (tag === attr) {
      attr = ''
    }
    let formulateType = this.getFormulateType();
    //console.log(formulateType)

    if (!Object.prototype.hasOwnProperty.call(document, tag)) {
      return null
    }

    let tagDocument = document[tag].attributes

    if(formulateType){
      let typeItem = typeAttribute.find(res=>{
        return res.name === formulateType
      })
      if(typeItem){
        tagDocument = tagDocument.concat(typeItem.attributes)
      }
    }
    const attributes = tagDocument.find(res=>{
      return res.name === attr
    })
    if(attributes===undefined){
      return null
    }
    
    const hoverMarkdownStrings: MarkdownString[] = []
    let markdown: MarkdownString = new MarkdownString('', true);
    markdown.appendMarkdown(`**${attributes.description}**\n`)
    markdown.appendMarkdown('**********\n')
    markdown.appendMarkdown(`属性类型是 ${attributes.type}`)
    if(attributes.value){
      markdown.appendMarkdown(`，可用的属性值有: ${attributes.value}`)
    }
    markdown.appendMarkdown('\n\n')
    if(attributes.link){
      markdown.appendMarkdown(`[文档链接](https://tu6ge.github.io/vueformulate.com/zh${attributes.link})`)
    }
    hoverMarkdownStrings.push(markdown)
    return new Hover(hoverMarkdownStrings, range)
  }
}