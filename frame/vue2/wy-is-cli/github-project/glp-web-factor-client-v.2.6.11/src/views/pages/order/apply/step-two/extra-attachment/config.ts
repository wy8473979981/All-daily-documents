import { FieldDef, GridFieldDef, TableColumnDef } from '@/types'
import { d, datetime } from '@/config/form'
export const formDefs: FieldDef[] = [
  { type: 'text', model: 'settlementNo', label: '订单编号' },
  { type: 'select', model: 'invoiceType', label: '订单状态', options: { options: d('invoice_fplx') } },
  { type: 'text', model: 'invoiceNo', label: '买方名称' },
  { type: 'date', model: 'time', label: '申请时间', options: { type: 'daterange', format: datetime } }
]

export const columns: TableColumnDef[] = [
  { prop: 'name', label: '文件名称' },
  { prop: 'code', label: '文件编号' },
  { prop: 'path', label: '附件' },
  { prop: 'opt', label: '操作' }
]
