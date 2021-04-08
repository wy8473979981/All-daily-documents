import { FieldDef, TableColumnDef } from '@/types'
import { d } from '@/config/form'
import { formatter } from '@/config/table'

export const formDefs: FieldDef[] = [
  { type: 'select', model: 'thirdCustomerType', label: '主体类型', options: { options: d('bank_dsfkhlx') } },
  { type: 'text', model: 'bankAccountName', label: '主体名称' },
  { type: 'text', model: 'bankAccountNumber', label: '收款账号' }
]

export const columns: TableColumnDef[] = [
  { prop: 'bankAccountName', label: '主体名称', fixed: 'left', minWidth: '200px' },
  { prop: 'thirdCustomerType', label: '主体类型', minWidth: '200px', formatter: formatter('transcode', 'bank_dsfkhlx') },
  { prop: 'thirdCertNumber', label: '证件号码', minWidth: '200px' },
  { prop: 'thirdMobileNumber', label: '联系电话', minWidth: '200px' },
  { prop: 'bankName', label: '收款行', minWidth: '200px' },
  { prop: 'bankAccountNumber', label: '收款账号', minWidth: '200px' },
  { prop: 'createTime', label: '创建时间', minWidth: '200px', formatter: formatter('date', 'T') },
  { prop: 'riskCheckTime', label: '审核时间', minWidth: '200px', formatter: formatter('date', 'T') },
  { prop: 'riskCheckStatus', label: '审核状态', minWidth: '200px', formatter: formatter('transcode', 'bank_shzt') },
  { prop: 'opt', label: '操作', fixed: 'right', minWidth: '200px' }
]
