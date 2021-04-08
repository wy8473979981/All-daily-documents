import { FieldDef, TableColumnDef } from '@/types'
import { d, datetime } from '@/config/form'
import { formatter } from '@/config/table'
export const formDefs: FieldDef[] = [
  { type: 'text', model: 'settlementNo', label: '结算单号', options: { placeholder: '请输入结算单号' } },
  { type: 'select', model: 'invoiceType', label: '发票种类', options: { options: d('invoice_fplx'), placeholder: '请选择发票种类' } },
  { type: 'text', model: 'invoiceNumber', label: '发票号', options: { placeholder: '请输入发票号' } },
  { type: 'select', model: 'source', label: '申请来源', options: { options: d('invoice_sqly'), placeholder: '请选择申请来源' } },
  { type: 'date', model: 'time', label: '开票时间', options: { type: 'daterange', format: datetime } }
]

export const columns: TableColumnDef[] = [
  { prop: 'selection', label: '', type: 'selection', reserveSelection: true, fixed: 'left', width: '64px' },
  { prop: 'settlementNos', label: '结算单号', minWidth: '150px' },
  { prop: 'invoiceNumber', label: '发票号', minWidth: '120px' },
  { prop: 'totalAmount', label: '发票金额(元)', minWidth: '100px', formatter: formatter('number') },
  { prop: 'invoiceSuccessTime', label: '开票时间', minWidth: '180px', formatter: formatter('date', 'T') },
  { prop: 'invoiceType', label: '发票种类', minWidth: '80px', formatter: (row: any, column: any, cellValue: string, index: number) => d('invoice_fplx')[cellValue] },
  { prop: 'reverseInvoiceNo', label: '被反冲发票号', minWidth: '120px' },
  { prop: 'relateForwardInvoiceNo', label: '关联原始正票号', minWidth: '120px' },
  { prop: 'createTime', label: '申请时间', minWidth: '180px', formatter: formatter('date', 'T') },
  { prop: 'source', label: '申请来源', minWidth: '80px', formatter: (row: any, column: any, cellValue: string, index: number) => d('invoice_sqly')[cellValue] },
  { prop: 'opt', label: '操作', fixed: 'right', minWidth: '80px' }
]
