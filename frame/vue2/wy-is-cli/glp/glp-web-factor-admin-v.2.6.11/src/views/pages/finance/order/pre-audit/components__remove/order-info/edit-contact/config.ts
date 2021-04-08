import { GridFieldDef, FieldDef, TableColumnDef } from '@/types'

import { d, datetime, requiredRule, amountOptions, formatter as f, textareaOptions, textOptions, multiEmailOptions, emailSep } from '@/config/form'
import { formatter } from '@/config/table'
import { validator } from '@/config/validator'
import { cascadeRegions } from '@/config/region'

export const formDef: Array<FieldDef | GridFieldDef> = [
  { type: 'text', model: 'buyerCompName', label: '买方名称', options: { ...textOptions }, rules: [requiredRule()] },
  { type: 'cascader', model: 'buyerProvice', label: '买方所在地区', options: { options: cascadeRegions }, rules: [requiredRule('array')] },
  { type: 'text', model: 'buyerContactName', label: '买方联系人姓名', options: { ...textOptions }, rules: [requiredRule()] },
  { type: 'text', model: 'buyerContactEmail', label: '买方联系人邮箱', options: { ...multiEmailOptions }, rules: [requiredRule(), { validator: validator('email'), sep: emailSep }] },
  { type: 'text', model: 'buyerContactPhone', label: '买方联系人电话', options: { ...textOptions, maxlength: 11 }, rules: [requiredRule(), { validator: validator('tel') }] },
  { type: 'text', model: 'buyerSendAddress', label: '法律文书送达地址', options: { ...textOptions }, rules: [requiredRule()] }
]
