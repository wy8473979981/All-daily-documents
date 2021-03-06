import { FieldDef, TableColumnDef } from '@/types'
import { datetime } from '@/config/form'
import { formatter } from '@/config/table'
export const formDefs: FieldDef[] = [
  { type: 'text', model: 'orderNumber', label: '订单号', options: { placeholder: '请输入订单号' } },
  { type: 'date', model: 'time', label: '放款时间', options: { type: 'daterange', format: datetime } }
]
export const columns: TableColumnDef[] = [
  { prop: 'orderNumber', label: '订单号', minWidth: '120px' },
  { prop: 'loanDate', label: '放款时间', minWidth: '120px', formatter: formatter('date', 'T') },
  { prop: 'amount', label: '融资申请金额(元)', minWidth: '120px', formatter: formatter('number') },
  { prop: 'realityLoanAmount', label: '实际放款金额(元)', minWidth: '120px', formatter: formatter('number') },
  { prop: 'sellerCompanyName', label: '卖方', minWidth: '120px' },
  { prop: 'buyerCompanyName', label: '买方', minWidth: '120px' },
  { prop: 'bankAccountName', label: '实际收款方', minWidth: '120px' },
  { prop: 'opt', label: '操作', fixed: 'right', minWidth: '120px' }
]
