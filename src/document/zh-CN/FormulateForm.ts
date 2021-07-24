import { ElDocument } from '@/document'
import { DocumentAttribute, DocumentEvent } from '@/document'

export const attributes: DocumentAttribute[] = [
  {
    name: 'debounce',
    description: '去抖动延迟',
    type: 'number',
    value: '200',
    default: '200',
    link: '/guide/forms/#props'
  },
  {
    name: 'invalid-message',
    description: '无效字段的错误消息',
    type: 'boolean',
    value: 'true, false',
    default: 'false',
    link: '/guide/forms/#props'
  },
  {
    name: 'values',
    description: '默认值',
    type: 'object',
    value: '',
    default: '—',
    link: '/guide/forms/'
  },
  {
    name: 'v-model',
    description: '绑定值',
    type: 'object',
    value: '',
    default: '—',
    link: '/guide/forms/'
  },
  {
    name: 'schema',
    description: '构造器',
    type: 'object',
    value: '',
    default: '—',
    link: '/guide/forms/generating-forms/'
  },
  {
    name: 'form-errors',
    description: '构造器',
    type: 'array',
    value: '',
    default: '—',
    link: '/guide/forms/error-handling/#表单错误'
  },
]

export const events: DocumentEvent[] = [
  {
    name: 'created',
    description: '在应用默认值后，在表单的生命周期创建后触发',
    parameter: '(event: Event)',
    link: '/guide/forms/#事件'
  },
  {
    name: 'failed-validation',
    description: '当由于表单提交导致验证失败时发出，传递一个以字段名称作为属性和组件实例作为值的对象。',
    parameter: '(event: Event)',
    link: '/guide/forms/#事件'
  },
  {
    name: 'input',
    description: '当表单中的任何值更改时发出。',
    parameter: '(event: Event)',
    link: '/guide/forms/#事件'
  },
  {
    name: 'submit-raw',
    description: '在任何表单提交尝试时发出，即使有无效字段。',
    parameter: '(event: Event)',
    link: '/guide/forms/#事件'
  },
  {
    name: 'submit',
    description: '*如果* 所有字段都通过验证，则由任何标准表单提交事件发出',
    parameter: '(event: Event)',
    link: '/guide/forms/#事件'
  },
]

export const document: ElDocument = { attributes , events}

export default document
