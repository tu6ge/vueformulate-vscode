import { ElDocument } from '@/document'
import { DocumentAttribute, DocumentEvent } from '@/document'
import { TypeAttribute } from '@/document'

export const attributes: DocumentAttribute[] = [
  {
    name: 'debounce',
    description: '去抖动延迟',
    type: 'number',
    value: '200',
    default: '200',
    link: '/guide/inputs/#props'
  },
  {
    name: 'disableErrors',
    description: '停用错误消息',
    type: 'boolean',
    value: 'true, false',
    default: 'true',
    link: '/guide/inputs/#props'
  },
  {
    name: 'error',
    description: '自定义错误信息',
    type: 'string',
    value: '',
    default: '-',
    link: '/guide/inputs/#props'
  },
  {
    name: 'errors',
    description: '一组自定义错误信息',
    type: 'string',
    value: '',
    default: '-',
    link: '/guide/inputs/#props'
  },
  {
    name: 'error-behavior',
    description: '显示验证',
    type: 'string',
    value: 'blur / submit / live / value',
    default: 'blur',
    link: '/guide/validation/#显示验证'
  },
  {
    name: 'help-position',
    description: '帮助文本的位置',
    type: 'string',
    value: 'after / before',
    default: 'after',
    link: '/guide/inputs/#props'
  },
  {
    name: 'help',
    description: '帮助文本',
    type: 'string',
    value: '',
    default: '',
    link: '/guide/inputs/#props'
  },
  {
    name: 'id',
    description: 'ID',
    type: 'string',
    value: '',
    default: '',
    link: '/guide/inputs/#props'
  },
  {
    name: 'keep-model-data',
    description: 'form 忽略该值',
    type: 'boolean',
    value: 'true, false',
    default: 'false',
    link: '/guide/inputs/#props'
  },
  {
    name: 'label',
    description: '标签',
    type: 'string',
    value: '',
    default: '—',
    link: '/guide/inputs/#props'
  },
  {
    name: 'label‑position',
    description: '标签位置',
    type: 'string',
    value: 'before / after',
    default: '—',
    link: '/guide/inputs/#props'
  },
  {
    name: 'name',
    description: '字段名',
    type: 'string',
    value: '',
    default: '—',
    link: '/guide/inputs/#props'
  },

  {
    name: 'placeholder',
    description: '占位符',
    type: 'string',
    value: '',
    default: '-'
  },
  {
    name: 'show‑errors',
    description: '强制显示错误信息',
    type: 'boolean',
    value: 'true, false',
    default: 'false',
    link: '/guide/inputs/#props'
  },
  {
    name: 'type',
    description: '类型',
    type: 'string',
    value:
      'text / button / submit / checkbox / radio / file / image / group / select / range / color / date / datetime-local / email / hidden / month / number / password / search / tel / time / url / week',
    default: '—',
    link: '/guide/inputs/#props'
  },
  {
    name: 'validation',
    description: '验证器',
    type: 'string / array',
    value:
      'accepted / after / alpha / alphanumeric / bail / before / between / confirm / date / email / ends_with / in / matches / max / mime / min / not / number / optional / required / starts_with / url',
    default: '—',
    link: '/guide/validation/#可用的验证规则'
  },
  {
    name: 'validation-rules',
    description: '自定义验证器',
    type: 'array',
    value: '',
    default: '—',
    link: '/guide/validation/#自定义验证规则'
  },

  {
    name: 'validation‑messages',
    description: '自定义消息',
    type: 'string',
    value: '',
    default: '—',
    link: '/guide/validation/#自定义验证消息'
  },
  {
    name: 'validation‑name',
    description: '消息中的名称',
    type: 'string',
    value: 'validationName / name / label / type',
    default: '—',
    link: '/guide/validation/#验证名称策略'
  },

  {
    name: 'value',
    description: '默认值',
    type: 'string / number',
    value: '',
    default: '—'
  },
  {
    name: 'v-model',
    description: '默认值',
    type: 'string / number',
    value: '',
    default: '—'
  }
]

const boxAttributes: DocumentAttribute[] = [
  {
    name: 'options',
    description: '选项',
    type: 'array',
    value: '',
    default: '[]',
    link: '/guide/inputs/types/box/'
  }
]

