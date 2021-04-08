import { FieldDef, GridFieldDef } from '@/types'
import { formatter as f } from '@/config/form'
export const defs: Array<GridFieldDef | FieldDef> = [
  { type: 'plain', model: 'orderPaySerialNo', label: '放款单号', options: { labelWidth: 'auto' } },
  { type: 'plain', model: 'amount', label: '放款金额(元)', options: { formatter: f('number'), labelWidth: 'auto' } },
  { type: 'plain', model: 'paySuccessTime', label: '放款时间', options: { labelWidth: 'auto', formatter: f('date', 'T') } },
  { type: 'plain', model: 'payAcctName', label: '放款人户名', options: { labelWidth: 'auto' } },
  { type: 'plain', model: 'payAcctNumber', label: '放款人银行账号', options: { labelWidth: 'auto' } },
  { type: 'plain', model: 'payBankName', label: '放款人开户行', options: { labelWidth: 'auto' } },
  { type: 'plain', model: 'receiptAcctName', label: '收款人户名', options: { labelWidth: 'auto' } },
  { type: 'plain', model: 'receiptBankCode', label: '收款人银行账号', options: { labelWidth: 'auto' } },
  { type: 'plain', model: 'receiptBankFiliale', label: '收款人开户银行支行', options: { labelWidth: 'auto' } },
  { type: 'plain', model: 'payNote', label: '摘要', options: { labelWidth: 'auto' } }
]
