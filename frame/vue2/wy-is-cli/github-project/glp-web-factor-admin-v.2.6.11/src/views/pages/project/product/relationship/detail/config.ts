import { FieldDef, TableColumnDef } from '@/types'
import { d, remote } from '@/config/form'
import { formatter } from '@/config/table'

export const columns: TableColumnDef[] = [
  { prop: 'endTime', label: '创建时间', minWidth: '200px', formatter: formatter('date', 'T') },
  { prop: 'assigneeName', label: '操作人', minWidth: '200px' },
  { prop: 'auditOperation', label: '审批状态', minWidth: '200px', formatter: formatter('transcode', 'bank_shzt') },
  { prop: 'auditComment', label: '审核意见', minWidth: '200px' }
]
