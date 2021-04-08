import { FieldDef, TableColumnDef } from '@/types'

export const columns: TableColumnDef[] = [
  { prop: 'orderNum', label: '应还日期' },
  { prop: 'paperNumber', label: '应还金额' },
  { prop: 'paperFrom', label: '应还融资本金' },
  { prop: 'paperFromBank', label: '应还保理融资费' },
  { prop: 'paperUsed', label: '应还违约金' },
  { prop: 'paperUsedBank', label: '应还总额' },
  { prop: 'paperUsedBank1', label: '已还融资本金' },
  { prop: 'paperAmount', label: '已还保理融资费' },
  { prop: 'paperFromDate', label: '已还违约金' }
]
