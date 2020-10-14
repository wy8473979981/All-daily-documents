import { FieldDef, TableColumnDef } from '@/types'
import { formatter } from '@/config/table'

export const formDefs: FieldDef[] = [
  { type: 'text', model: 'loginName', label: '账号' },
  { type: 'text', model: 'mobile', label: '手机号' }
]

export const columns: TableColumnDef[] = [
  { prop: 'loginName', label: '账号', fixed: 'left', minWidth: '150px' },
  { prop: 'accountType', label: '账号类型', formatter: formatter('transcode', 'accountType'), minWidth: '200px' },
  { prop: 'mobile', label: '手机号', minWidth: '200px' },
  { prop: 'customerName', label: '关联客户', minWidth: '200px' },
  { prop: 'projectList', label: '关联项目', minWidth: '400px' },
  { prop: 'opt', label: '操作', fixed: 'right', minWidth: '200px' }
]
