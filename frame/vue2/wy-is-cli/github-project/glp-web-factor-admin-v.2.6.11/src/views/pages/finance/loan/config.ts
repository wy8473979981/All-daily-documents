import { FieldDef, TableColumnDef } from '@/types'
import { d, datetime } from '@/config/form'
import { formatter } from '@/config/table'

export const formDefs: FieldDef[] = [
  { type: 'text', model: 'sellerCompanyName', label: '卖方名称' },
  { type: 'text', model: 'buyerCompanyName', label: '买方名称' },
  { type: 'text', model: 'orderNumber', label: '订单号' },
  { type: 'text', model: 'projectName', label: '项目名称' },
  { type: 'date', model: 'Time', label: '放款时间', options: { type: 'daterange', format: datetime } },
  { type: 'select', model: 'status', label: '订单状态', options: { options: d('yun_order_status') } },
  { type: 'select', model: 'loanState', label: '支付状态', options: { options: d('loan_zfzt') } }
]

export const columns: TableColumnDef[] = [
  { prop: 'orderNumber', label: '订单号', minWidth: '140px' },
  { prop: 'orderPaySerialNo', label: '放款单号', minWidth: '130px' },
  { prop: 'status', label: '订单状态', formatter: formatter('transcode', 'yun_order_status') },
  { prop: 'loanState', label: '支付状态', formatter: formatter('transcode', 'loan_zfzt') },
  { prop: 'realityLoanAmount', label: '实际放款金额', align: 'right', formatter: formatter('currency'), minWidth: '140px' },
  { prop: 'loanDate', label: '放款时间', formatter: formatter('date', 'T'), width: '180px' },
  { prop: 'projectName', label: '项目名称' },
  { prop: 'sellerCompanyName', label: '卖方名称' },
  { prop: 'buyerCompanyName', label: '买方名称' },
  { prop: 'bankAccountName', label: '收款方户名', minWidth: '140px' },
  { prop: 'bankAccountNumber', label: '收款方账号', minWidth: '140px' },
  { prop: 'createTime', minWidth: '160', label: '订单申请时间', formatter: formatter('date', 'T') }
]
