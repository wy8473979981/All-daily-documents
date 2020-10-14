import { formatter } from '@/config/table'
import { FieldDef, TableColumnDef } from '@/types'
import { d, datetime } from '@/config/form'

export const columns: TableColumnDef[] = [
  { prop: 'contractName', label: '合同名称', fixed: 'left', minWidth: '200px' },
  { prop: 'contractStatus', label: '签署状态', minWidth: '200px' },
  { prop: 'opt', label: '操作', fixed: 'right', minWidth: '200px' }
]
