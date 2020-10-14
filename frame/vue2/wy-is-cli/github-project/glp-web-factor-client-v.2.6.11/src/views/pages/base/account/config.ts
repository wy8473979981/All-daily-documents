import { FieldDef, TableColumnDef } from '@/types'
import { formatter } from '@/config/table'

// export const formDefs: FieldDef[] = [
//   { type: 'text', model: 'accountName', label: '账户名称' },
//   { type: 'text', model: 'accountNo', label: '银行账号' }
// ]

export const columns: TableColumnDef[] = [
  { prop: 'bankAccountName', label: '账户名称', minWidth: '200px', fixed: 'left' },
  { prop: 'bankAccountNumber', label: '银行账号', minWidth: '200px' },
  { prop: 'bankName', label: '开户行', minWidth: '200px' },
  { prop: 'bankBranchName', label: '开户支行', minWidth: '200px' },
  { prop: 'createTime', label: '创建时间', minWidth: '200px', formatter: formatter('date', 'T') },
  { prop: 'status', label: '当前状态', minWidth: '200px', formatter: formatter('transcode', 'bank_zhzt') },
  { prop: 'opt', label: '操作', fixed: 'right', minWidth: '100px' }
]
