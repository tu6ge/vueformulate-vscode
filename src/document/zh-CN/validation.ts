import {InputValidation} from '@/document'

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
  },
  {
    name:'alpha',
    description: `检查值是否仅为字母字符。有两个字符集 \`latin\` 和 \`default\`. 前者是严格 \`[a-zA-Z]\` 规则，
    而 \`default\` 集包括最重音符号，如: \`ä\`, \`ù\`, 或 \`ś\`.`,
    link:'/guide/validation/#alpha',
  },
  {
    name:'alphanumeric',
    description: `检查输入的值是否仅由字母字符或数字组成。对于字母部分，您可以通过 \`default\` 或 \`latin\` - 
    请参阅 [alpha](__DOCS_SITE__/guide/validation/#alpha)`,
    link:'/guide/validation/#alpha',
  },
  {
    name:'bail',
    description: `用于在第一个后续验证错误时在逻辑上停止验证。有关保释规则的更多
    详细文档位于 [停止验证部分](__DOCS_SITE__/guide/validation/#stopping-validation)`,
    link:'/guide/validation/#bail',
  },
  {
    name:'before',
    description: `检查日期是否在另一个日期之前。如果未提供日期参数，则将使用当前时间。
    该值必须是 Date 对象或可被 Date.parse 求值的字符串。
     [在 MDN 上阅读更多 Date.parse 信息](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse)`,
    link:'/guide/validation/#before',
  },
  {
    name:'between',
    description: `检查数字或字符串长度是否介于最小值或最大值之间。
    最大值和最小值都是互斥的。如果要验证的值是字符串，
    则使用字符串的长度进行比较。如果使用数字，则使用数值进行比较。在 \`v2.2.4+\` 版本
    中你可以强制它总是通过一个可选的第三个参数设置检查数值或字符串长度 \`value\` 或 \`length\` 。
    \n
    *********** \n
    ## 提示\n
    如果你希望日期是两个日期之间，请考虑一起使用其他两个日期的 \`before\` 和 \`after\` 的验证规则。`,
    link:'/guide/validation/#between',
  },
]