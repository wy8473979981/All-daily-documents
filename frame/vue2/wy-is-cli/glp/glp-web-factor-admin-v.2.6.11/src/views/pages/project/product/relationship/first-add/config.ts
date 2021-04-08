import { FieldDef, TableColumnDef } from '@/types'
import { d, remote, formatter as f } from '@/config/form'
import { formatter } from '@/config/table'

export const baseFormDefs: Array<FieldDef> = [
  { type: 'plain', model: 'projectName', label: '项目名称', rules: [{ required: true }] },
  { type: 'plain', model: 'dbName', label: '客户经理', rules: [{ required: true }] },
  { type: 'plain', model: 'businessTypeName', label: '金融产品', rules: [{ required: true }] },
  { type: 'plain', model: 'customerName', label: '授信企业', rules: [{ required: true }] },
  { type: 'plain', model: 'quotaCode', label: '授信编号', rules: [{ required: true }] },
  { type: 'plain', model: 'capitalFlow', label: '资金流向', options: { formatter: f('transcode', 'project_zjlx') }, rules: [{ required: true }] }
]
