import { FieldDef, GridFieldDef, TableColumnDef } from '@/types'
import { d, datetime } from '@/config/form'
export const formDefs: FieldDef[] = [
  { type: 'text', model: 'settlementNo', label: '订单编号' },
  { type: 'select', model: 'invoiceType', label: '订单状态', options: { options: d('invoice_fplx') } },
  { type: 'text', model: 'invoiceNo', label: '买方名称' },
  { type: 'date', model: 'time', label: '申请时间', options: { type: 'daterange', format: datetime } }
]

export const columns: TableColumnDef[] = [
  { prop: 'id', label: '序号' },
  { prop: 'name', label: '订单编号' },
  { prop: 'age', label: '申请时间' },
  { prop: 'age', label: '买方名称' },
  { prop: 'age', label: '合同金额' },
  { prop: 'address', label: '本金总额' },
  { prop: 'address', label: '利息总额' },
  { prop: 'address', label: '订单状态' },
  { prop: 'address', label: '审批意见' },
  { prop: 'opt', label: '操作', fixed: 'right', minWidth: '120px' }
]
