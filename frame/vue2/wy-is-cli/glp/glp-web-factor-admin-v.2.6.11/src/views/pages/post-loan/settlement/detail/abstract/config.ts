import { FieldDef, GridFieldDef } from '@/types'
import { formatter } from '@/config/form'

export const accountDetailDefs: Array<FieldDef | GridFieldDef> = [
  { type: 'plain', model: 'projectName', label: '项目名称' },
  { type: 'plain', model: 'productName', label: '融资产品' },
  { type: 'plain', model: 'sellerCompName', label: '卖方企业' },
  { type: 'plain', model: 'settlementTime', label: '结算时间', options: { formatter: formatter('date') } }
]
