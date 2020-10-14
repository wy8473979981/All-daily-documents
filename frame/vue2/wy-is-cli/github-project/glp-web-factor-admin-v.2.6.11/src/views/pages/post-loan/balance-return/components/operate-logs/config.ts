import { FieldDef, TableColumnDef } from '@/types'
import { d, datetime, remote } from '@/config/form'
import { formatter } from '@/config/table'

export const logColumns: TableColumnDef[] = [
  { prop: 'startTime', label: '时间', formatter: formatter('date', 'T') },
  { prop: 'taskName', label: '角色' },
  { prop: 'assigneeName', label: '用户' },
  { prop: 'auditOperation', label: '操作' },
  { prop: 'auditComment', label: '审批意见' }
]
