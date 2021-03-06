import { FieldDef, TableColumnDef } from '@/types'
import { d, p, datetime, remote } from '@/config/form'
import { formatter } from '@/config/table'

export const columns: TableColumnDef[] = [
  { prop: 'createTime', label: '时间', formatter: formatter('date', 'T') },
  { prop: 'operatorName', label: '操作人' },
  { prop: 'auditNode', label: '审批节点' },
  { prop: 'auditStatus', label: '审批状态' },
  { prop: 'remark', label: '审批意见' }
]
