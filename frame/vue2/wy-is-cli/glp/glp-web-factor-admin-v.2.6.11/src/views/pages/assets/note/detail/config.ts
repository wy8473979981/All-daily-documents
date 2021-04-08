import { FieldDef, GridFieldDef } from '@/types'
import { datetime } from '@/config/form'

export const defs: Array<GridFieldDef | FieldDef> = [
  { type: 'plain', model: 'noteNo', label: '票据号码' },
  { type: 'plain', model: 'amount', label: '票据金额' },
  { type: 'plain', model: 'buyer', label: '买方名称' },
  { type: 'plain', model: 'seller', label: '卖方名称' },
  { type: 'plain', model: 'billName', label: '出票人名称' },
  { type: 'plain', model: 'accepter', label: '承兑人名称' },
  { type: 'plain', model: 'bail', label: '保证人' },
  { type: 'plain', model: 'type', label: '票据类型' },
  { type: 'plain', model: 'validDate', label: '基础债权生效时间' },
  { type: 'plain', model: 'expiredDate', label: '基础债权还款时间' },
  { type: 'plain', model: 'startDate', label: '出票日' },
  { type: 'plain', model: 'endDate', label: '到期日' }
]
