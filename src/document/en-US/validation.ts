import { InputValidation } from '@/document'
import { SnippetString } from 'vscode'

function numberLimitInsertText(value: string): SnippetString {
  let maxMinInsertText: SnippetString = new SnippetString()
  maxMinInsertText.appendText(`${value}:`)
  maxMinInsertText.appendTabstop()
  maxMinInsertText.appendText(',')
  maxMinInsertText.appendChoice(['length', 'value'])
  return maxMinInsertText
}

export const validations: InputValidation[] = [
  {
    name: 'accepted',
    description: 'The value must be `yes`, `on`, `1` or `true`. Useful for box inputs, often where you need to validate if someone has accepted terms.',
    link: '/guide/validation/#accepted'
  },
  {
    name: 'after',
    description: `Checks if a date comes after another date. If no date argument is provided the current time will be used. 
    The value must be a Date object or a string that can be evaluated by \`Date.parse\`
    [Read more about Date.parse() on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse)`,
    link: '/guide/validation/#after',
    insertText: new SnippetString('after:')
  },
  {
    name: 'alpha',
    description: `Checks if a value is only alphabetical characters. 
    There are two character sets \`latin\` and \`default\`. Latin characters are strictly \`[a-zA-Z]\`,
    while the \`default\` set includes most accented characters as well like: \`ä\`, \`ù\`, 或 \`ś\`.`,
    link: '/guide/validation/#alpha',
    insertText: new SnippetString('alpha:').appendChoice(['default', 'latin'])
  },
  {
    name: 'alphanumeric',
    description: `Checks if a value is only made of alphabetical characters or numeric digits. 
    For the alphabetical portion you can pass \`default\` or \`latin\` - 
    - see [alpha](__DOCS_SITE__/guide/validation/#alpha) above`,
    link: '/guide/validation/#alpha',
    insertText: new SnippetString('alphanumeric:').appendChoice(['default', 'latin'])
  },
  {
    name: 'bail',
    description: `Used to logically stop validation on the first subsequent validation error. 
    More detailed documentation on the bail rule is under the Stopping validation section.`,
    link: '/guide/validation/#stopping-validation'
  },
  {
    name: 'before',
    description: `Checks if a date comes before another date. If no date argument is provided the current time will be used. 
    The value must be a Date object or a string that can be evaluated by \`Date.parse\`
    [Read more about Date.parse() on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse)`,
    link: '/guide/validation/#before',
    insertText: new SnippetString('before:')
  },
  {
    name: 'between',
    description: [
      `Checks if a number or string length is between a minimum or maximum.
       Both the maximum and minimum are exclusive. If the value being 
       validated is a string the string’s length is used for comparison. 
      If a number is used, the numeric value is used for comparison. In \`v2.2.4+\` 
      you can force it to always check the numeric value or 
      string length by setting an optional third argument to \`value\` or \`length\` .`,
      '\n',
      '*********** \n',
      '*Tip*\n',
      'If you’re wanting to find if a date is between two other dates',
      'consider using the before and after validation rules together`before` and `after` validation rules together.\n\n'
    ],
    link: '/guide/validation/#between',
    insertText: new SnippetString('between:').appendTabstop().appendText(',').appendTabstop().appendText(',').appendChoice(['value', 'length'])
  },
  {
    name: 'confirm',
    description: [
      `Checks if the field value matches the value of another field. 
      Mostly used for hidden fields - like password confirmations. By default, 
      a \`confirm\` rule will look for other fields in 
      the same \`FormulateForm\` with the suffix \`_confirm\`. 
      If you’d like the rule to use a different field as 
      the confirmation, simply pass the other field name as an argument \`confirm:other_field\`.\n`,
      '******\n',
      '*Note*This rule only works inside the context of a `<FormulateForm>` or a `group` type.'
    ],
    link: '/guide/validation/#confirm'
  },
  {
    name: 'date',
    description: [
      `Checks if the input is a valid date according to \`Date.parse()\`, 
      or if a format argument is provided, it will validate according to the given format. Format variables are:\r\n`,
      '- `MM` Two-digit month representation (01-12) \r\n',
      '- `M`  Single-digit month representation (1-12) leading zero allowed \r\n',
      '- `DD` Two-digit day of the month (01-31) \r\n',
      '- `D`  Single-digit day of the month (1-31), leading zero allowed \r\n',
      '- `YY` Two-digit year\r\n',
      '- `YYYY` Four-digit year \r\n',
      '******\n',
      '*WARNING*\r',
      'Heads up! This validation rule will validate that your',
      ' requested format is followed but does not validate if a date exists (eg `02/31/2008`).\n'
    ],
    link: '/guide/validation/#date',
    insertText: new SnippetString('date:')
      .appendChoice(['MM', 'M', 'DD', 'D', 'YY', 'YYYY'])
      .appendText('/')
      .appendChoice(['MM', 'M', 'DD', 'D', 'YY', 'YYYY'])
      .appendText('/')
      .appendChoice(['MM', 'M', 'DD', 'D', 'YY', 'YYYY'])
  },
  {
    name: 'email',
    description: `Checks if the input is a valid email address format.`,
    link: '/guide/validation/#email'
  },
  {
    name: 'ends_with',
    description: `Checks if the input ends with one of the provided options.`,
    link: '/guide/validation/#ends_with',
    insertText: new SnippetString('ends_with:')
  },
  {
    name: 'in',
    description: `Checks if the input is included in an array of options.`,
    link: '/guide/validation/#in',
    insertText: new SnippetString('in:')
  },
  {
    name: 'matches',
    description: [
      `Checks if the input matches a particular value or pattern. If you pass multiple arguments, it checks each until a match is found.\n`,
      'Arguments can also be regular expressions. When using the string syntax, ',
      'start and end your argument with a slash / (do not escape additional slashes).\n',
      `When using the string syntax you cannot escape characters 
      used to define the validation rules themselves (\`|,:\`). 
      To use these characters in your regular expressions you must use the alternative array syntax.`
    ],
    link: '/guide/validation/#matches',
    insertText: new SnippetString('matches:')
  },
  {
    name: 'max',
    description: [
      'Checks that the value of a `Number`, or length of a `String` or `Array` is less than a maximum length or value. The maximum value/length defaults to `10` \n',
      'You can force the validator to evaluate either length or value by passing a second argument of either `length` or `value`。\n',
      '******\n',
      '*Note*',
      'When evaluating an `Array` the second argument (length/value) is ignored'
    ],
    link: '/guide/validation/#max',
    insertText: numberLimitInsertText('max')
  },
  {
    name: 'mime',
    description: [
      `Checks if the type of file selected is an allowed value. 
      This validator uses the file’s extension to determine the 
      [mime type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types). 
      Back-end validation of the file’s content is still strongly 
      encouraged as front-end validation can be bypassed by savvy users`,
      '******\n',
      '*Note*',
      'When validating a field with the multiple attribute selected, ',
      'validation will fail if any of the selected files are not the proper mime.'
    ],
    link: '/guide/validation/#mime',
    insertText: new SnippetString('mime:').appendChoice(['image/jpeg,image/png', 'image/jpeg', 'image/png', 'application/pdf'])
  },
  {
    name: 'min',
    description: [
      'Checks the value of a `Number`, or length of a `String` or `Array` is more than a maximum length or value. The minimum value/length defaults to `1` \n',
      'You can force the validator to evaluate length or value by passing a second argument of either `length` or `value`。\n',
      '******\n',
      '*Note*',
      'When evaluating an `Array` the second argument (length/value) is ignored'
    ],
    link: '/guide/validation/#min',
    insertText: numberLimitInsertText('min')
  },
  {
    name: 'not',
    description: 'Checks to ensure the input data does not match a set of predefined values',
    link: '/guide/validation/#not',
    insertText: new SnippetString('not:')
  },
  {
    name: 'number',
    description: 'Checks if the input is a valid number as evaluated by `isNaN()` ',
    link: '/guide/validation/#number'
  },
  {
    name: 'optional',
    description: 'Use this rule to make a field optional. When used all validation rules pass until the field is no longer empty. Its location in the list of validation rules has no effect.',
    link: '/guide/validation/#optional'
  },
  {
    name: 'required',
    description: 'Checks if the input is empty.',
    link: '/guide/validation/#required',
    insertText: new SnippetString('required').appendPlaceholder(':trim')
  },
  {
    name: 'starts_with',
    description: 'Checks if the input starts with one of the provided options',
    link: '/guide/validation/#starts_with',
    insertText: new SnippetString('starts_with')
  },
  {
    name: 'url',
    description: 'Checks if the input value appears to be a properly formatted URL including the protocol. This does not check if the URL actually resolves.',
    link: '/guide/validation/#starts_with'
  }
]
