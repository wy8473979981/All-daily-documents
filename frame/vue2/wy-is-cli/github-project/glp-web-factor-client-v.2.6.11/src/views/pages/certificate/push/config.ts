import { FieldDef, TableColumnDef } from '@/types'
import { d, datetime } from '@/config/form'

export const formDefs: FieldDef[] = [
  { type: 'date', model: 'beginWithEnd', label: '单据接收日期', options: { type: 'daterange', format: datetime } }
]

export const columns: TableColumnDef[] = [
  { prop: 'time', label: '单据推送时间', minWidth: '120px' },
  { prop: 'total', label: '单据推送总条数', minWidth: '120px' },
  { prop: 'satisfyFormat', label: '满足格式要求条数', minWidth: '120px' },
  { prop: 'effective ', label: '有效单据条数', minWidth: '120px' }
]
