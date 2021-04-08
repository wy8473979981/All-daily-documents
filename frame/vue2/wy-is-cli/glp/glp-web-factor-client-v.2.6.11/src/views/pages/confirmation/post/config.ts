import { FieldDef, TableColumnDef } from '@/types'
import { d, datetime, textOptions } from '@/config/form'
import { formatter } from '@/config/table'

export const formDefs: FieldDef[] = [
  { type: 'text', model: 'sellerCompanyName', label: '卖方名称', options: { ...textOptions } },
  { type: 'select', model: 'orderStatus', label: '订单状态', options: { options: d('yun_order_status'), defaultValue: '2' } },
  { type: 'date', model: 'submitTime', label: '申请时间', options: { type: 'daterange', format: datetime } }
]

export const columns: TableColumnDef[] = [
  { prop: 'orderNumber', label: '订单号' },
  { prop: 'amount', label: '融资金额', formatter: formatter('currency') },
  { prop: 'sellerCompanyName', label: '卖方名称' },
  { prop: 'buyerCompanyName', label: '买方名称' },
  { prop: 'payee', label: '收款方' },
  { prop: 'createTime', label: '申请时间', formatter: formatter('date', 'T') },
  { prop: 'status', label: '订单状态', formatter: formatter('transcode', 'yun_order_status') },
  { prop: 'opt', label: '操作', fixed: 'right' }
]
