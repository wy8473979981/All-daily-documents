import { FieldDef, TableColumnDef, GridFieldDef } from '@/types'
import { date, resp, request, action, d } from '@/config/form'
import { formatter } from '@/config/table'

export const formDefs: Array<FieldDef | GridFieldDef> = [
  { type: 'select', model: 'claimType', label: '基础债权类型', options: { options: d('claim_bill_type') } },
  { type: 'custom', customType: 'range', model: 'no', label: '基础债权金额' }
]

export const selectedColumns: TableColumnDef[] = [
  { prop: 'buyerCompanyName', label: '买方名称' },
  { prop: 'sellerCompanyName', label: '卖方名称' },
  { prop: 'claimType', label: '基础债权类型' },
  { prop: 'tradeAmount', label: '基础债权金额' },
  { prop: 'effectTime', label: '基础债权生效时间' },
  { prop: 'expirationTime', label: '基础债权失效时间' },
  { prop: 'opt', label: '操作', fixed: 'right', width: '120px' }
]

export const columns: TableColumnDef[] = [
  { prop: 'selection', label: '', type: 'selection', reserveSelection: true, fixed: 'left', width: '64px' },
  ...selectedColumns
]
