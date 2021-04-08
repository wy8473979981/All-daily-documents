import { FieldDef, TableColumnDef } from '@/types'
import { formatter } from '@/config/table'

export const formDefs: FieldDef[] = [
  { type: 'text', model: 'a', label: '合同名称' },
  { type: 'text', model: 'b', label: '适用产品' },
  { type: 'text', model: 'beginWithEnd', label: '变更时间' }
]

export const columns: TableColumnDef[] = [
  { prop: 'a', label: '合同模板编号', fixed: 'left' },
  { prop: 'b', label: '合同名称', formatter: formatter('transcode', 'customerType') },
  { prop: 'c', label: '适用产品', formatter: formatter('transcode', 'realnameStatus') },
  { prop: 'd', label: '版本号', formatter: formatter('transcode', 'isOrNot') },
  { prop: 'e', label: '说明适用场景', formatter: formatter('transcode', 'isOrNot') },
  { prop: 'f', label: '更新时间', formatter: formatter('transcode', 'isOrNot') },
  { prop: 'g', label: '模板状态', formatter: formatter('transcode', 'isOrNot') },
  { prop: 'opt', label: '操作', fixed: 'right', minWidth: '200px' }
]
