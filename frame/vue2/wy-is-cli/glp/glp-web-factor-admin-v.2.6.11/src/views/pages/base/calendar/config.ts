import { FieldDef, TableColumnDef } from '@/types'

export const formDefs: FieldDef[] = [
  { type: 'date', model: 'year', label: '年度', rules: [{ required: true }], options: { type: 'year' } }
]

export const columns: TableColumnDef[] = [
  { prop: 'date', label: '日期', fixed: 'left' },
  { prop: 'week', label: '周' },
  { prop: 'note', label: '备注' },
  { prop: 'opt', label: '操作', fixed: 'right' }
]
