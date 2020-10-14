import { FieldDef, TableColumnDef } from '@/types'
import { d, remote } from '@/config/form'
import { format } from '@/utils/date'
import { formatter } from '@/config/table'
import { customerAccountList } from '@/api/balance'
const dataResolve = (data: any) => {
  const obj: any = {}
  data.items.map((item: any) => {
    obj[item.bankAccountName] = item.bankAccountName
  })
  return obj
}
export const formDefs: FieldDef[] = [
  { type: 'select', model: 'sellerName', label: '账户所属企业', options: { ...remote('customer-name') } },
  { type: 'select', model: 'acctName', label: '账户户名', options: { ...remote('account-bankname') } },
  { type: 'select', model: 'clearWay', label: '清分规则', options: { options: d('invoice_cleartype') } },
  { type: 'select', model: 'projectId', label: '项目名称', options: { ...remote('project-name') } }
]

export const columns: TableColumnDef[] = [
  { prop: 'sellerName', label: '账户所属企业', minWidth: '250px', formatter: formatter('empty') },
  { prop: 'repaymentAcctUsername', label: '账户户名', minWidth: '250px', formatter: formatter('empty') },
  { prop: 'repaymentAcctNumber', label: '银行账号', minWidth: '170px', formatter: formatter('empty') },
  { prop: 'acctBalance', label: '账户余额', minWidth: '150px', align: 'right', formatter: formatter('currency') },
  { prop: 'projectName', label: '项目名称', minWidth: '250px', formatter: formatter('empty') },
  { prop: 'clearWay', label: '清分规则', minWidth: '120px', formatter: formatter('transcode', 'invoice_cleartype') },
  { prop: 'updateTime', label: '更新时间', minWidth: '250px', formatter: formatter('date', 'T') },
  { prop: 'opt', label: '操作', fixed: 'right' }
]
