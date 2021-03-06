import { FieldDef, TableColumnDef } from '@/types'
import { d, datetime } from '@/config/form'
import { formatter } from '@/config/table'
export const formDefs: FieldDef[] = [
  { type: 'text', model: 'settlementNo', label: '结算单号' },
  { type: 'select', model: 'invoiceStatus', label: '开票状态', options: { options: d('invoice_kpzt') } },
  { type: 'date', model: 'time', label: '申请时间', options: { type: 'daterange', format: datetime } }
]

export function changeTime(params: any) {
  if (params.time) {
    const { time, ...other } = params
    other.beginTime = time[0]
    other.endTime = time[1]
    return other
  }
  return params
}

export const columns: TableColumnDef[] = [
  { prop: 'buyerCompName', label: '购买方名称', minWidth: '150px' },
  { prop: 'sellerCompName', label: '销售方名称', minWidth: '150px' },
  { prop: 'invoiceCode', label: '发票代码', minWidth: '150px' },
  { prop: 'invoiceNo', label: '发票号码', minWidth: '150px' },
  { prop: 'invoicingTime', label: '开票日期', minWidth: '150px', formatter: formatter('date', 'D') },
  { prop: 'invoiceTaxExclusiveMoney', label: '发票不含税金额', minWidth: '150px' },
  { prop: 'invoiceTaxMoney', label: '发票税额', minWidth: '150px', formatter: (row: any, column: any, cellValue: string, index: number) => d('invoice_kpzt')[cellValue] },
  { prop: 'invoiceMoney', label: '价税合计', minWidth: '150px' },
  { prop: 'invoiceCheckCode', label: '普票验证码', minWidth: '200px' },
  { prop: 'verifyStatus', label: '发票查验结果', minWidth: '250px' },
  { prop: 'attachment', label: '附件', fixed: 'right', minWidth: '120px' }
]
