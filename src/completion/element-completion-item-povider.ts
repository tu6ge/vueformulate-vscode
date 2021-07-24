import { TagObject } from '@/hover-tips'
import {
  CompletionItemProvider,
  TextDocument,
  Position,
  CancellationToken,
  ProviderResult,
  Range,
  CompletionItem,
  CompletionContext,
  CompletionList,
  CompletionItemKind,
  workspace,
  MarkdownString,
  SnippetString,
  env
} from 'vscode'

import CnDocument from '../document/zh-CN'
import { typeAttribute as CnTypeAttribute, typeValues as CnTypeValues, validations as CnValidations } from '../document/zh-CN'
import EnDocument from '../document/en-US'
import { typeAttribute as EnTypeAttribute, typeValues as EnTypeValues, validations as EnValidations } from '../document/en-US'
import { ExtensionConfigutation, ExtensionLanguage } from '..'
import { DocumentAttribute, DocumentEvent, DocumentMethod, ElDocument, TypeAttribute, InputType, InputValidation } from '@/document'
import { TextDecoder } from 'node:util'

export class ElementCompletionItemProvider implements CompletionItemProvider<CompletionItem> {
  private _document!: TextDocument
  private _position!: Position
  private token!: CancellationToken
  private tagReg: RegExp = /<([\w-]+)\s*/g
  private attrReg: RegExp = /(?:|\s*)([\w-]+)=['"][^'"]*/
  private tagStartReg: RegExp = /<([\w-]*)$/
  private pugTagStartReg: RegExp = /^\s*[\w-]*$/
  private typeReg: RegExp = /type=\"([^\"]*)\"/
  private validationContinue: RegExp = /validation\=\"([\w\|\:\,]+)|$/
  private size!: number
  private quotes!: string
  private formulateDocument: Record<string, any>
  private typeAttribute: TypeAttribute[]
  private docsSite: string
  private typeValues: InputType[]
  private validations: InputValidation[]
  private lang = {
    attr:'',
  }
  private currentLang:string

  constructor() {
    const config = workspace.getConfiguration().get<ExtensionConfigutation>('vueformulate-helper')

    this.currentLang = env.language //zh-cn en
    if (env.language !== 'zh-cn') {
      this.formulateDocument = EnDocument
      this.typeAttribute = EnTypeAttribute
      this.docsSite = 'https://tu6ge.github.io/vueformulate.com'
      this.typeValues = EnTypeValues
      this.validations = EnValidations
      this.lang.attr = 'attribute'
    } else {
      this.formulateDocument = CnDocument
      this.typeAttribute = CnTypeAttribute
      this.docsSite = 'https://tu6ge.github.io/vueformulate.com/zh'
      this.typeValues = CnTypeValues
      this.validations = CnValidations
      this.lang.attr = '属性'
    }
  }

  replaceSiteUrl(description: string): string {
    return description.replaceAll('__DOCS_SITE__', this.docsSite)
  }

  markdownDocsLink(links:string): string{
    if(this.currentLang !== 'zh-cn'){
      return ` @see [documents](${this.docsSite}${links})`
    }else{
      return ` 查看 [文档](${this.docsSite}${links}) 了解更多`
    }
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

  getFormulateType(): string {
    let line = this._position.line
    let txt = this._document.lineAt(line).text
    let match: RegExpExecArray | null
    if ((match = this.typeReg.exec(txt))) {
      return match[1]
    }
    return ''
  }

  /**
   * 获取前置属性
   */
  getPreAttr(): string {
    let txt = this.getTextBeforePosition(this._position).replace(/"[^'"]*(\s*)[^'"]*$/, '')
    let end = this._position.character
    let start = txt.lastIndexOf(' ', end) + 1
    let parsedTxt = this._document.getText(new Range(this._position.line, start, this._position.line, end))
    return this.matchAttr(this.attrReg, parsedTxt)
  }

  /**
   * 获取前置验证器
   */
  getValidationPreValue(): boolean {
    let txt = this.getTextBeforePosition(this._position)
    return !!txt[0]
  }

  /**
   * 匹配属性
   *
   * @param reg 匹配模式
   * @param txt 匹配文本
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
   * 匹配标签
   * @param reg 匹配模式
   * @param txt 匹配文本
   * @param line 当前行
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
   * 获取当前位置之前的字符串
   *
   * @param position 位置
   */
  getTextBeforePosition(position: Position): string {
    var start = new Position(position.line, 0)
    var range = new Range(start, position)
    return this._document.getText(range)
  }

  /**
   * 是否位属性值的开始
   * @param tag 标签
   * @param attr 属性
   */
  isAttrValueStart(tag: Object | undefined, attr: string) {
    return !!tag && !!attr
  }

  /**
   * 是否位属性的开始
   * @param tag 标签
   */
  isAttrStart(tag: TagObject | undefined) {
    const preText = this.getTextBeforePosition(this._position)
    return tag && /\ :?[\w-]*$/.test(preText)
  }

  /**
   * 是否为方法的开始
   * @param tag 标签
   */
  isEventStart(tag: TagObject | undefined) {
    const preText = this.getTextBeforePosition(this._position)
    return tag && /\ \@[\w-]*$/.test(preText)
  }

  /**
   * 获取属性值
   *
   * @param tag 标签
   * @param attr 属性
   */
  getAttrValues(tag: string, attr: string, formulateType: string): string[] {
    let attributes: DocumentAttribute[] = this.formulateDocument[tag].attributes || []
    if (formulateType) {
      let typeItem = this.typeAttribute.find((res) => {
        return res.name === formulateType
      })
      if (typeItem) {
        attributes = attributes.concat(typeItem.attributes)
      }
    }

    const attribute: DocumentAttribute | undefined = attributes.find((attribute) => attribute.name === attr)

    if (!attribute) {
      return []
    }
    const values = attribute.value.split(/[,\/\\]/).map((item) => item.trim())
    return values
  }

  /**
   * 获取属性值的提示信息
   *
   * @param tag 标签
   * @param attr 属性
   */
  getAttrValueCompletionItems(tag: string, attr: string, formulateType: string): CompletionItem[] {
    let completionItems: CompletionItem[] = []
    const values = this.getAttrValues(tag, attr, formulateType)

    values.forEach((value) => {
      if (/\w+/.test(value)) {
        let documentation: MarkdownString = new MarkdownString('', true)

        let insertText: SnippetString | undefined

        if (attr === 'type') {
          documentation = this.getAttrValueMarkdownByTypeValue(value)
        } else if (attr === 'validation') {
          documentation = this.getAttrValueMarkdownByValidation(value)
          insertText = this.getAttrValueInsertTextByValidation(value)
        }
        completionItems.push({
          label: `${value}`,
          sortText: `0${value}`,
          detail: `${tag}-${attr}`,
          kind: CompletionItemKind.Value,
          insertText: insertText || value,
          documentation: documentation
        })
      }
    })
    return completionItems
  }

  /**
   * 计算表单域类型的文档
   * @param typeValue 表单域类型
   * @returns
   */
  private getAttrValueMarkdownByTypeValue(typeValue: string): MarkdownString {
    let typeInfo: InputType | undefined
    typeInfo = this.typeValues.find((res) => {
      return res.name === typeValue
    })

    let documentation: MarkdownString = new MarkdownString('', true)
    if (typeInfo === undefined) {
      return documentation
    }

    documentation.appendMarkdown(this.replaceSiteUrl(typeInfo.description))
    if(typeInfo.link){
      documentation.appendMarkdown(this.markdownDocsLink(typeInfo.link))
    }
    
    return documentation
  }

  /**
   * 计算验证器的文档
   * @param validation 验证器
   * @returns
   */
  private getAttrValueMarkdownByValidation(validation: string): MarkdownString {
    let typeInfo: InputValidation | undefined
    typeInfo = this.validations.find((res) => {
      return res.name === validation
    })

    let documentation: MarkdownString = new MarkdownString('', true)
    if (typeInfo === undefined) {
      return documentation
    }
    if (typeof typeInfo.description === 'string') {
      documentation.appendMarkdown(this.replaceSiteUrl(typeInfo.description))
    } else {
      typeInfo.description.map((res) => {
        documentation.appendMarkdown(this.replaceSiteUrl(res))
      })
    }

    if(typeInfo.link){
      documentation.appendMarkdown(this.markdownDocsLink(typeInfo.link))
    }

    return documentation
  }

  /**
   * 计算验证器的文档
   * @param validation 验证器
   * @returns
   */
  private getAttrValueInsertTextByValidation(validation: string): SnippetString | undefined {
    let typeInfo: InputValidation | undefined
    typeInfo = this.validations.find((res) => {
      return res.name === validation
    })

    if (typeInfo === undefined || typeInfo.insertText === undefined) {
      return undefined
    }
    return typeInfo.insertText
  }

  /**
   * 获取事件名称提示
   *
   * @param tag 标签
   */
  getEventCompletionItems(tag: string, formulateType: string): CompletionItem[] {
    let completionItems: CompletionItem[] = []
    const preText = this.getTextBeforePosition(this._position)
    const prefix = preText.replace(/.*@([\w-]*)$/, '$1')

    let events: DocumentEvent[] = this.formulateDocument[tag]?.events || []

    if (formulateType) {
      let typeItem = this.typeAttribute.find((res) => {
        return res.name === formulateType
      })
      if (typeItem && typeItem.events) {
        events = events.concat(typeItem.events)
      }
    }

    const likeTag = events.filter((evnet: DocumentEvent) => evnet.name.includes(prefix))
    likeTag.forEach((event: DocumentEvent) => {
      let description = event.description
      description = description.replaceAll('__DOCS_SITE__', this.docsSite)

      let descMD: MarkdownString = new MarkdownString('', true)
      descMD.appendMarkdown(description)

      const start = preText.lastIndexOf('@') + 1
      const end = start + prefix.length
      const startPos = new Position(this._position.line, start)
      const endPos = new Position(this._position.line, end)
      const range = new Range(startPos, endPos)
      completionItems.push({
        label: `${event.name}`,
        sortText: `0${event.name}`,
        detail: `${tag} Event`,
        documentation: descMD,
        kind: CompletionItemKind.Value,
        insertText: event.name,
        range
      })
    })
    return completionItems
  }

  /**
   * 获取属性的提示信息
   *
   * @param tag 标签
   */
  getAttrCompletionItems(tag: string, formulateType: string): CompletionItem[] {
    let completionItems: CompletionItem[] = []
    const preText = this.getTextBeforePosition(this._position)
    const prefix = preText.replace(/.*[\s@:]/g, '')
    const attributes: DocumentAttribute[] = this.formulateDocument[tag].attributes || []
    let likeTag = attributes.filter((attribute: DocumentAttribute) => attribute.name.includes(prefix))

    if (formulateType) {
      let typeItem = this.typeAttribute.find((res) => {
        return res.name === formulateType
      })
      if (typeItem) {
        likeTag = likeTag.concat(typeItem.attributes)
      }
    }

    likeTag.forEach((attribute: DocumentAttribute) => {
      const start = Math.max(preText.lastIndexOf(' '), preText.lastIndexOf(':')) + 1
      const end = start + prefix.length
      const startPos = new Position(this._position.line, start)
      const endPos = new Position(this._position.line, end)
      const range = new Range(startPos, endPos)
      completionItems.push({
        label: `${attribute.name}`,
        sortText: `0${attribute.name}`,
        detail: `${tag} ${this.lang.attr}`,
        documentation: 
          new MarkdownString(this.replaceSiteUrl(attribute.description))
          .appendMarkdown('\n\n')
          .appendMarkdown(this.markdownDocsLink(attribute.link || '')),
        kind: CompletionItemKind.Value,
        insertText: attribute.name,
        range
      })
    })

    return completionItems
  }

  /**
   * 是否位标签的开始
   */
  isTagStart(): boolean {
    let txt = this.getTextBeforePosition(this._position)
    return this.tagStartReg.test(txt)
  }

  /**
   * 获取标签提示
   */
  getTagCompletionItems(tag: string): CompletionItem[] {
    let completionItems: CompletionItem[] = []
    const preText = this.getTextBeforePosition(this._position)

    Object.keys(this.formulateDocument).forEach((key) => {
      const start = preText.lastIndexOf('<') + 1
      const end = preText.length - start + 1
      const startPos = new Position(this._position.line, start)
      const endPos = new Position(this._position.line, end)
      const range = new Range(startPos, endPos)

      let snippetString: SnippetString = new SnippetString()
      snippetString.appendText(`${key}`)
      snippetString.appendTabstop()
      snippetString.appendText(`>`)
      snippetString.appendTabstop()
      snippetString.appendText(`</${key}>`)
      completionItems.push({
        label: `${key}`,
        sortText: `0${key}`,
        detail: 'Vue Formulate Tag',
        kind: CompletionItemKind.Value,
        insertText: snippetString,
        range
      })
    })
    return completionItems
  }

  /**
   * 提供自动完成提示
   *
   * @param document 文档
   * @param position 位置
   * @param token token
   * @param context 上下文
   */
  provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken, context: CompletionContext): ProviderResult<CompletionItem[] | CompletionList<CompletionItem>> {
    this._document = document
    this._position = position
    this.token = token

    let tag: TagObject | undefined = this.getPreTag()
    let attr = this.getPreAttr()

    let formulateType = this.getFormulateType()

    if (!tag || !/^[F|f]orm/.test(tag.text || '')) {
      // 如果不是element的标签(E|el开头) 则返回 null 表示没有hover
      return null
    } else if (this.isAttrValueStart(tag, attr)) {
      // 如果是属性值的开始
      return this.getAttrValueCompletionItems(tag.text, attr, formulateType)
    } else if (this.isEventStart(tag)) {
      // 优先判定事件
      return this.getEventCompletionItems(tag.text, formulateType)
    } else if (this.isAttrStart(tag)) {
      // 判断属性
      return this.getAttrCompletionItems(tag.text, formulateType)
    } else if (this.isTagStart()) {
      // 判断标签
      return this.getTagCompletionItems(tag.text)
    }

    return null
  }
}
