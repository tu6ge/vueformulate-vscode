import { ElDocument } from '@/document'
import { DocumentAttribute, DocumentEvent } from '@/document'
import { TypeAttribute } from '@/document'

export const attributes: DocumentAttribute[] = [
  {
    name: 'debounce',
    description: 'Amount of time (in milliseconds) to debounce input',
    type: 'number',
    value: '200',
    default: '200',
    link: '/guide/inputs/#props'
  },
  {
    name: 'disableErrors',
    description: 'Will not show  error messages when set to true.',
    type: 'boolean',
    value: 'true, false',
    default: 'true',
    link: '/guide/inputs/#props'
  },
  {
    name: 'error',
    description: 'A custom error message to be manually shown on an element (validation errors are generated on their own). This error will always be visible (if you want to remove it, use a dynamic prop).',
    type: 'string',
    value: '',
    default: '-',
    link: '/guide/inputs/#props'
  },
  {
    name: 'errors',
    description: 'An array of custom error messages to show on an element (see above).',
    type: 'string',
    value: '',
    default: '-',
    link: '/guide/inputs/#props'
  },
  {
    name: 'error-behavior',
    description: `Defines when error messages are shown. Can be \`blur\` (default), 
    \`submit\`, \`value\`, or \`live\`. Anytime a \`<FormulateForm>\` 
    element is submitted errors are also shown. 
    \`live\` will always display all error messages for the input, 
    and value will show errors immediately after content has been entered into the field.
    `,
    type: 'string',
    value: 'blur / submit / live / value',
    default: 'blur',
    link: '/guide/validation/#showing-validation'
  },
  {
    name: 'help-position',
    description: 'The position of the help text `before` or `after` (default is `after`).',
    type: 'string',
    value: 'after / before',
    default: 'after',
    link: '/guide/inputs/#props'
  },
  {
    name: 'help',
    description: 'Help text to be displayed with the input.',
    type: 'string',
    value: '',
    default: '',
    link: '/guide/inputs/#props'
  },
  {
    name: 'id',
    description: 'The id of the input (defaults to an auto-generated one)',
    type: 'string',
    value: '',
    default: '',
    link: '/guide/inputs/#props'
  },
  {
    name: 'keep-model-data',
    description: 'Keeps the input\'s data in the model when removing it from a `FormulateForm`.',
    type: 'boolean',
    value: 'true, false',
    default: 'false',
    link: '/guide/inputs/#props'
  },
  {
    name: 'label',
    description: 'A descriptive label for the input element.',
    type: 'string',
    value: '',
    default: '—',
    link: '/guide/inputs/#props'
  },
  {
    name: 'label‑position',
    description: 'Most input elements place the label before the input by default. The `box` classification places labels after by default, but either can be overridden with this prop.',
    type: 'string',
    value: 'before / after',
    default: '—',
    link: '/guide/inputs/#props'
  },
  {
    name: 'name',
    description: `Adds a name attribute, and when used with \`<FormulateForm>\` 
    this is the key of the field. If no name is defined a random hash will be assigned
    `,
    type: 'string',
    value: '',
    default: '—',
    link: '/guide/inputs/#props'
  },
  {
    name: 'placeholder',
    description: 'The placeholder attribute of the element (if applicable)',
    type: 'string',
    value: '',
    default: '-'
  },
  {
    name: 'show‑errors',
    description: 'When `true` this forces an element to show it’s errors regardless of the state of the `error-behavior`.',
    type: 'boolean',
    value: 'true, false',
    default: 'false',
    link: '/guide/inputs/#props'
  },
  {
    name: 'type',
    description: '*Required*. The type of input element.',
    type: 'string',
    value:
      'text / button / submit / checkbox / radio / file / image / group / select / range / color / date / datetime-local / email / hidden / month / number / password / search / tel / time / url / week',
    default: '—',
    link: '/guide/inputs/#props'
  },
  {
    name: 'validation',
    description: 'A `string` or `array` of validation rules',
    type: 'string / array',
    value:
      'accepted / after / alpha / alphanumeric / bail / before / between / confirm / date / email / ends_with / in / matches / max / mime / min / not / number / optional / required / starts_with / url',
    default: '—',
    link: '/guide/validation/'
  },
  {
    name: 'validation-rules',
    description: 'custom validation rules',
    type: 'array',
    value: '',
    default: '—',
    link: '/guide/validation/#custom-validation-rules'
  },

  {
    name: 'validation‑messages',
    description: 'custom validation messages.',
    type: 'string',
    value: '',
    default: '—',
    link: '/guide/validation/#customize-validation-messages'
  },
  {
    name: 'validation‑name',
    description: `The name to use in validation error messages. 
    By default, this uses the \`name\` prop if available and 
    falls back to the \`label\` prop. It can be explicitly 
    overridden here if needed.`,
    type: 'string',
    value: 'validationName / name / label / type',
    default: '—',
    link: '/guide/validation/#customize-validation-messages'
  },

  {
    name: 'value',
    description: 'Setting initial value',
    type: 'string / number',
    value: '',
    default: '—'
  },
  {
    name: 'v-model',
    description: 'vue v-model',
    type: 'string / number',
    value: '',
    default: '—'
  }
]

