import { FieldDef, TableColumnDef } from '@/types'
import { d, datetime } from '@/config/form'
export const formDefs: FieldDef[] = [
  { type: 'select', model: 'status', label: '付款账户名', options: { options: d('status') } },
  { type: 'select', model: 'address', label: '付款账号', options: { options: d('status') } },
  { type: 'select', model: 'address', label: '收款账户名', options: { options: d('status') } },
  { type: 'select', model: 'address', label: '收款账号', options: { options: d('status') } },
  { type: 'select', model: 'address', label: '订单号', options: { options: d('status') } },
  { type: 'select', model: 'address', label: '流水类型', options: { options: d('status') } },
  { type: 'date', model: 'Time', label: '交易起止日期', options: { type: 'daterange', format: datetime } }
]

export const columns: TableColumnDef[] = [
  { prop: 'paymentNo', label: '订单号', minWidth: '170px' },
  { prop: 'amount', label: '流水类型', minWidth: '150px' },
  { prop: 'remainAmount', label: '开户银行', minWidth: '150px' },
  { prop: 'paymentType', label: '付款账号', minWidth: '100px' },
  { prop: 'paymentName', label: '交易金额', minWidth: '250px' },
  { prop: 'tradeTime', label: '交易类型', minWidth: '170px' },
  { prop: 'tradeTime', label: '收款开户行', minWidth: '170px' },
  { prop: 'tradeTime', label: '收款账户名', minWidth: '170px' },
  { prop: 'tradeTime', label: '收款账号', minWidth: '170px' },
  { prop: 'tradeTime', label: '交易时间', minWidth: '170px' },
  { prop: 'tradeTime', label: '交易流水', minWidth: '170px' }
]
