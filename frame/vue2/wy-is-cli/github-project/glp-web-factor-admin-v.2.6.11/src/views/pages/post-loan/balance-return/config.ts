import { FieldDef, TableColumnDef } from '@/types'
import { a, d, datetime, remote } from '@/config/form'
import { formatter } from '@/config/table'
export const formDefs: FieldDef[] = [
  { type: 'select', model: 'saleCompanyId', label: '卖方企业', options: { ...remote('seller-account') } },
  { type: 'text', model: 'refund', label: '拨付单号' },
  { type: 'select', model: 'refundStatus', label: '拨付状态', options: { options: d('refund_status') } },
  { type: 'date', model: 'Time', label: '拨付起止日期', options: { type: 'daterange', format: datetime } }
]

export const columns: TableColumnDef[] = [
  { prop: 'saleCompany', label: '卖方企业', minWidth: '250px' },
  { prop: 'refund', label: '拨付申请单号', minWidth: '170px' },
  { prop: 'record', label: '拨付记录', minWidth: '170px' },
  { prop: 'applyAmount', label: '拨付金额', minWidth: '150px', align: 'right', formatter: formatter('currency') },
  { prop: 'payTime', label: '拨付日期', minWidth: '170px', formatter: formatter('date') },
  { prop: 'applyName', label: '操作人', minWidth: '120px' },
  { prop: 'status', label: '状态', fixed: 'right', formatter: formatter('transcode', 'refund_status') }
]
