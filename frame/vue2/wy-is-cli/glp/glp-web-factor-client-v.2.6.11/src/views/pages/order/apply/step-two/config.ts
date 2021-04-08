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
  { prop: 'name', label: '票据号码' },
  { prop: 'ag1e', label: '出票人' },
  { prop: 'ag2e', label: '出票人开户行' },
  { prop: 'ag3e', label: '承兑人' },
  { prop: 'addr4ess', label: '承兑人开户行' },
  { prop: 'addr5ess', label: '票据金额' },
  { prop: 'addr6ess', label: '出票日' },
  { prop: 'addr7ess', label: '票据到期日' },
  { prop: 'addr8ess', label: '承兑保证人 ' }
]
