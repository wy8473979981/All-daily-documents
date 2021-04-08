import { FieldDef, GridFieldDef } from '@/types'
import { customerAccountList } from '@/api/balance'
const dataResolve = (data: any) => {
  const obj: any = {}
  data.items.map((item: any) => {
    obj[item.bindBankAccountNumber] = item.bindBankAccountName
  })
  return obj
}
export const accountDetailDefs: Array<FieldDef | GridFieldDef> = [
  { type: 'select', model: 'accountName', label: '账户户名', options: { disabled: true, options: new Promise((resolve, reject) => { customerAccountList({}).then(res => { resolve(dataResolve(res)) }) }) } },
  { type: 'text', model: 'accountNumber', label: '拨付出账账号', options: { disabled: true } },
  { type: 'text', model: 'accountBank', label: '账户开户行', options: { disabled: true } }
]
