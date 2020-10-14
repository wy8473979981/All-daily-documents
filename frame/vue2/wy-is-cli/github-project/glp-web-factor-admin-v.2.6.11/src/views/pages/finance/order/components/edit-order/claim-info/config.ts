import { GridFieldDef, FieldDef, TableColumnDef } from '@/types'

import { d, datetime } from '@/config/form'
import { formatter } from '@/config/table'

export const baseDetailDef: Array<FieldDef | GridFieldDef> = [
  { type: 'plain', model: 'sellerCompanyName', label: '卖方' },
  { type: 'plain', model: 'buyerCompanyName', label: '买方' }
]

export const claimColumns: TableColumnDef[] = [
  { prop: 'index', label: '序号', type: 'index', width: '80px' },
  { prop: 'buyerCompanyName', label: '买方名称' },
  { prop: 'sellerCompanyName', label: '卖方名称' },
  { prop: 'claimType', label: '基础债权类型', formatter: formatter('transcode', 'claim_bill_type') },
  { prop: 'tradeAmount', label: '基础债权金额', formatter: formatter('currency'), align: 'right' },
  { prop: 'effectTime', label: '基础债权生效时间' },
  { prop: 'expirationTime', label: '基础债权失效时间' },
  { prop: 'invalidReason', label: '风控规则触碰说明' },
  { prop: 'opt', label: '操作', fixed: 'right', width: '80px' }
]

export const billColumns: TableColumnDef[] = [
  { prop: 'index', label: '序号', type: 'index', width: '80px' },
  { prop: 'paperNumber', label: '票据号' },
  { prop: 'paperFrom', label: '出票人' },
  { prop: 'paperUsed', label: '承兑人' },
  { prop: 'paperAmount', label: '票据金额', formatter: formatter('currency'), align: 'right' },
  { prop: 'paperFromDate', label: '出票日' },
  { prop: 'paperExpiredDate', label: '票据到期日' },
  // { prop: 'status', label: '签收状态' },
  { prop: 'opt', label: '操作', fixed: 'right', width: '80px' }
]
