
export interface DocumentAttribute {
  // 参数名称
  name: string
  // 说明
  description: string
  // 类型
  type: string
  // 可选值
  value: string
  // 默认值
  default: any
  // 文档链接
  link?: string
}

export interface TypeAttribute {
  name: string,
  attributes: DocumentAttribute[],
  events?: DocumentEvent[],
}

export interface DocumentEvent {
  // 事件名称
  name: string
  // 说明
  description: string
  // 参数
  parameter: string
  // 文档链接
  link?: string
}

export interface DocumentMethod {
  // 方法名称
  name: string
  // 说明
  description: string
  // 参数
  parameter: string
}

export interface DocumentSlot {
  // 插槽名称
  name: string
  // 说明
  description: string
}

export interface InputType {
  name: string,
  description: string,
  link?: string
}

export interface InputValidation {
  name: string,
  description: string | string[],
  link?: string
}

export type DocumentScopedSlot = DocumentSlot

export interface ElDocument {
  attributes?: DocumentAttribute[]
  events?: DocumentEvent[]
  methods?: DocumentMethod[]
  scopedSlots?: DocumentScopedSlot[]
  slots?: DocumentSlot[]
}
