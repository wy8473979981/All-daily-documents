import { FieldDef, GridFieldDef, TableColumnDef } from '@/types'
import { formatter as f, d } from '@/config/form'
import { formatter } from '@/config/table'
export const defs: Array<GridFieldDef | FieldDef> = [
  { type: 'plain', model: 'invoiceNo', label: '发票号码' },
  { type: 'plain', model: 'invoiceCode', label: '发票代码' },
  { type: 'plain', model: 'invoiceType', label: '发票类型', options: { formatter: f('transcode', 'invoiceType') } },
  { type: 'plain', model: 'buyerCompName', label: '销售方名称' },
  { type: 'plain', model: 'sellerCompName', label: '购买方名称' },
  { type: 'plain', model: 'invoicingTime', label: '开票日期', options: { formatter: f('date', 'D') } },
  { type: 'plain', model: 'invoiceMoney', label: '发票价税合计(元)', options: { formatter: f('number') } },
  { type: 'plain', model: 'invoiceTaxExclusiveMoney', label: '发票不含税金额(元)', options: { formatter: f('number') } },
  { type: 'plain', model: 'invoiceCheckCode', label: '发票校验码' },
  { type: 'plain', model: 'invoiceTaxMoney', label: '发票税额(元)', options: { formatter: f('number') } },
  { type: 'plain', model: 'remark', label: '备注' },
  { type: 'custom', model: 'fileName', label: '发票文件', customType: 'link' },
  { type: 'plain', model: 'isValid', label: '有效状态', options: { formatter: f('transcode', 'active_status') } },
  { type: 'plain', model: 'useStatus', label: '使用状态', options: { formatter: f('transcode', 'invoice_syzt') } },
  { type: 'plain', model: 'recentVerifyTime', label: '最近一次验证时间', options: { formatter: f('date', 'D') } },
  { type: 'plain', model: 'verifyStatus', label: '验证状态', options: { formatter: f('transcode', 'invoice_yzzt') } }
]

export const columns: TableColumnDef[] = [
  { prop: 'index', label: '序号', type: 'index', width: '80px' },
  { prop: 'id', label: '订单号', minWidth: '120px' },
  { prop: 'amount', label: '应收账款金额(元)', minWidth: '120px', formatter: formatter('number') },
  { prop: 'sellerCompanyName', label: '卖方名称', minWidth: '120px' },
  { prop: 'buyerCompanyName', label: '买方名称', minWidth: '120px' },
  { prop: 'bankAccountName', label: '实际收款方', minWidth: '110px' },
  { prop: 'loanDate', label: '放款日期', minWidth: '110px', formatter: formatter('date') },
  { prop: 'orderStatus', label: '订单状态', minWidth: '80px', formatter: (row: any, column: any, cellValue: string, index: number) => d('yun_order_status')[cellValue] },
  { prop: 'opt', label: '操作', minWidth: '110px' }
]
