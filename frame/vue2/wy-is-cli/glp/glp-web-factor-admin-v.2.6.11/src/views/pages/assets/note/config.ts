import { FieldDef, TableColumnDef } from '@/types'
import { datetime } from '@/config/form'

export const formDefs: FieldDef[] = [
  { type: 'text', model: 'buyer', label: '买方名称' },
  { type: 'date', model: 'date', label: '到期日', options: { type: 'daterange', format: datetime } },
  { type: 'text', model: 'seller', label: '卖方名称' },
  { type: 'text', model: 'amount', label: '金额' }
]

export const columns: TableColumnDef[] = [
  { prop: 'noteNo', label: '票据号码' },
  { prop: 'buyer', label: '买方名称' },
  { prop: 'seller', label: '买方名称' },
  { prop: 'name', label: '承兑人名称' },
  { prop: 'startDate', label: '出票日' },
  { prop: 'endDate', label: '到期日' },
  { prop: 'amount', label: '票据金额' },
  { prop: 'status', label: '票据状态' },
  { prop: 'opt', label: '操作', fixed: 'right', width: '160px' }
]
