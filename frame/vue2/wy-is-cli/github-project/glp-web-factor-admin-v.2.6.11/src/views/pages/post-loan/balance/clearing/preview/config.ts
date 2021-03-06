import { TableColumnDef } from '@/types'
import { formatter } from '@/config/table'

export const columns: TableColumnDef[] = [
  { prop: 'repayment', label: '回款单号' },
  { prop: 'repaymentAmount', label: '流水金额', formatter: formatter('currency') },
  { prop: 'availableAmount', label: '未核销金额', formatter: formatter('currency') },
  { prop: 'preAvailableAmount', label: '预核销金额', formatter: formatter('currency') },
  { prop: 'remainAvailableAmount', label: '剩余未核销金额', formatter: formatter('currency') }
]
