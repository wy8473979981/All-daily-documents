import { FieldDef, GridFieldDef, TableColumnDef } from '@/types'
import { d, datetime } from '@/config/form'
import { formatter } from '@/config/table'
export const formDefs: FieldDef[] = [
  { type: 'text', model: 'orderNumber', label: '订单编号' },
  { type: 'select', model: 'orderStatus', label: '订单状态', options: { options: d('invoice_fplx') } },
  { type: 'text', model: 'buyerCompanyName', label: '买方名称' },
  { type: 'date', model: 'submitTime', label: '申请时间', options: { type: 'daterange', format: datetime } }
]

export const columns: TableColumnDef[] = [
  { prop: 'orderNumber', label: '订单编号' },
  { prop: 'createTime', label: '申请时间', formatter: formatter('date', 'T') },
  { prop: 'buyerCompanyName', label: '买方名称' },
  { prop: 'realityLoanAmount', label: '合同金额' },
  { prop: 'addr4ess', label: '本金总额' },
  { prop: 'addr5ess', label: '利息总额' },
  { prop: 'add6ress', label: '订单状态' },
  { prop: 'add7ress', label: '审批意见' },
  { prop: 'opt', label: '操作', fixed: 'right', minWidth: '200px' }
]
