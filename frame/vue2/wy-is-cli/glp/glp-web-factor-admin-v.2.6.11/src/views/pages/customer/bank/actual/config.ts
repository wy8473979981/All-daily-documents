import { formatter } from '@/config/table'
import { FieldDef, TableColumnDef } from '@/types'
import { d, datetime } from '@/config/form'

export const formDefs: FieldDef[] = [
  { type: 'text', model: 'relatedCustomerName', label: '关联主体' },
  { type: 'text', model: 'bankAccountName', label: '账户名称' },
  { type: 'select', model: 'bankType', label: '类型', options: { options: d('bank_dzyhklx') } },
  { type: 'select', model: 'riskCheckStatus', label: '审核状态', options: { options: d('bank_shzt') } },
  { type: 'select', model: 'creatorType', label: '账户来源', options: { options: d('creatorType') } },
  { type: 'select', model: 'bankDateType', label: '时间类型', options: { options: d('bankDateType') } },
  { type: 'date', model: 'createTime', label: '选择时间', dependOn: 'form.bankDateType == 0', options: { type: 'daterange', format: datetime } },
  { type: 'date', model: 'riskCheckTime', label: '选择时间', dependOn: 'form.bankDateType == 1', options: { type: 'daterange', format: datetime } }
]

export const columns: TableColumnDef[] = [
  { prop: 'relatedCustomerName', label: '关联主体', fixed: 'left', minWidth: '200px' },
  { prop: 'bankAccountName', label: '账户名称', minWidth: '200px' },
  { prop: 'bankAccountNumber', label: '银行账号', minWidth: '200px' },
  { prop: 'bankName', label: '开户行', minWidth: '200px' },
  { prop: 'createTime', label: '创建时间', minWidth: '200px', formatter: formatter('date', 'T') },
  { prop: 'riskCheckTime', label: '审批时间', minWidth: '200px', formatter: formatter('date', 'T') },
  { prop: 'bankType', label: '类型', minWidth: '200px', formatter: formatter('transcode', 'bank_dzyhklx') },
  { prop: 'riskCheckStatus', label: '审核状态（第三方）', minWidth: '200px', formatter: formatter('transcode', 'bank_shzt') },
  { prop: 'status', label: '账户状态', minWidth: '200px', formatter: formatter('transcode', 'bank_zhzt') },
  { prop: 'creatorType', label: '账户来源', minWidth: '200px', formatter: formatter('transcode', 'creatorType') },
  { prop: 'opt', label: '操作', fixed: 'right', minWidth: '200px' }
]
