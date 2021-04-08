import { FieldDef, TableColumnDef } from '@/types'
import { d, datetime } from '@/config/form'
export const formDefs: FieldDef[] = [
  { type: 'select', model: 'status', label: '买方企业', options: { options: d('status') } },
  { type: 'select', model: 'address', label: '卖方企业' },
  { type: 'select', model: 'status', label: '拨付单号', options: { options: d('status') } },
  { type: 'select', model: 'status', label: '拨付状态', options: { options: d('status') } },
  { type: 'date', model: 'address', label: '拨付起止日期', options: { type: 'daterange', format: datetime } }
]

export const columns: TableColumnDef[] = [
  { prop: 'sellerCompany', label: '卖方企业', minWidth: '250px' },
  { prop: 'balanceRetrunNo', label: '拨付申请单号', minWidth: '170px' },
  { prop: 'balanceReturnRecord', label: '拨付记录', minWidth: '170px' },
  { prop: 'balanceReturnAmount', label: '拨付金额', minWidth: '150px' },
  { prop: 'balanceReturnTime', label: '拨付日期', minWidth: '170px' },
  { prop: 'operator', label: '操作人', minWidth: '120px' },
  { prop: 'balanceReturnStatus', label: '状态', fixed: 'right' }
]
