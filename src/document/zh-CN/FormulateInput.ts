import { ElDocument } from '@/document'
import { DocumentAttribute } from '@/document'

export const attributes: DocumentAttribute[] = [
  {
    name: 'debounce',
    description: '去抖动延迟',
    type: 'number',
    value: '200',
    default: '200',
    link:'/guide/inputs/#props'
  },
  {
    name: 'disableErrors',
    description: '停用错误消息',
    type: 'boolean',
    value: 'true, false',
    default: 'true',
    link:'/guide/inputs/#props'
  },
  {
    name: 'error',
    description: '自定义错误信息',
    type: 'string',
    value: '',
    default: '-',
    link:'/guide/inputs/#props'
  },
  {
    name: 'errors',
    description: '一组自定义错误信息',
    type: 'string',
    value: '',
    default: '-',
    link:'/guide/inputs/#props'
  },
  {
    name: 'error-behavior',
    description: '显示验证',
    type: 'string',
    value: 'blur / submit / live / value',
    default: 'blur',
    link:'/guide/validation/#显示验证'
  },
  {
    name: 'help-position',
    description: '帮助文本的位置',
    type: 'string',
    value: 'after / before',
    default: 'after',
    link:'/guide/inputs/#props'
  },
  {
    name: 'help',
    description: '帮助文本',
    type: 'string',
    value: '',
    default: '',
    link:'/guide/inputs/#props'
  },
  {
    name: 'id',
    description: 'ID',
    type: 'string',
    value: '',
    default: '',
    link:'/guide/inputs/#props'
  },
  {
    name: 'keep-model-data',
    description: 'form 忽略该值',
    type: 'boolean',
    value: 'true, false',
    default: 'false',
    link:'/guide/inputs/#props'
  },
  {
    name: 'label',
    description: '标签',
    type: 'string',
    value: '',
    default: '—',
    link:'/guide/inputs/#props'
  },
  {
    name: 'label‑position',
    description: '标签位置',
    type: 'string',
    value: 'before / after',
    default: '—',
    link:'/guide/inputs/#props'
  },
  {
    name: 'name',
    description: '字段名',
    type: 'string',
    value: '',
    default: '—',
    link:'/guide/inputs/#props'
  },
  {
    name: 'options',
    description: '选项',
    type: 'array',
    value: '',
    default: '[]',
    link: '/guide/inputs/types/box/'
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
    link:'/guide/inputs/#props'
  },
  {
    name: 'type',
    description: '类型',
    type: 'string',
    value: 'text / number / password',
    default: '—',
    link:'/guide/inputs/#props'
  },
  {
    name: 'validation',
    description: '验证器',
    type: 'string / array',
    value: 'required / email',
    default: '—',
    link:'/guide/validation/#可用的验证规则'
  },
  {
    name: 'validation-rules',
    description: '自定义验证器',
    type: 'array',
    value: '',
    default: '—',
    link:'/guide/validation/#自定义验证规则'
  },
  
  {
    name: 'validation‑messages',
    description: '自定义消息',
    type: 'string',
    value: '',
    default: '—',
    link:'/guide/validation/#自定义验证消息'
  },
  {
    name: 'validation‑name',
    description: '消息中的名称',
    type: 'string',
    value: "validationName / name / label / type",
    default: '—',
    link:'/guide/validation/#验证名称策略'
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
  },
]

export const document: ElDocument = { attributes }

export default document
