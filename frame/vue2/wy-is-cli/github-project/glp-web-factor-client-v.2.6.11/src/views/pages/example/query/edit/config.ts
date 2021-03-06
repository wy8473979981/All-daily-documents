import { FieldDef, TableColumnDef } from '@/types'
import { d, a } from '@/config/form'

export const baseFormDefs: FieldDef[] = [
  { type: 'text', model: 'id', label: '编号', rules: [{ required: true, message: '请输入编号' }] },
  { type: 'text', model: 'name', label: '姓名' },
  { type: 'text', model: 'age', label: '年龄' },
  { type: 'select', model: 'status', label: '状态', options: { options: d('status') } },
  { type: 'text', model: 'address', label: '地址' },
  { type: 'select', model: 'dept', label: '部门', options: { options: d('status') } },
  { type: 'select', model: 'user', label: '用户', options: { options: a('users') } }
]

export const extraFormDefs: FieldDef[] = [
  { type: 'text', model: 'e1', label: '附件字段1', rules: [{ required: true, message: '请输入附件字段1' }] },
  { type: 'text', model: 'e2', label: '附件字段2' },
  { type: 'text', model: 'e2', label: '附件字段3' },
  { type: 'text', model: 'e4', label: '附件字段4' },
  { type: 'text', model: 'e5', label: '附件字段5' }
]
