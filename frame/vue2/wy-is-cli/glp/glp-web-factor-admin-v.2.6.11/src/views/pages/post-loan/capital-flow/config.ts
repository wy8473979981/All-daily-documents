import { FieldDef, TableColumnDef } from '@/types'
import { d, datetime, remote } from '@/config/form'
import { formatter } from '@/config/table'
export const formDefs: FieldDef[] = [
  { type: 'select', model: 'buyerCompId', label: '买方企业', options: { ...remote('buyer-account') } },
  { type: 'select', model: 'sellerCompId', label: '卖方企业', options: { ...remote('seller-account') } },
  { type: 'text', model: 'orderNumber', label: '融资订单' },
  { type: 'text', model: 'clearingRepaymentNo', label: '还款单号' },
  { type: 'date', model: 'Time', label: '还款起止日期', options: { type: 'daterange', format: datetime } }
]

export const columns: TableColumnDef[] = [
  { prop: 'buyerCompName', label: '买方企业', minWidth: '170px' },
  { prop: 'sellerCompName', label: '卖方企业', minWidth: '150px' },
  { prop: 'orderNumber', label: '融资订单号', minWidth: '150px' },
  { prop: 'clearingRepaymentNo', label: '还款单号', minWidth: '100px' },
  { prop: 'realityPrincipal', label: '还款本金', minWidth: '250px', align: 'right', formatter: formatter('currency') },
  { prop: 'realityNormalInterest', label: '还款利息', minWidth: '170px', align: 'right', formatter: formatter('currency') },
  { prop: 'realityGraceInterest', label: '还款宽限期利息', minWidth: '170px', align: 'right', formatter: formatter('currency') },
  { prop: 'realityBreakInterest', label: '还款罚息', minWidth: '170px', align: 'right', formatter: formatter('currency') },
  { prop: 'realityTotal', label: '还款合计', minWidth: '170px', align: 'right', formatter: formatter('currency') },
  { prop: 'clearingRepaymentTime', label: '还款处理日期', minWidth: '170px', formatter: formatter('date', 'T') },
  { prop: 'waterSerialNo', label: '回款单号', minWidth: '170px' },
  { prop: 'settlementNo', label: '结算单号', minWidth: '170px' },
  { prop: 'waterNote', label: '银行流水摘要', minWidth: '170px' }
]
