import { FieldDef, TableColumnDef } from '@/types'
import { d, a } from '@/config/form'
import { formatter } from '@/config/table'

export const columns: TableColumnDef[] = [
  { prop: 'sourceAddress', label: '来源页面', minWidth: '100px', formatter: formatter('empty') },
  { prop: 'fileName', label: '文件名称', minWidth: '250px', formatter: formatter('empty') },
  { prop: 'applyTime', label: '申请时间', minWidth: '170px', formatter: formatter('empty') },
  { prop: 'generateTime', label: '生成时间', minWidth: '250px', formatter: formatter('empty') },
  { prop: 'status', label: '状态', minWidth: '150px', formatter: formatter('transcode', 'downloadType') },
  { prop: 'opt', label: '操作', fixed: 'right', minWidth: '180px' }
]
