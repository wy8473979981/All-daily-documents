import { validator } from '@/config/validator'
import { format } from '@/utils/date'
import { FieldDef, TableColumnDef, GridFieldDef, TableDef } from '@/types'
import { d, date, datetime, uploadOptions, remote, a, amountOptions, requiredRule, textareaOptions, textOptions, multiEmailOptions, emailSep } from '@/config/form'

export const formDefs: Array<FieldDef | GridFieldDef> = [
  { type: 'upload', model: 'files', label: '上传的附件', options: { ...uploadOptions, limit: 1 }, rules: [requiredRule('array')] },
  { type: 'textarea', model: 'desc', label: '附件说明', options: { ...textareaOptions } }
]
