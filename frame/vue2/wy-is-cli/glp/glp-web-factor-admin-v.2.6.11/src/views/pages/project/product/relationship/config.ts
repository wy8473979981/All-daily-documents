import { FieldDef, TableColumnDef } from '@/types'
import { d, remote, p } from '@/config/form'
import { formatter } from '@/config/table'

export const relationFormDefs: FieldDef[] = [
  { type: 'select', model: 'counterpartyCustomerName', label: '买方名称', options: { ...remote('buyer-name-by-project') } },
  { type: 'select', model: 'directCustomerName', label: '卖方名称', options: { ...remote('seller-name-by-project') } }
]

export const relationColumns: TableColumnDef[] = [
  { prop: 'relationCustomerName', label: '买方名称', fixed: 'left' },
  { prop: 'customerName', label: '卖方名称' },
  { prop: 'opt', label: '操作', fixed: 'right', minWidth: '200px' }
]

export const formDefs: FieldDef[] = [
  { type: 'select', model: 'buyerId', label: '买方名称', options: { ...remote('buyer-account-project') } },
  { type: 'select', model: 'sellerId', label: '卖方名称', options: { ...remote('seller-account-project') } },
  { type: 'select', model: 'status', label: '关系状态', options: { options: d('relationshipStatus') } },
  { type: 'text', model: 'buyerSellerCode', label: '买卖方关系编号' }
]

export const columns: TableColumnDef[] = [
  { prop: 'buyName', label: '买方名称', fixed: 'left', minWidth: '250px' },
  { prop: 'sellName', label: '卖方名称', minWidth: '250px' },
  { prop: 'updateTime', label: '更新时间', minWidth: '200px', formatter: formatter('date', 'T') },
  { prop: 'buyerSellerCode', label: '买卖方关系编号', minWidth: '200px' },
  { prop: 'status', label: '状态', minWidth: '200px', formatter: formatter('transcode', 'relationshipStatus') },
  { prop: 'opt', label: '操作', fixed: 'right', minWidth: '200px' }
]
