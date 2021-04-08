import { FieldDef, TableColumnDef } from '@/types'
import { formatter } from '@/config/table'
import { d, date, datetime, formatter as f } from '@/config/form'

export const formDefs: FieldDef[] = [
  { type: 'text', model: 'relatedCustomerName', label: '所属主体' },
  { type: 'text', model: 'bankAccountName', label: '账户名称' },
  { type: 'text', model: 'bankAccountNumber', label: '银行账号' },
  { type: 'text', model: 'bindBankAccountNumber', label: '绑定实体账户账号' },
  { type: 'select', model: 'bankCardUsage', label: '账户类型', options: { options: d('bank_zhlx') } },
  { type: 'date', model: 'createTime', label: '创建时间', options: { type: 'daterange', format: date } }
]

export const columns: TableColumnDef[] = [
  { prop: 'relatedCustomerName', label: '所属主体', fixed: 'left', minWidth: '250px' },
  { prop: 'bankAccountName', label: '账户名称', minWidth: '250px' },
  { prop: 'bankAccountNumber', label: '银行账号', minWidth: '250px' },
  { prop: 'bindBankName', label: '开户行', minWidth: '250px' },
  { prop: 'bindBankAccountName', label: '绑定实体账户名称', minWidth: '250px' },
  { prop: 'bankType', label: '账户性质', minWidth: '100px', formatter: formatter('transcode', 'bank_jgyhklx') },
  { prop: 'createTime', label: '创建时间', minWidth: '200px', formatter: formatter('date', 'T') },
  { prop: 'bankCardUsageText', label: '账户类型', minWidth: '100px' },
  { prop: 'status', label: '账户状态', minWidth: '100px', formatter: formatter('transcode', 'bank_zhzt') },
  { prop: 'opt', label: '操作', fixed: 'right', minWidth: '120px' }
]
