import { FieldDef, TableColumnDef } from '@/types'
import { remote } from '@/config/form'
import { formatter } from '@/config/table'

export const formDefs: FieldDef[] = [
  { type: 'select', model: 'customerId', label: '客户名称', options: { ...remote('customer-name') } }
]

export const columns: TableColumnDef[] = [
  { prop: 'customerName', label: '客户名称', fixed: 'left', minWidth: '220px' },
  { prop: 'customerType', label: '客户类型', formatter: formatter('transcode', 'charCustomerType'), minWidth: '100px' },
  { prop: 'realnameStatus', label: '实名状态', formatter: formatter('transcode', 'realnameStatus'), minWidth: '100px' },
  { prop: 'ifNeedRealname', label: '登录是否需实名', formatter: formatter('transcode', 'isOrNot'), minWidth: '200px' },
  { prop: 'ifNeedProxyer', label: '是否开启合同签署代理人', formatter: formatter('transcode', 'isOrNot'), width: '220px' },
  { prop: 'opt', label: '操作', fixed: 'right', minWidth: '220px' }
]
