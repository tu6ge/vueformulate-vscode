import { ElDocument } from '@/document'
import { DocumentAttribute, DocumentEvent } from '@/document'

export const attributes: DocumentAttribute[] = [
  {
    name: 'debounce',
    description: 'Amount of time (in milliseconds) to debounce all inputs in the form',
    type: 'number',
    value: '200',
    default: '200',
    link: '/guide/forms/#props'
  },
  {
    name: 'invalid-message',
    description: '`String`, `Array`, or `Function`, error message to show when a form is submitted with invalid fields.',
    type: 'boolean',
    value: 'true, false',
    default: 'false',
    link: '/guide/forms/#props'
  },
  {
    name: 'values',
    description: 'Setting initial values',
    type: 'object',
    value: '',
    default: '—',
    link: '/guide/forms/'
  },
  {
    name: 'v-model',
    description: 'vue v-model',
    type: 'object',
    value: '',
    default: '—',
    link: '/guide/forms/'
  },
  {
    name: 'schema',
    description: 'Generating Forms',
    type: 'object',
    value: '',
    default: '—',
    link: '/guide/forms/generating-forms/'
  },
  {
    name: 'form-errors',
    description: 'form errors',
    type: 'array',
    value: '',
    default: '—',
    link: '/guide/forms/error-handling/#form-errors'
  }
]

export const events: DocumentEvent[] = [
  {
    name: 'created',
    description: 'Emitted in from the form\'s `created` lifecycle hook after it has applied default values.',
    parameter: '(event: Event)',
    link: '/guide/forms/#events'
  },
  {
    name: 'failed-validation',
    description: 'Emitted when form submission fails due to validation, passed an object with field names as properties and component instances as values.',
    parameter: '(event: Event)',
    link: '/guide/forms/#events'
  },
  {
    name: 'input',
    description: 'Emitted when any values in the form change.',
    parameter: '(event: Event)',
    link: '/guide/forms/#events'
  },
  {
    name: 'submit-raw',
    description: 'Emitted on any form submission attempt, even with invalid fields.',
    parameter: '(event: Event)',
    link: '/guide/forms/#events'
  },
  {
    name: 'submit',
    description: 'Emitted by any standard form submission events *if* all fields are passing validation',
    parameter: '(event: Event)',
    link: '/guide/forms/#events'
  }
]

export const document: ElDocument = { attributes, events }

export default document
