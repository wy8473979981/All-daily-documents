import { FieldDef, TableColumnDef } from '@/types'
import { datetime, d } from '@/config/form'
import { formatter } from '@/config/table'
export const formDefs: FieldDef[] = [
  { type: 'text', model: 'orderNumber', label: '订单号', options: { placeholder: '请输入订单号' } },
  { type: 'date', model: 'time', label: '放款日期', options: { type: 'daterange', format: datetime } }
]

export const columns: TableColumnDef[] = [
  { prop: 'selection', label: '', type: 'selection', reserveSelection: true, width: '64px' },
  { prop: 'index', label: '序号', type: 'index', width: '80px' },
  { prop: 'orderNumber', label: '订单号', minWidth: '120px' },
  { prop: 'amount', label: '应收账款金额', minWidth: '120px', formatter: formatter('number') },
  { prop: 'sellerCompanyName', label: '卖方名称', minWidth: '120px' },
  { prop: 'buyerCompanyName', label: '买方名称', minWidth: '120px' },
  { prop: 'bankAccountName', label: '实际收款方', minWidth: '110px' },
  { prop: 'loanDate', label: '放款日期', minWidth: '110px', formatter: formatter('date') },
  { prop: 'orderStatus', label: '订单状态', minWidth: '80px', formatter: (row: any, column: any, cellValue: string, index: number) => { return d('order_status')[cellValue] } },
  { prop: 'opt', label: '操作', minWidth: '80px' }
]
