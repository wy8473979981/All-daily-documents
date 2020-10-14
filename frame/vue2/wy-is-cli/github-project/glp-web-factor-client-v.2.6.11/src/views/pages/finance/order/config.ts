import { FieldDef, TableColumnDef } from '@/types'
import { d, datetime, textOptions } from '@/config/form'
import { formatter } from '@/config/table'

export const formDefs: FieldDef[] = [
  { type: 'text', model: 'sellerCompanyName', label: '卖方名称', options: { ...textOptions } },
  { type: 'date', model: 'submitTime', label: '申请时间', options: { type: 'daterange', format: datetime } },
  { type: 'text', model: 'buyerCompanyName', label: '买方名称', options: { ...textOptions } },
  { type: 'text', model: 'orderNumber', label: '订单号' },
  { type: 'select', model: 'orderStatus', label: '订单状态', options: { options: d('yun_order_status') } }
]

export const columns: TableColumnDef[] = [
  { prop: 'orderNumber', label: '订单号', width: '180px' },
  { prop: 'amount', label: '融资申请金额', formatter: formatter('currency'), width: '120px', align: 'right' },
  { prop: 'realityLoanAmount', label: '实际放款金额', formatter: formatter('currency'), width: '120px' },
  { prop: 'sellerCompanyName', label: '卖方名称', width: '200px' },
  { prop: 'buyerCompanyName', label: '买方名称', width: '200px' },
  { prop: 'payee', label: '实际收款方', width: '200px' },
  { prop: 'createTime', label: '申请时间', formatter: formatter('date', 'T'), width: '160px' },
  { prop: 'status', label: '订单状态', formatter: formatter('transcode', 'yun_order_status'), width: '80px' },
  { prop: 'invoiceStatus', label: '发票上传状态', formatter: formatter('transcode', '_uploadStatus'), width: '120px' },
  { prop: 'opt', label: '操作', fixed: 'right', width: '240px' }
]
