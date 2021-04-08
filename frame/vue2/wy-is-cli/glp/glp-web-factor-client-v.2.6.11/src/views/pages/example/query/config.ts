import { FieldDef, TableColumnDef } from '@/types'
import { d } from '@/config/form'

export const formDefs: FieldDef[] = [
  { type: 'text', model: 'id', label: '编号' },
  { type: 'text', model: 'name', label: '姓名' },
  { type: 'text', model: 'age', label: '年龄', rules: [{ min: 1, max: 2, message: '年龄在1到100之间' }] },
  { type: 'select', model: 'status', label: '状态', options: { options: d('status') } },
  { type: 'text', model: 'address', label: '地址', dependOn: 'form.status == 1' },
  { type: 'text', model: 'other', label: '其他' }
]

export const columns: TableColumnDef[] = [
  { prop: 'id', label: '编号' },
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄' },
  { prop: 'status', label: '状态' },
  { prop: 'address', label: '地址' },
  { prop: 'opt', label: '操作', fixed: 'right' }
]
