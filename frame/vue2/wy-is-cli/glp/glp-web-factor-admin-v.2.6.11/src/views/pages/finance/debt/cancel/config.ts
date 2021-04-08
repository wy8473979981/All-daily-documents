import { validator } from '@/config/validator'
import { format } from '@/utils/date'
import { FieldDef, TableColumnDef, GridFieldDef, TableDef } from '@/types'
import { d, date, datetime, uploadOptions, remote, a, amountOptions, requiredRule, textareaOptions, textOptions, multiEmailOptions, emailSep } from '@/config/form'

export const formDefs: Array<FieldDef | GridFieldDef> = [
  { type: 'textarea', model: 'comment', label: '作废意见', options: { ...textareaOptions }, rules: [requiredRule()] }
]
