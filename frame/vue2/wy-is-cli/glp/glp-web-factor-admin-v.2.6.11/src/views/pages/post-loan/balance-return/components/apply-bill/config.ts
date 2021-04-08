import { FieldDef, GridFieldDef } from '@/types'

export const accountDetailDefs: Array<FieldDef | GridFieldDef> = [
  { type: 'plain', model: 'projectName', label: '项目名称' },
  { type: 'plain', model: 'saleCompany', label: '卖方企业' },
  { type: 'plain', model: 'applyName', label: '申请人' },
  { type: 'plain', model: 'applyTime', label: '申请时间' },
  { type: 'plain', model: 'applyAmount', label: '申请拨付总额' },
  { type: 'plain', model: 'orders', label: '关联融资申请单' }
]
