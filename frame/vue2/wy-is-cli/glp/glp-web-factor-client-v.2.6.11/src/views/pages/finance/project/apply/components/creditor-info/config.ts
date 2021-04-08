import { FieldDef, TableColumnDef, GridFieldDef } from '@/types'
import { date, resp, request, action } from '@/config/form'
import { formatter } from '@/config/table'

export const formDefs: Array<FieldDef | GridFieldDef> = [
  { type: 'select', model: 'type', label: '基础债权类型', options: { options: { 1: 'A', 2: 'B' } } },
  { type: 'text', model: 'no', label: '基础债权金额' }
]

export const columns: TableColumnDef[] = [
  { prop: 'selection', label: '', type: 'selection', reserveSelection: true, fixed: 'left', width: '64px' },
  { prop: 'no', label: '应收账款编号' },
  { prop: 'name', label: '应收帐款名称' },
  { prop: 'buyer', label: '买方名称' },
  { prop: 'seller', label: '卖方名称' },
  { prop: 'amount', label: '（预估）应收账款金额' },
  { prop: 'submittDate', label: '提交时间' },
  { prop: 'endDate', label: '应收账款截止时间' },
  { prop: 'status', label: '应收账款状态', formatter: formatter('transcode', 'status') },
  { prop: 'signStatus', label: '融资合同签署状态', formatter: formatter('transcode', 'status') },
  { prop: 'opt', label: '操作', fixed: 'right', width: '120px' }
]
