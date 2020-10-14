import { FieldDef, TableColumnDef, GridFieldDef } from '@/types'
import { date, resp, request, action, d, a, requiredRule } from '@/config/form'

const onAccountChange = ({ value, form, items }: any) => {
  const target = items.find((v: any) => v.__value === value)
  form.receiptBankNumber = target?.bankAccountNumber || ''
  form.receiptBankFiliale = target?.bankBranchName || ''
}

export const formDefs: Array<FieldDef | GridFieldDef> = [
  // { span: 24, def: { type: 'radio', model: 'capitalFlow', label: '资金流向', options: { options: d('project_zjlx') } } },
  { type: 'select', model: 'accountId', label: '收款人名称', options: { options: a('order-bank-account'), onValueChange: onAccountChange }, rules: [requiredRule('number')] },
  { type: 'text', model: 'receiptBankNumber', label: '银行账号', options: { disabled: true } },
  { type: 'text', model: 'receiptBankFiliale', label: '开户行', options: { disabled: true } }
]
