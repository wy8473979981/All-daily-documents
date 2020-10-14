import { FieldDef, TableColumnDef } from '@/types'
import { d, a, datetime } from '@/config/form'
import { formatter } from '@/config/table'
export const formDefs: FieldDef[] = [
  { type: 'select', model: 'appId', label: '资金端名称', options: { options: d('channel') } },
  { type: 'text', model: 'sceneName', label: '场景名称' },
  { type: 'date', model: 'createTime', label: '创建时间', options: { type: 'daterange', format: 'yyyy-MM-dd' } }
]

export const columns: TableColumnDef[] = [
  { prop: 'appId', label: '资金端名称', minWidth: '150px', formatter: formatter('transcode', 'channel') },
  { prop: 'sceneName', label: '场景名称', minWidth: '150px' },
  // { prop: 'voucherName', label: '凭证名称', minWidth: '170px', formatter: formatter('empty') },
  { prop: 'createTime', label: '创建时间', minWidth: '250px' },
  { prop: 'updateTime', label: '修改时间', minWidth: '250px' },
  { prop: 'status', label: '状态', minWidth: '170px', formatter: formatter('transcode', 'useStatus') },
  { prop: 'opt', label: '操作', fixed: 'right', minWidth: '180px' }
]

export const createDefs: FieldDef[] = [
  { type: 'select', model: 'appId', label: '资金端名称', options: { options: d('channel') }, rules: [{ required: true, message: '必填' }] },
  { type: 'text', model: 'sceneName', label: '场景名称', rules: [{ required: true, message: '必填' }] },
  // { type: 'select', model: 'interestSettleType', label: '结息方式', options: { options: d('interestSettleType') }, rules: [{ required: true, message: '必填' }] },
  { type: 'select', model: 'tradeType', label: '交易类型', options: { options: d('tradeType') }, rules: [{ required: true, message: '必填' }] },
  { type: 'select', model: 'fundType', label: '款项类型', options: { options: d('fundType') }, rules: [{ required: true, message: '必填' }] },
  { type: 'select', model: 'reverseFlag', label: '反冲标志', options: { options: d('reverseFlag') }, rules: [{ required: true, message: '必填' }] }
  // { type: 'radio', model: 'status', label: '状态', options: { options: d('useStatus') }, rules: [{ required: true, message: '必填' }] }
]
