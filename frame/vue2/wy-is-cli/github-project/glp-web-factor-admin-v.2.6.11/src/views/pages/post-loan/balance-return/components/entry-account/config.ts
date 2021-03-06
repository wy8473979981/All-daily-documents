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
  { type: 'select', model: 'accountId', label: '拨付到账账户', options: { options: new Promise((resolve, reject) => { customerAccountList({}).then(res => { resolve(dataResolve(res)) }) }) } },
  { type: 'text', model: 'accountNumber', label: '拨付到账账号' },
  { type: 'text', model: 'accountBank', label: '开户行信息' }
]
