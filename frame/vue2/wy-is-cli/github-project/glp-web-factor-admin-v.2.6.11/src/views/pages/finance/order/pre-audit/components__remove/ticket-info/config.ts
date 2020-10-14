import { GridFieldDef, FieldDef, TableColumnDef } from '@/types'

import { d, datetime, requiredRule, amountOptions, formatter as f, textareaOptions, uploadOptions, dateDisabledFn } from '@/config/form'
import { formatter } from '@/config/table'

export function formDefFn (step: number, min = 0, max = 100): Array<FieldDef | GridFieldDef> {
  const disabled = step > 2 ? true : undefined
  return [
    { span: 8, xl: 8, def: { type: 'number', model: 'factoringContractRate', label: '保理合同费率', options: { ...amountOptions, min, max, unit: false, append: '%', placeholder: '利率必须在利率区间内' } /*, rules: [requiredRule('number')] */ } },
    { span: 16, xl: 16, def: { type: 'upload', model: 'useBasicContracts', label: '上传基础合同使用情况', options: { ...uploadOptions, disabled } } }
  ]
}

// export const formDef12: Array<FieldDef | GridFieldDef> = formDefFn(1)
// export const formDef34: Array<FieldDef | GridFieldDef> = formDefFn(3)

export const baseDetailDef: Array<FieldDef | GridFieldDef> = [
  { type: 'plain', model: 'paperNumber', label: '票据号', options: { ellipsis: true } },
  { type: 'plain', model: 'paperFromDate', label: '出票日' },
  { type: 'plain', model: 'paperExpiredDate', label: '票据到期日', options: { formatter: f('date') } },
  { type: 'plain', model: 'paperAmount', label: '票面金额', options: { formatter: f('currency') } },
  { type: 'plain', model: 'paperFrom', label: '出票人名称' },
  { span: 6, xl: 6, offset: 12, pull: 12, def: { type: 'plain', model: 'paperFromBank', label: '出票人开户行名称' } },
  { type: 'plain', model: 'paperUsed', label: '承兑人名称' },
  { type: 'plain', model: 'paperUsedBank', label: ' 承兑人开户行名称' },
  { type: 'plain', model: 'paperGuarantee', label: ' 承兑保证人名称' },
  { type: 'file-link', model: 'files', label: ' 票据附件' }
]

export function ticketFormDefFn (step: number, max?: number): Array<FieldDef | GridFieldDef> {
  const rules = step > 2 ? undefined : [requiredRule()]
  return [
    { type: 'date', model: 'endDate', label: '到期日', options: { type: 'date', format: datetime, disabledDate: ({ form }) => dateDisabledFn(form?.formatedPaperExpiredDate, 'lt') }, rules },
    { type: 'number', model: 'graceUseDays', label: '宽限期使用天数', options: { unit: false, max } },
    { type: 'plain', model: 'gracePeriod', label: '宽限期' },
    { type: 'plain', model: 'gracePeriodRate', label: '宽限期利率', options: { formatter: f('percent') } },
    { type: 'plain', model: 'rateRange', label: '利率' }
  ]
}

// export const ticketFormDef12: Array<FieldDef | GridFieldDef> = ticketFormDefFn(1)
// export const ticketFormDef34: Array<FieldDef | GridFieldDef> = ticketFormDefFn(3)
