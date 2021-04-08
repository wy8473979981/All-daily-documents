import { FieldDef, TableColumnDef, GridFieldDef } from '@/types'
import { d, date, resp, request, action, uploadOptions } from '@/config/form'

export const formDefs: Array<FieldDef | GridFieldDef> = [
  { span: 24, def: { type: 'upload', model: 'files', label: '上传附件', options: { ...uploadOptions } } }
]