const boxAttributes: DocumentAttribute[] = [
  {
    name: 'options',
    description: 'Array or object of options (`select` or `box` classifications)',
    type: 'array',
    value: '',
    default: '[]',
    link: '/guide/inputs/types/box/'
  }
]

const fileAttributes: DocumentAttribute[] = [
  {
    name: 'accept',
    description: 'This is [standard HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#attr-accept), but helpful when trying to upload files of a certain type.',
    type: 'string',
    value: '',
    default: '',
    link: '/guide/inputs/types/file/#props'
  },
  {
    name: 'add-label',
    description: 'The label of the `+ Add File` button, or `false` to disable the add button all together.',
    type: 'string',
    value: '',
    default: '',
    link: '/guide/inputs/types/file/#props'
  },
  {
    name: 'image‑behavior',
    description: '`preview` or `file` - For an input type `image`, the default is preview where a thumbnail of the image is shown.',
    type: 'string',
    value: 'preview / file',
    default: '',
    link: '/guide/inputs/types/file/#props'
  },
  {
    name: 'prevent‑window‑drops',
    description: '`true` by default, this prevents the browser from navigating to a file when the user misses the dropzone.',
    type: 'boolean',
    value: 'true',
    default: '',
    link: '/guide/inputs/types/file/#props'
  },
  {
    name: 'uploader',
    description: '`function` or [axios instance](https://github.com/axios/axios) - Mechanism used to perform upload. Defaults to the globally configured instance.',
    type: 'function',
    value: '',
    default: '',
    link: '/guide/inputs/types/file/'
  },
  {
    name: 'upload‑behavior',
    description: '`live` or `delayed` - Determines when the file is uploaded. Defaults to `live`, which uploads the file as soon as it is selected.',
    type: 'string',
    value: 'live / delayed',
    default: 'live',
    link: '/guide/inputs/types/file/'
  },
  {
    name: 'upload‑url',
    description: 'URL to perform a POST request which overrides the configured default.',
    type: 'string',
    value: '',
    default: '',
    link: '/guide/inputs/types/file/'
  }
]

const fileEvents: DocumentEvent[] = [
  {
    name: 'file-upload-progress',
    description: 'Emitted when the [uploader](__DOCS_SITE__/guide/inputs/types/file/#uploader) updates the progress of a file upload. The payload is a progress integer (0-100).',
    parameter: '(value: number)',
    link: '/guide/inputs/types/file/#events'
  },
  {
    name: 'file-upload-complete',
    description: 'Emitted when a file has completed it\'s upload. The payload is the `file` object.',
    parameter: '(value: number)',
    link: '/guide/inputs/types/file/#events'
  },
  {
    name: 'file-upload-error',
    description: 'Emitted when the `error` function of the `uploader` is called during the upload process. The payload is the error itself.',
    parameter: '-',
    link: '/guide/inputs/types/file/#events'
  },
  {
    name: 'file-removed',
    description: 'Emitted when a file is removed from the `FileList`. Payload is the internal array of files.',
    parameter: '-',
    link: '/guide/inputs/types/file/#events'
  }
]

