import { FieldDef, TableColumnDef, GridFieldDef } from '@/types'
import { date, resp, request, action } from '@/config/form'

export const formDefs: Array<FieldDef | GridFieldDef> = [
  { type: 'text', model: 'transferAmount', label: '本次应收账款转让金额' },
  { type: 'text', model: 'applyAmount', label: '本次申请融资金额', rules: [{ required: true }] },
  { type: 'date', model: 'refundDate', label: '最晚还款日', options: { type: 'date', format: date } }
]
