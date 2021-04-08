import { FieldDef, GridFieldDef, TableColumnDef } from '@/types'
import { d, datetime } from '@/config/form'
export const formDefs: FieldDef[] = [
  { type: 'text', model: 'settlementNo', label: '订单编号' },
  { type: 'select', model: 'invoiceType', label: '订单状态', options: { options: d('invoice_fplx') } },
  { type: 'text', model: 'invoiceNo', label: '买方名称' },
  { type: 'date', model: 'time', label: '申请时间', options: { type: 'daterange', format: datetime } }
]

export const columns: TableColumnDef[] = [
  { prop: 'orderNum', label: '序号' },
  { prop: 'paperNumber', label: '票据号码' },
  { prop: 'paperFrom', label: '出票人' },
  { prop: 'paperFromBank', label: '出票人开户行' },
  { prop: 'paperUsed', label: '承兑人' },
  { prop: 'paperUsedBank', label: '承兑人开户行' },
  { prop: 'paperAmount', label: '票据金额' },
  { prop: 'paperFromDate', label: '出票日' },
  { prop: 'paperExpiredDate', label: '票据到期日' },
  { prop: 'paperGuarantee', label: '承兑保证人' },
  { prop: 'attachment', label: '票据附件', minWidth: '200px' }
]
