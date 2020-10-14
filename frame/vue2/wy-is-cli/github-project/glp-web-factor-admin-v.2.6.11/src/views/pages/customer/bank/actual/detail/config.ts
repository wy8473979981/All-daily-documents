import { formatter } from '@/config/table'
import { FieldDef, TableColumnDef } from '@/types'
import { d, datetime } from '@/config/form'

export const columns: TableColumnDef[] = [
  { prop: 'endTime', fixed: 'left', label: '创建时间', minWidth: '200px', formatter: formatter('date', 'T') },
  { prop: 'assigneeName', label: '操作人', minWidth: '200px' },
  { prop: 'auditOperation', label: '审批状态', minWidth: '200px', formatter: formatter('transcode', 'bank_shzt') },
  { prop: 'auditComment', fixed: 'right', label: '审核意见', minWidth: '200px' }
]
