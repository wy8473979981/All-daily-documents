import { FieldDef, TableColumnDef, GridFieldDef } from '@/types'
import { date, resp, request, action } from '@/config/form'

export const formDefs: Array<FieldDef | GridFieldDef> = [
  { span: 24, def: { type: 'radio', model: 'type', label: ' ', options: { options: { 1: '己方融资', 2: '三方融资' } } } },
  { type: 'select', model: 'name', label: '收款人名称', options: { options: { 1: 'A', 2: 'B' } }, rules: [{ required: true }] },
  { type: 'text', model: 'no', label: '银行账号', options: { disabled: true } },
  { type: 'text', model: 'account', label: '开户行', options: { disabled: true } }
]
