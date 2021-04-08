import { FieldDef, TableColumnDef } from '@/types'
import { formatter } from '@/config/table'

export const formDefs: FieldDef[] = [
  { type: 'text', model: 'a', label: '合同名称' },
  { type: 'text', model: 'b', label: '适用产品' }
]

export const columns: TableColumnDef[] = [
  { prop: 'a', label: '申请编号', fixed: 'left' },
  { prop: 'b', label: '合同类型', formatter: formatter('transcode', 'customerType') },
  { prop: 'c', label: '合同名称', formatter: formatter('transcode', 'realnameStatus') },
  { prop: 'd', label: '版本号', formatter: formatter('transcode', 'isOrNot') },
  { prop: 'e', label: '说明', formatter: formatter('transcode', 'isOrNot') },
  { prop: 'f', label: '审核状态', formatter: formatter('transcode', 'isOrNot') },
  { prop: 'opt', label: '操作', fixed: 'right', minWidth: '200px' }
]
