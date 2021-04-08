import { formatter } from '@/config/table'
import { FieldDef, TableColumnDef } from '@/types'
import { d, remote } from '@/config/form'

export const formDefs: FieldDef[] = [
  { type: 'select', model: 'customerCode', label: '客户名称', options: { ...remote('customer-name') } },
  { type: 'select', model: 'statusList', label: '额度状态', options: { options: d('quotaStatus'), multiple: true, defaultValue: d('quotaStatus')[0] } },
  { type: 'text', model: 'creditElement', label: '额度名称' },
  { type: 'text', model: 'cmName', label: '客户经理' }
]

export const columns: TableColumnDef[] = [
  { prop: 'customerName', label: '客户名称', fixed: 'left', minWidth: '200px' },
  { prop: 'creditCode', label: '额度编号', minWidth: '200px' },
  { prop: 'businessType', label: '业务标签', minWidth: '200px', formatter: formatter('transcode', 'quota_ywbq') },
  { prop: 'financeName', label: '额度名称', minWidth: '200px' },
  { prop: 'relationType', label: '额度属性', minWidth: '200px', formatter: formatter('transcode', 'quota_edsx') },
  { prop: 'amount', label: '获批额度', width: '200px', formatter: formatter('currency'), align: 'right' },
  { prop: 'availableUseAmount', label: '可用额度', width: '200px', formatter: formatter('currency'), align: 'right' },
  { prop: 'loopType', label: '是否循环额度', minWidth: '200px', formatter: formatter('transcode', 'quota_loop') },
  { prop: 'quotaValidity', label: '额度有效期', minWidth: '200px', formatter: formatter('date') },
  { prop: 'preOccupyAmount', label: '预占额度', formatter: formatter('currency'), align: 'right', width: '200px' },
  { prop: 'actualOccupyAmount', label: '实占额度', formatter: formatter('currency'), align: 'right', width: '200px' },
  { prop: 'frozenAmount', label: '冻结额度', minWidth: '200px', formatter: formatter('currency') },
  { prop: 'status', label: '额度状态', minWidth: '200px', formatter: formatter('transcode', 'quotaStatus') },
  { prop: 'cmName', label: '客户经理', minWidth: '200px' },
  { prop: 'rmName', label: '风控经理', minWidth: '200px' },
  { prop: 'opt', label: '操作', fixed: 'right', minWidth: '200px' }
]