const fileAttributes: DocumentAttribute[] = [
  {
    name: 'accept',
    description: '标准的 HTML',
    type: 'string',
    value: '',
    default: '',
    link: '/guide/inputs/types/file/#props'
  },
  {
    name: 'add-label',
    description: '添加按钮的文字',
    type: 'string',
    value: '',
    default: '',
    link: '/guide/inputs/types/file/#props'
  },
  {
    name: 'image‑behavior',
    description: '是否显示图片缩略图',
    type: 'string',
    value: 'preview / file',
    default: '',
    link: '/guide/inputs/types/file/#props'
  },
  {
    name: 'prevent‑window‑drops',
    description: '防止错误拖动',
    type: 'boolean',
    value: 'true',
    default: '',
    link: '/guide/inputs/types/file/#props'
  },
  {
    name: 'uploader',
    description: '上传处理器',
    type: 'function',
    value: '',
    default: '',
    link: '/guide/inputs/types/file/'
  },
  {
    name: 'upload‑behavior',
    description: '是否立即上传',
    type: 'string',
    value: 'live / delayed',
    default: 'live',
    link: '/guide/inputs/types/file/'
  },
  {
    name: 'upload‑url',
    description: '自定义上传文件的 API',
    type: 'string',
    value: '',
    default: '',
    link: '/guide/inputs/types/file/'
  }
]

const fileEvents: DocumentEvent[] = [
  {
    name: 'file-upload-progress',
    description: '当 [上传器](__DOCS_SITE__/guide/inputs/types/file/#uploader) 更新文件上传的进度时发出。有效负载是一个进度整数 (0-100)。',
    parameter: '(value: number)',
    link: '/guide/inputs/types/file/#事件'
  },
  {
    name: 'file-upload-complete',
    description: '当文件完成上传时发出。有效载荷是 `file` 对象。',
    parameter: '(value: number)',
    link: '/guide/inputs/types/file/#事件'
  },
  {
    name: 'file-upload-error',
    description: '在上传过程中调用的 `uploader` 函数时发出的 `error`。有效载荷是错误本身。',
    parameter: '-',
    link: '/guide/inputs/types/file/#事件'
  },
  {
    name: 'file-removed',
    description: '当文件从 `FileList` 中移除后触发. 有效载荷是内部文件数组。',
    parameter: '-',
    link: '/guide/inputs/types/file/#事件'
  }
]

export const typeAttribute: TypeAttribute[] = [
  {
    name: 'button',
    attributes: [
      {
        name: 'disabled',
        description: '设为不可用',
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
        description: '添加按钮的文字',
        type: 'string',
        value: '',
        default: '',
        link: '/guide/inputs/types/group/#props'
      },
      {
        name: 'limit',
        description: '最大可重复数',
        type: 'number',
        value: '',
        default: '',
        link: '/guide/inputs/types/group/#props'
      },
      {
        name: 'minimum',
        description: '最小可重复数',
        type: 'number',
        value: '',
        default: '',
        link: '/guide/inputs/types/group/#props'
      },
      {
        name: 'remove-label',
        description: '删除按钮上的文字',
        type: 'string',
        value: '',
        default: '',
        link: '/guide/inputs/types/group/#props'
      },
      {
        name: 'remove-position',
        description: '删除按钮的位置',
        type: 'string',
        value: 'before / after',
        default: 'after',
        link: '/guide/inputs/types/group/#props'
      },
      {
        name: 'repeatable',
        description: '是否可重复',
        type: 'boolean',
        value: 'true',
        default: '',
        link: '/guide/inputs/types/group/#props'
      },
      {
        name: 'group-errors',
        description: '自定义子集错误信息',
        type: 'object',
        value: '',
        default: '',
        link: '/guide/inputs/types/group/#为分组设置错误信息'
      }
    ],
    events: [
      {
        name: 'repeatable-added',
        description: '将新的可重复项添加到分组时触发。',
        parameter: '-',
        link: '/guide/inputs/types/group/#事件'
      },
      {
        name: 'repeatable-removed',
        description: '从组中删除可重复项时触发',
        parameter: '-',
        link: '/guide/inputs/types/group/#事件'
      }
    ]
  },
  {
    name: 'range',
    attributes: [
      {
        name: 'min',
        description: '滑块最小值',
        type: 'number',
        value: '',
        default: '0',
        link: '/guide/inputs/types/sliders/'
      },
      {
        name: 'max',
        description: '滑块最大值',
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
    description: '每次字段值更改时发出。通常，这是通过使用 v-model 隐式使用的。',
    parameter: '(event: Event)',
    link: '/guide/inputs/#事件'
  },
  {
    name: 'validation',
    description: '只要表单域的验证状态发生变化就发出，无论错误可见性如何',
    parameter: '(value: string)',
    link: '/guide/validation/#验证器事件'
  },
  {
    name: 'error-visibility',
    description: '当错误的可见性发生变化时发出，例如，在 blur 或 submit (v2.3+) 时',
    parameter: '(value: string)',
    link: '/guide/inputs/#事件'
  },
  {
    name: 'blur-context',
    description: '失去焦点时触发，但包括表单域的 [上下文](__DOCS_SITE__/guide/inputs/#上下文对象) 作为有效负载',
    parameter: '(value: string)',
    link: '/guide/validation/#验证器事件'
  }
]

export const document: ElDocument = { attributes, events }

export default document
