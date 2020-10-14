import { FieldDef, TableColumnDef } from '@/types'
import { d, datetime, textOptions } from '@/config/form'
import { formatter } from '@/config/table'

export const columns: TableColumnDef[] = [
  { prop: 'invoiceNo', label: '发票号码' },
  { prop: 'sellerCompName', label: '销售方' },
  { prop: 'buyerCompName', label: '购买方' },
  { prop: 'invoicingTime', label: '开票时间' },
  { prop: 'invoiceMoney', label: '发票总金额' },
  { prop: 'invoiceTaxRate', label: '税率' },
  { prop: 'isValid', label: '是否有效' },
  { prop: 'opt', label: '操作', fixed: 'right', width: '80px' }
]
