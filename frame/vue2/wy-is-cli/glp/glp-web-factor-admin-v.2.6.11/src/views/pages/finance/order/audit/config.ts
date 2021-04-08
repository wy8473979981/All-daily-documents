import { GridFieldDef, FieldDef, TableColumnDef } from '@/types'

import { d, datetime, requiredRule, amountOptions, formatter as f, textareaOptions, uploadOptions } from '@/config/form'
import { formatter } from '@/config/table'

export const auditFormDef: Array<FieldDef | GridFieldDef> = [
  { type: 'textarea', model: 'comment', label: '审批意见', options: { ...textareaOptions } }
]
