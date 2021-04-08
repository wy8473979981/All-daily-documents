import { GridFieldDef, FieldDef, TableColumnDef } from '@/types'

import { d, datetime, requiredRule, amountOptions } from '@/config/form'
import { formatter } from '@/config/table'

export const columns: TableColumnDef[] = [
  { prop: 'clearingRepaymentNo', label: '还款单号' },
  { prop: 'realityPrincipal', label: '还款本金', formatter: formatter('currency'), align: 'right' },
  { prop: 'realityNormalInterest', label: '还款利息', formatter: formatter('currency'), align: 'right' },
  { prop: 'realityGraceInterest', label: '还宽限期利息', formatter: formatter('currency'), align: 'right' },
  { prop: 'realityBreakInterest', label: '还款罚息', formatter: formatter('currency'), align: 'right' },
  { prop: 'realityTotal', label: '还款合计', formatter: formatter('currency'), align: 'right' },
  { prop: 'clearingRepaymentTime', label: '还款处理日期', formatter: formatter('date') },
  { prop: 'waterSerialNo', label: '回款单号' },
  { prop: 'settlementNo', label: '结算单号' },
  { prop: 'waterNote', label: '银行流水摘要' }
]
