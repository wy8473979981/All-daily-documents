import { FieldDef, GridFieldDef, TableColumnDef } from '@/types'
import { formatter } from '@/config/table'

export const baseFormDefs: Array<FieldDef|GridFieldDef> = [
  { span: 7, def: { type: 'plain', model: 'projectName', label: '项目名称', rules: [{ required: true }] } },
  { span: 7, def: { type: 'plain', model: 'bdName', label: '客户经理', rules: [{ required: true }] } },
  { span: 4, def: { type: 'plain', model: 'businessTypeName', label: '金融产品' } },
  { span: 6, def: { type: 'custom', model: 'quotaCode', customType: 'link', label: '额度编号' } }
]

export const approvalColumns: TableColumnDef[] = [
  { prop: 'endTime', label: '创建时间', minWidth: '200px', formatter: formatter('date', 'T') },
  { prop: 'assigneeName', label: '操作人', minWidth: '200px' },
  { prop: 'auditOperation', label: '审批状态', minWidth: '200px', formatter: formatter('transcode', 'bank_shzt') },
  { prop: 'auditComment', label: '审核意见', minWidth: '200px' }
]
