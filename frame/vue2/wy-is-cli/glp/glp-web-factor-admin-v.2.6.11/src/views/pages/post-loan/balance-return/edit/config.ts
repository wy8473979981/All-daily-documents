import { FieldDef, GridFieldDef } from '@/types'

export const accountDetailDefs: Array<FieldDef | GridFieldDef> = [
  { type: 'plain', model: 'buyerCompany', label: '卖方企业' },
  { type: 'plain', model: 'sellerCompany', label: '申请人' },
  { type: 'plain', model: 'financeProduct', label: '申请时间' },
  { type: 'plain', model: 'createTime', label: '申请拨付金额（小写）' },
  { type: 'plain', model: 'settlementTime', label: '申请拨付金额（大写）' }
]
