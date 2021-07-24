import { HoverProvider, TextDocument, Position, CancellationToken, ProviderResult, Hover, workspace, MarkdownString, Range } from 'vscode'
import CnDocument from '../document/zh-CN'
import { typeAttribute as CnTypeAttribute } from '../document/zh-CN'
import EnDocument from '../document/en-US'
import { TypeAttribute } from '../document'

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
  private formulateDocument: Record<string, any>
  private typeAttribute: TypeAttribute[]
  private docsSite: string

  constructor() {
    const config = workspace.getConfiguration().get<ExtensionConfigutation>('vueformulate-helper')
    const language = config?.language || ExtensionLanguage.cn
    if (language === ExtensionLanguage.en) {
      this.formulateDocument = EnDocument
      this.typeAttribute = []
      this.docsSite = 'https://tu6ge.github.io/vueformulate.com'
    } else {
      this.formulateDocument = CnDocument
      this.typeAttribute = CnTypeAttribute
      this.docsSite = 'https://tu6ge.github.io/vueformulate.com/zh'
    }
  }

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
    let preTag: TagObject | undefined = this.getPreTag()

    const range = this.getHoverRange(attr)

    const kebabCaseTag = tag?.text || ''

    if (this.isEventStart(preTag)) {
      return this.createHoverEventInstance(kebabCaseTag, attr, range)
    }

    return this.createHoverAttributeInstance(kebabCaseTag, attr, range)
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

  /**
   * 获取前置标签
   */
  getPreTag(): TagObject | undefined {
    let line = this._position.line
    let tag: TagObject | string | undefined
    let txt = this.getTextBeforePosition(this._position)

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
   * 是否为方法的开始
   * @param tag 标签
   */
  isEventStart(tag: TagObject | undefined) {
    const preText = this.getTextBeforePosition(this._position)
    return tag && /\ \@[\w-]*$/.test(preText)
  }

  getFormulateType(): string {
    let txt = this.getTextAfterPosition(this._position)
    let match: RegExpExecArray | null
    if ((match = this.typeReg.exec(txt))) {
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
   * 创建Hover实例 属性
   *
   * @param language 语言
   * @param tag 标签
   * @param attr 属性
   * @param range 范围
   */
  createHoverAttributeInstance(tag: string, attr: string, range: Range): null | Hover {
    if (tag === attr) {
      return null
    }
    let formulateType = this.getFormulateType()
    //console.log(formulateType)

    if (!Object.prototype.hasOwnProperty.call(this.formulateDocument, tag)) {
      return null
    }

    let tagDocument = this.formulateDocument[tag].attributes

    if (formulateType) {
      let typeItem = this.typeAttribute.find((res) => {
        return res.name === formulateType
      })
      if (typeItem) {
        tagDocument = tagDocument.concat(typeItem.attributes)
      }
    }
    const attributes = tagDocument.find((res) => {
      return res.name === attr
    })
    if (attributes === undefined) {
      return null
    }

    const hoverMarkdownStrings: MarkdownString[] = []
    let markdown: MarkdownString = new MarkdownString('', true)

    // __DOCS_SITE__ 替换成 https://tu6ge.github.io/vueformulate.com/zh

    markdown.appendMarkdown(`**${attributes.description}**\n`)
    markdown.appendMarkdown('**********\n')
    markdown.appendMarkdown(`属性类型是 ${attributes.type}`)
    if (attributes.value) {
      markdown.appendMarkdown(`，可用的属性值有: ${attributes.value}`)
    }
    markdown.appendMarkdown('\n\n')
    if (attributes.link) {
      markdown.appendMarkdown(`[文档链接](${this.docsSite}${attributes.link})`)
    }
    hoverMarkdownStrings.push(markdown)
    return new Hover(hoverMarkdownStrings, range)
  }

  /**
   * 创建Hover实例 事件
   *
   * @param language 语言
   * @param tag 标签
   * @param attr 属性
   * @param range 范围
   */
  createHoverEventInstance(tag: string, attr: string, range: Range): null | Hover {
    if (tag === attr) {
      return null
    }
    let formulateType = this.getFormulateType()
    //console.log(formulateType)

    if (!Object.prototype.hasOwnProperty.call(this.formulateDocument, tag)) {
      return null
    }

    let tagDocument = this.formulateDocument[tag].events

    if (formulateType) {
      let typeItem = this.typeAttribute.find((res) => {
        return res.name === formulateType
      })
      if (typeItem && typeItem.events) {
        tagDocument = tagDocument.concat(typeItem.events)
      }
    }
    const events = tagDocument.find((res) => {
      return res.name === attr
    })
    if (events === undefined) {
      return null
    }

    const hoverMarkdownStrings: MarkdownString[] = []
    let markdown: MarkdownString = new MarkdownString('', true)

    markdown.appendMarkdown(`${events.description}\n`)
    markdown.appendMarkdown('**********\n')
    markdown.appendMarkdown('\n\n')
    if (events.link) {
      markdown.appendMarkdown(`[文档链接](${this.docsSite}${events.link})`)
    }
    hoverMarkdownStrings.push(markdown)
    return new Hover(hoverMarkdownStrings, range)
  }
}
