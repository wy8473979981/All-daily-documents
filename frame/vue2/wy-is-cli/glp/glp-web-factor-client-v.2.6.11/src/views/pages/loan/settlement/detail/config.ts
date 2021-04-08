import { FieldDef, GridFieldDef, TableColumnDef } from '@/types'
import { formatter as f } from '@/config/form'
import { formatter } from '@/config/table'
export const borrowDefs: Array<GridFieldDef | FieldDef> = [
  { type: 'plain', model: 'projectName', label: '项目名称' },
  { type: 'plain', model: 'productName', label: '融资产品' },
  { type: 'plain', model: 'sellerCompName', label: '卖方企业' },
  { type: 'plain', model: 'settlementTime', label: '结算时间', options: { formatter: f('date') } }
]
export const columns1: TableColumnDef[] = [
  { prop: 'orderNo', label: '融资申请单号', minWidth: '120px' },
  { prop: 'buyerCompName', label: '买方企业', minWidth: '120px' },
  { prop: 'sellerCompName', label: '卖方企业', minWidth: '120px' },
  { prop: 'curtPrincipalPayable', label: '待还本金(元)', minWidth: '120px', formatter: formatter('number') },
  { prop: 'curtNormalInterestPayable', label: '待还利息(元)', minWidth: '120px', formatter: formatter('number') },
  { prop: 'curtGraceInterestPayable', label: '待还宽限期利息(元)', minWidth: '120px', formatter: formatter('number') },
  { prop: 'curtBreakInterestPayable', label: '待还罚息(元)', minWidth: '120px', formatter: formatter('number') },
  { prop: 'curtTotalPayable', label: '待还合计(元)', minWidth: '120px', formatter: formatter('number') }
]
export const columns2: TableColumnDef[] = [
  { prop: 'orderNo', label: '融资申请单号', minWidth: '120px' },
  { prop: 'buyerCompName', label: '买方企业', minWidth: '120px' },
  { prop: 'sellerCompName', label: '卖方企业', minWidth: '120px' },
  { prop: 'realityPrincipal', label: '已还本金(元)', minWidth: '120px', formatter: formatter('number') },
  { prop: 'realityNormalInterest', label: '已还利息(元)', minWidth: '120px', formatter: formatter('number') },
  { prop: 'realityGraceInterest', label: '已还宽限期利息(元)', minWidth: '120px', formatter: formatter('number') },
  { prop: 'realityBreakInterest', label: '已还罚息(元)', minWidth: '120px', formatter: formatter('number') },
  { prop: 'realityTotal', label: '还款合计(元)', minWidth: '120px', formatter: formatter('number') },
  { prop: 'clearingRepaymentNos', label: '还款记录', minWidth: '120px' }
]
export const columns3: TableColumnDef[] = [
  { prop: 'orderNo', label: '融资申请单号', minWidth: '120px' },
  { prop: 'buyerCompName', label: '买方企业', minWidth: '120px' },
  { prop: 'sellerCompName', label: '卖方企业', minWidth: '120px' },
  { prop: 'surplusPrincipal', label: '待还本金(元)', minWidth: '120px', formatter: formatter('number') },
  { prop: 'surplusNormalInterest', label: '待还利息(元)', minWidth: '120px', formatter: formatter('number') },
  { prop: 'surplusGraceInterest', label: '待还宽限期利息(元)', minWidth: '120px', formatter: formatter('number') },
  { prop: 'surplusBreakInterest', label: '待还罚息(元)', minWidth: '120px', formatter: formatter('number') },
  { prop: 'surplusTotal', label: '待还合计(元)', minWidth: '120px', formatter: formatter('number') }
]
