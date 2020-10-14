import { FieldDef, TableColumnDef } from '@/types'
import { d, datetime } from '@/config/form'
import { formatter } from '@/config/table'
export const formDefs: FieldDef[] = [
  { type: 'text', model: 'settlementNo', label: '结算单号' },
  { type: 'select', model: 'invoiceType', label: '发票类型', options: { options: d('invoice_fplx') } },
  { type: 'text', model: 'invoiceNumber', label: '发票号码' },
  { type: 'text', model: 'invoiceTitle', label: '发票抬头' },
  { type: 'select', model: 'source', label: '申请来源', options: { options: d('invoice_sqly') } },
  { type: 'date', model: 'Time', label: '开票时间', options: { type: 'daterange', format: datetime } }
]

export const columns: TableColumnDef[] = [
  { prop: 'invoiceNumber', label: '发票号码', minWidth: '170px', formatter: formatter('empty') },
  { prop: 'settlementNos', label: '结算单号', minWidth: '150px', formatter: formatter('empty') },
  { prop: 'totalAmount', label: '发票金额(元)', minWidth: '150px', align: 'right', formatter: formatter('currency') },
  { prop: 'invoiceSuccessTime', label: '开票时间', minWidth: '170px', formatter: formatter('date', 'T') },
  { prop: 'companyInvoiceTitle', label: '发票抬头', minWidth: '250px', formatter: formatter('empty') },
  { prop: 'invoiceType', label: '发票类型', minWidth: '100px', formatter: formatter('transcode', 'invoice_fplx') },
  { prop: 'reverseInvoiceNo', label: '被反冲发票号', minWidth: '170px', formatter: formatter('empty') },
  { prop: 'relateForwardInvoiceNo', label: '关联原始正票号', minWidth: '170px', formatter: formatter('empty') },
  { prop: 'createTime', label: '申请时间', minWidth: '170px', formatter: formatter('date', 'T') },
  { prop: 'source', label: '申请来源', minWidth: '110px', formatter: formatter('transcode', 'invoice_sqly') },
  { prop: 'opt', label: '操作', minWidth: '230px', fixed: 'right' }
]

export function getMessageHtml(settlementNo: any) {
  return `<div><p>本次操作会红冲该结算单对应的所有发票号</p><p style="word-break: break-all;">详情如下：${settlementNo}</p></div>`
}

export function getMessageNewHtml(settlementNo: any) {
  return `<div><p>本次操作会开具新正票，关联的原始正票号</p><p style="word-break: break-all;">详情如下：${settlementNo}</p></div>`
}
