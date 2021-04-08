import { FieldDef, TableColumnDef } from '@/types'
import { datetime } from '@/config/form'
export const columns: TableColumnDef[] = [
  { prop: 'time', label: '单据推送时间', minWidth: '120px' },
  { prop: 'total', label: '单据推送总条数', minWidth: '120px' },
  { prop: 'satisfyFormat', label: '满足格式要求条数', minWidth: '120px' },
  { prop: 'effective ', label: '有效单据条数', minWidth: '120px' }
]