export const typeAttribute: TypeAttribute[] = [
  {
    name: 'button',
    attributes: [
      {
        name: 'disabled',
        description: 'set disabled',
        type: 'boolean',
        value: '',
        default: ''
      }
    ]
  },
  {
    name: 'checkbox',
    attributes: boxAttributes
  },
  {
    name: 'radio',
    attributes: boxAttributes
  },
  {
    name: 'select',
    attributes: boxAttributes
  },
  {
    name: 'file',
    attributes: fileAttributes,
    events: fileEvents
  },
  {
    name: 'image',
    attributes: fileAttributes,
    events: fileEvents
  },
  {
    name: 'group',
    attributes: [
      {
        name: 'add-label',
        description: 'When repeatable, this is the label to display on the "+ Add" button (defaults to `label || name`).',
        type: 'string',
        value: '',
        default: '',
        link: '/guide/inputs/types/group/#props'
      },
      {
        name: 'limit',
        description: 'When repeatable, this is the maximum number of group items.',
        type: 'number',
        value: '',
        default: '',
        link: '/guide/inputs/types/group/#props'
      },
      {
        name: 'minimum',
        description: 'When repeatable, this is the minimum number of group items.',
        type: 'number',
        value: '',
        default: '',
        link: '/guide/inputs/types/group/#props'
      },
      {
        name: 'remove-label',
        description: 'When repeatable, this is the label to display on the "Remove" button.',
        type: 'string',
        value: '',
        default: '',
        link: '/guide/inputs/types/group/#props'
      },
      {
        name: 'remove-position',
        description: 'Show the remove button `before` or `after` the group inputs (defaults to `before`)',
        type: 'string',
        value: 'before / after',
        default: 'after',
        link: '/guide/inputs/types/group/#props'
      },
      {
        name: 'repeatable',
        description: '`Boolean` indicates if the field is repeatable.',
        type: 'boolean',
        value: 'true',
        default: '',
        link: '/guide/inputs/types/group/#props'
      },
      {
        name: 'group-errors',
        description: '`Object` of dot notation properties (like `0.name`) with errors.',
        type: 'object',
        value: '',
        default: '',
        link: '/guide/inputs/types/group/'
      }
    ],
    events: [
      {
        name: 'repeatable-added',
        description: 'Emitted when a new repeatable item is added to the group.',
        parameter: '-',
        link: '/guide/inputs/types/group/#events'
      },
      {
        name: 'repeatable-removed',
        description: 'Emitted when a repeatable item is removed from the group.',
        parameter: '-',
        link: '/guide/inputs/types/group/#events'
      }
    ]
  },
  {
    name: 'range',
    attributes: [
      {
        name: 'min',
        description: 'slider minimum',
        type: 'number',
        value: '',
        default: '0',
        link: '/guide/inputs/types/sliders/'
      },
      {
        name: 'max',
        description: 'slider maximum',
        type: 'number',
        value: '',
        default: '100',
        link: '/guide/inputs/types/sliders/'
      }
    ]
  }
]

export const events: DocumentEvent[] = [
  {
    name: 'input',
    description: 'Emitted every time the value of the field changes. Typically this is used implicitly by using `v-model`.',
    parameter: '(event: Event)',
    link: '/guide/inputs/#events'
  },
  {
    name: 'validation',
    description: 'Emitted anytime the state of validation changes for an input, irregardless of the visibility of the errors (`v2.3+`).',
    parameter: '(value: string)',
    link: '/guide/validation/#validation-event'
  },
  {
    name: 'error-visibility',
    description: 'Emitted when the visibility of the errors changes, for example, on blur or submit (`v2.3+`).',
    parameter: '(value: string)',
    link: '/guide/inputs/#events'
  },
  {
    name: 'blur-context',
    description: 'Emitted on blur, but includes the input\'s context as the [payload](__DOCS_SITE__/guide/inputs/#context-object) ',
    parameter: '(value: string)',
    link: '/guide/inputs/#events'
  }
]

export const document: ElDocument = { attributes, events }

export default document
