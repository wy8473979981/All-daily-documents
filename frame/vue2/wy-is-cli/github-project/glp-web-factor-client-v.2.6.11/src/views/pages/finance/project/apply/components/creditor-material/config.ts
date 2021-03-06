import { FieldDef, TableColumnDef, GridFieldDef } from '@/types'
import { d, date, resp, request, action } from '@/config/form'

export const formDefs: Array<FieldDef | GridFieldDef> = [
  { span: 24, def: { type: 'upload', model: 'certs', label: '上传附件', options: { resp, request, action }, rules: [{ required: true }] } }
]
