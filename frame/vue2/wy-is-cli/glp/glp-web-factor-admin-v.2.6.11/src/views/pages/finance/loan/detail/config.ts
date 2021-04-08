import { FieldDef, GridFieldDef } from '@/types'
import { d, datetime } from '@/config/form'

export const defs: Array<GridFieldDef | FieldDef> = [
  { type: 'plain', model: 'orderPaySerialNo', label: '放款单号' },
  { type: 'plain', model: 'amount', label: '放款金额' },
  { type: 'plain', model: 'paySuccessTime', label: '放款时间' },
  { type: 'plain', model: 'payAcctName', label: '放款人户名' },
  { type: 'plain', model: 'payAcctNumber', label: '放款人银行账号' },
  { type: 'plain', model: 'payBankName', label: '放款人开户行' },
  { type: 'plain', model: 'receiptAcctName', label: '收款人户名' },
  { type: 'plain', model: 'receiptAcctNumber', label: '收款人银行账号' },
  { type: 'plain', model: 'receiptBankFiliale', label: '收款开户行支行' },
  { type: 'plain', model: 'payNote', label: '放款摘要' }
]
