import { formatter } from '@/config/table'
import { FieldDef, TableColumnDef } from '@/types'
import { d, datetime } from '@/config/form'

export const columns: TableColumnDef[] = [
  { prop: 'fileName', label: '文件名称', fixed: 'left', minWidth: '200px' },
  { prop: 'fileNo', label: '文件编号', minWidth: '200px' },
  { prop: 'file', label: '附件', minWidth: '200px' },
  { prop: 'opt', label: '操作', fixed: 'right', minWidth: '200px' }
]
