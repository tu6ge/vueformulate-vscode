import {InputValidation} from '@/document'
import { SnippetString } from 'vscode'

function numberLimitInsertText(value:string): SnippetString{
  let maxMinInsertText: SnippetString = new SnippetString
  maxMinInsertText.appendText(`${value}:`)
  maxMinInsertText.appendTabstop()
  maxMinInsertText.appendText(',')
  maxMinInsertText.appendChoice(['length','value'])
  return maxMinInsertText
}

export const validations: InputValidation[] = [
  {
    name:'accepted',
    description: '该规则要求输入的值必须是 yes, on, 1 或 true. 对于复选框很有用，通常需要验证某人是否接受了条款。',
    link:'/guide/validation/#accepted',
  },
  {
    name:'after',
    description: `检查日期是否在另一个日期之后。如果未提供日期参数，则将使用当前时间。
    该值必须是 Date 对象或可被 Date.parse 求值的字符串。
     [在 MDN 上阅读更多 Date.parse 信息](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse)`,
    link:'/guide/validation/#after',
    insertText: new SnippetString('after:')
  },
  {
    name:'alpha',
    description: `检查值是否仅为字母字符。有两个字符集 \`latin\` 和 \`default\`. 前者是严格 \`[a-zA-Z]\` 规则，
    而 \`default\` 集包括最重音符号，如: \`ä\`, \`ù\`, 或 \`ś\`.`,
    link:'/guide/validation/#alpha',
    insertText: new SnippetString('alpha:').appendChoice(['default','latin'])
  },
  {
    name:'alphanumeric',
    description: `检查输入的值是否仅由字母字符或数字组成。对于字母部分，您可以通过 \`default\` 或 \`latin\` - 
    请参阅 [alpha](__DOCS_SITE__/guide/validation/#alpha)`,
    link:'/guide/validation/#alpha',
    insertText: new SnippetString('alphanumeric:').appendChoice(['default','latin'])
  },
  {
    name:'bail',
    description: `用于在第一个后续验证错误时在逻辑上停止验证。有关保释规则的更多
    详细文档位于 [停止验证部分](__DOCS_SITE__/guide/validation/#stopping-validation)`
  },
  {
    name:'before',
    description: `检查日期是否在另一个日期之前。如果未提供日期参数，则将使用当前时间。
    该值必须是 Date 对象或可被 Date.parse 求值的字符串。
     [在 MDN 上阅读更多 Date.parse 信息](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse)`,
    link:'/guide/validation/#before',
    insertText: new SnippetString('before:')
  },
  {
    name:'between',
    description: [
      `检查数字或字符串长度是否介于最小值或最大值之间。
      最大值和最小值都是互斥的。如果要验证的值是字符串，
      则使用字符串的长度进行比较。如果使用数字，则使用数值进行比较。在 \`v2.2.4+\` 版本
      中你可以强制它总是通过一个可选的第三个参数设置检查数值或字符串长度 \`value\` 或 \`length\` 。`,
      '\n',
      '*********** \n',
      '*提示*\n',
      '如果你希望限制日期在两个日期之间，请考虑使用 \`before\` 和 \`after\` 的验证规则。\n\n'
    ],
    link:'/guide/validation/#between',
    insertText: 
      new SnippetString('between:')
      .appendTabstop()
      .appendText(',')
      .appendTabstop()
      .appendText(',')
      .appendChoice(['value','length'])
  },
  {
    name:'confirm',
    description:[
      `检查字段值是否与另一个字段的值匹配。主要用于隐藏字段 - 如密码确认。 
      默认情况下，\`confirm\` 规则将在同一 \`FormulateForm\` 中查找
      后缀为 \`_confirm\` 的其他字段。\n`,
      `如果你希望规则使用不同的字段作为
      密码确认，只需像这样 \`confirm:other_field\` 将另一个字段名称作为
      参数传递给规则即可。\n`,
      '******\n',
      '*提示*\n',
      '此规则仅适用于一个 `<FormulateForm>` 或一个 `group` 类型的上下文中。\n'
    ],
    link:'/guide/validation/#confirm',
  },
  {
    name:'date',
    description:[
      `借助 \`Date.parse()\` 来检查输入值是否为有效日期 ，或者如果提供了格式参数，它将根据给定的格式进行验证。格式变量是：\r\n`,
      '- `MM` 两位数月份表示 (01-12) \r\n',
      '- `M`  允许单数月份表示 (1-12) 无导零 \r\n',
      '- `DD` 月份中的两位数日期 (01-31) \r\n',
      '- `D`  一个月中的一位日期数 (1-31)，无前导零 \r\n',
      '- `YY` 两位数的年份 \r\n',
      '- `YYYY` 四位数年份 \r\n',
      '******\n',
      '*警告*\r',
      '小心！此验证规则将验证是否遵循您请求的格式，但不会验证日期是否存在（例如 `02/31/2008`）。\n'
    ],
    link:'/guide/validation/#date',
    insertText:
      new SnippetString('date:')
      .appendChoice(['MM','M','DD','D','YY','YYYY'])
      .appendText('/')
      .appendChoice(['MM','M','DD','D','YY','YYYY'])
      .appendText('/')
      .appendChoice(['MM','M','DD','D','YY','YYYY'])
  },
  {
    name:'email',
    description:`检查输入的值是否为有效的电子邮件地址格式。`,
    link:'/guide/validation/#email',
  },
  {
    name:'ends_with',
    description:`检查输入的值是否以提供的选项之一结束`,
    link:'/guide/validation/#ends_with',
    insertText:
      new SnippetString('ends_with:')
  },
  {
    name:'in',
    description:`检查输入的值是否包含在选项数组中。`,
    link:'/guide/validation/#in',
    insertText:
      new SnippetString('in:')
  },
  {
    name:'matches',
    description:[
      `检查输入的值是否与特定值或模式匹配。如果您传递多个参数，它会检查每个参数，直到找到匹配项。\n`,
      '参数也可以是正则表达式。使用字符串语法时，以斜杠开始和结束参数 `/`（不要转义额外的斜杠）。\n',
      '使用字符串语法时，您不能转义用于定义验证规则本身的字符 (`|,:`). 要在正则表达式中使用这些',
      '字符， 您必须使用备用的 [数组语法](__DOCS_SITE__/guide/validation/#数组语法)。'
    ],
    link:'/guide/validation/#matches',
    insertText:
      new SnippetString('matches:')
  },
  {
    name:'max',
    description:[
      '检查一个 `Number` 的值, 或一个 `String` 或 `Array` 的长度是否小于某个值。默认值是 `10` \n',
      '可以使用第二个参数来强制验证器验证 `length` 或 `value`。\n',
      '******\n',
      '*提示*',
      '评估 `Array` 时第二个参数（长度/值）时将被忽略。'
    ],
    link:'/guide/validation/#max',
    insertText: numberLimitInsertText('max')
  },
  {
    name:'mime',
    description:[
      '**检查所选文件的类型是否为允许值。** 此验证器使用文件的扩展名来确定 [mime 类型](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)。',
      '我们仍然强烈鼓励对文件内容进行后端验证，因为精明的用户可以绕过前端验证。\n',
      '******\n',
      '*提示*',
      '使用 `multiple` 选项的属性验证字段时，如果任何选定的文件不是正确的 `mime`，验证将失败。'
    ],
    link:'/guide/validation/#mime',
    insertText:
      new SnippetString('mime:')
      .appendChoice([
        'image/jpeg,image/png',
        'image/jpeg',
        'image/png',
        'application/pdf',
      ])
  },
  {
    name:'min',
    description:[
      '检查一个 `Number` 的值, 或一个 `String` 或 `Array` 的长度是否大于某个值。默认值是 `10` \n',
      '可以使用第二个参数来强制验证器验证 `length` 或 `value`。\n',
      '******\n',
      '*提示*',
      '评估 `Array` 时第二个参数（长度/值）时将被忽略。'
    ],
    link:'/guide/validation/#min',
    insertText: numberLimitInsertText('min')
  },
  {
    name:'not',
    description: '要求输入的数据与一组预定义的任意的值都不匹配。',
    link:'/guide/validation/#not',
    insertText: new SnippetString('not:')
  },
  {
    name:'number',
    description: '检查输入是否为由 `isNaN()` 评估的有效数字。',
    link:'/guide/validation/#number',
  },
  {
    name:'optional',
    description: '使用此规则可将字段设为可选。使用时，如果值为空，则所有验证规则都会通过。它在验证规则列表中的位置没有影响。',
    link:'/guide/validation/#optional',
  },
  {
    name:'required',
    description: '检查输入值是否为空。',
    link:'/guide/validation/#required',
    insertText: 
      new SnippetString('required')
      .appendPlaceholder(':trim')
  },
  {
    name:'starts_with',
    description: '检查输入的值是否以提供的选项之一开头',
    link:'/guide/validation/#starts_with',
    insertText: 
      new SnippetString('starts_with')
  },
  {
    name:'url',
    description: '检查输入值是否显示为包含协议的格式正确的 URL。这不会检查 URL 是否实际解析。',
    link:'/guide/validation/#starts_with',
  },
]