import { FieldDef, TableColumnDef } from '@/types'
import { d, a, p, remote } from '@/config/form'
import { formatter } from '@/config/table'

export const formDefs: FieldDef[] = [
  { type: 'select', model: 'projectId', label: '项目名称', options: { ...remote('project-name'), filterable: true } },
  { type: 'select', model: 'businessType', label: '金融产品', options: { options: p('business-type-name'), filterable: true } },
  { type: 'text', model: 'quotaCode', label: '额度编号' },
  { type: 'select', model: 'projectStatus', label: '项目状态', options: { options: d('projectStatus') } },
  { type: 'select', model: 'bdUserId', label: 'BD负责人', options: { options: p('user-bd-name'), filterable: true } }
]

export const columns: TableColumnDef[] = [
  { prop: 'projectName', label: '项目名称', fixed: 'left', minWidth: '200px' },
  { prop: 'projectCode', label: '项目编号', minWidth: '200px' },
  { prop: 'updateTime', label: '更新时间', minWidth: '200px', formatter: formatter('date', 'T') },
  { prop: 'businessTypeName', label: '金融产品', minWidth: '200px' },
  { prop: 'quotaCode', label: '额度编号', minWidth: '200px' },
  { prop: 'status', label: '项目状态', minWidth: '100px', formatter: formatter('transcode', 'projectStatus') },
  { prop: 'bdName', label: '客户经理', minWidth: '200px' },
  { prop: 'opt', label: '操作', fixed: 'right', minWidth: '220px' }
]
