import { GridFieldDef, FieldDef, TableColumnDef } from '@/types'

import { d, datetime, requiredRule, amountOptions, formatter as f, textareaOptions, uploadOptions } from '@/config/form'
import { formatter } from '@/config/table'

export const logColumns: TableColumnDef[] = [
  { prop: 'index', label: '序号', type: 'index', width: '80px' },
  { prop: 'createTime', label: '时间', formatter: formatter('date', 'T') },
  { prop: 'operatorName', label: '操作人' },
  { prop: 'auditNode', label: '审批节点' },
  { prop: 'auditStatus', label: '审批状态' },
  { prop: 'remark', label: '审批意见' }
]

export const auditFormDef: Array<FieldDef | GridFieldDef> = [
  { type: 'textarea', model: 'approvalComments', label: '审批意见', options: { ...textareaOptions } },
  { type: 'upload', model: 'reviewFiles', label: '上传/查看附件', options: { ...uploadOptions } }
]
