import { ElDocument } from '@/document'
import { DocumentAttribute } from '@/document'

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
]

export const document: ElDocument = { attributes }

export default document
