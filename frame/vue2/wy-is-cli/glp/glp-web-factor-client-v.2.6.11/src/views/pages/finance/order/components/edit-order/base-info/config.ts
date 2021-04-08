import { validator } from '@/config/validator'
import { FieldDef, TableColumnDef, GridFieldDef } from '@/types'
import { date, datetime, resp, request, action, requiredRule, amountOptions } from '@/config/form'

export const formDefs: Array<FieldDef | GridFieldDef> = [
  { type: 'number', model: 'totalAmount', label: '本次应收账款转让金额', options: { disabled: true }, rules: [requiredRule('number')] },
  { type: 'number', model: 'applicationAmount', label: '本次申请融资金额', options: { ...amountOptions }, rules: [requiredRule('number')] },
  { type: 'date', model: 'latestRepaymentDate', label: '最晚还款日', options: { type: 'date', format: datetime }, rules: [requiredRule(), { validator: validator('date'), format: datetime, min: '0D' } as any] }
]
