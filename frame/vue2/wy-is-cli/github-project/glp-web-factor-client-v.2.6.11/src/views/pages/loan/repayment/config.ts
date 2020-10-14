import { FieldDef, TableColumnDef } from '@/types'
import { datetime, d, p } from '@/config/form'
import { formatter } from '@/config/table'
export const formDefs: FieldDef[] = [
  { type: 'select', model: 'buyerCompId', label: '买方企业', options: { placeholder: '请选择买方企业', options: p('buyer-com-id') } },
  { type: 'text', model: 'clearingRepaymentNos', label: '还款单号', options: { placeholder: '请输入还款单号' } },
  { type: 'text', model: 'orderNumbers', label: '融资订单号', options: { placeholder: '请输入融资订单号' } },
  { type: 'date', model: 'time', label: '还款日期', options: { type: 'daterange', format: datetime } }
]
export const columns: TableColumnDef[] = [
  { prop: 'buyerCompName', label: '买方企业', minWidth: '120px' },
  { prop: 'sellerCompName', label: '卖方企业', minWidth: '120px' },
  { prop: 'orderNumber', label: '融资订单号', minWidth: '120px' },
  { prop: 'clearingRepaymentNo', label: '还款单号', minWidth: '120px' },
  { prop: 'realityPrincipal', label: '还款本金(元)', minWidth: '120px', formatter: formatter('number') },
  { prop: 'realityNormalInterest', label: '还款利息(元)', minWidth: '120px', formatter: formatter('number') },
  { prop: 'realityBreakInterest', label: '还款罚息(元)', minWidth: '120px', formatter: formatter('number') },
  { prop: 'realityTotal', label: '还款合计(元)', minWidth: '120px', formatter: formatter('number') },
  { prop: 'clearingRepaymentTime', label: '还款处理日期', minWidth: '120px', formatter: formatter('date', 'T') },
  { prop: 'waterSerialNo', label: '回款单号', minWidth: '120px' },
  { prop: 'settlementNo', label: '结算单号', minWidth: '120px' },
  { prop: 'waterNote', label: '银行流水摘要', minWidth: '120px' }
]
