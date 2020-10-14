import { FieldDef, TableColumnDef } from '@/types'
import { formatter } from '@/config/table'
import { datetime, d } from '@/config/form'
export const formDefs: FieldDef[] = [
  { type: 'text', model: 'buyerCompanyName', label: '卖方名称', options: { placeholder: '请输入卖方名称' } },
  { type: 'text', model: 'sellerCompanyName', label: '买方名称', options: { placeholder: '请输入买方名称' } },
  { type: 'text', model: 'orderNumber', label: '订单号', options: { placeholder: '请输入订单号' } },
  { type: 'select', model: 'orderStatus', label: '订单状态', options: { options: d('yun_order_status'), placeholder: '请选择订单状态' } },
  { type: 'date', model: 'submitTime', label: '订单生成时间', options: { type: 'daterange', format: datetime } }
]
export const columns: TableColumnDef[] = [
  { prop: 'orderNumber', label: '订单号', minWidth: '240px' },
  { prop: 'amount', label: '融资申请金额(元)', minWidth: '130px', formatter: formatter('number') },
  { prop: 'realityLoanAmount', label: '实际放款金额(元)', minWidth: '130px', formatter: formatter('number') },
  { prop: 'todayPrincipal', label: '待还本金(元)', minWidth: '120px', formatter: formatter('number') },
  { prop: 'todayInterestTotal', label: '待还利息(元)', minWidth: '120px', formatter: formatter('number') },
  { prop: 'todayInterest', label: '待还罚息(元)', minWidth: '120px', formatter: formatter('number') },
  { prop: 'sellerCompanyName', label: '卖方', minWidth: '120px' },
  { prop: 'buyerCompanyName', label: '买方', minWidth: '120px' },
  { prop: 'payee', label: '实际收款方', minWidth: '120px' },
  { prop: 'invoiceStatus', label: '订单状态', minWidth: '120px', formatter: (row: any, column: any, cellValue: string, index: number) => { return d('yun_order_status')[cellValue] } },
  { prop: 'submitTime', label: '生成时间', minWidth: '120px', formatter: formatter('date', 'T') },
  { prop: 'opt', label: '操作', fixed: 'right', minWidth: '80px' }
]
