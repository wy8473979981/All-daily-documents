import { FieldDef, TableColumnDef } from '@/types'
import { d, datetime } from '@/config/form'
export const formDefs: FieldDef[] = [
  { type: 'select', model: 'status', label: '卖方企业', options: { options: d('status') } },
  { type: 'select', model: 'address', label: '买方企业', options: { options: d('status') } },
  { type: 'date', model: 'address', label: '结算起止日期', options: { type: 'daterange', format: datetime } },
  { type: 'date', model: 'address', label: '当前系统日期' }
]

export const columns: TableColumnDef[] = [
  { prop: 'repayment', label: '回款单号', minWidth: '170px' },
  { prop: 'tradeTime', label: '回款日期', minWidth: '250px' },
  { prop: 'repaymentAmount', label: '流水金额', minWidth: '150px' },
  { prop: 'availableAmount', label: '未核销金额', minWidth: '150px' },
  { prop: 'applyAmount', label: '申请拨付金额', minWidth: '100px' }
]
