import { FieldDef, TableColumnDef } from '@/types'
import { date } from '@/config/form'

export const baseFormDefs: FieldDef[] = [
  { type: 'date', model: 'errDate', label: '日期', options: { format: date }, rules: [{ required: true, message: '请选择日期' }] },
  { type: 'text', model: 'note', label: '备注', rules: [{ required: true, message: '请填写备注' }] }
]
