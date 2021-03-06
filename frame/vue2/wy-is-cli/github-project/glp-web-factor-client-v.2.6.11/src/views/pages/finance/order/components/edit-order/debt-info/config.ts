import { FieldDef, TableColumnDef, GridFieldDef } from '@/types'
import { date, resp, request, action, d } from '@/config/form'
import { formatter } from '@/config/table'

export const columns: TableColumnDef[] = [
  { prop: 'selection', label: '', type: 'selection', reserveSelection: true, fixed: 'left', width: '64px' },
  { prop: 'debtReceivableNumber', label: '应收账款编号' },
  { prop: 'debtReceivableName', label: '应收账款名称' },
  { prop: 'amount', label: '（预估）应收账款金额' },
  { prop: 'buyerCompanyName', label: '买方名称' },
  { prop: 'transferSubmitTime', label: '转让起始时间' },
  { prop: 'transferEndTime', label: '转让截止时间' },
  { prop: 'opt', label: '操作', fixed: 'right', width: '120px' }
]
