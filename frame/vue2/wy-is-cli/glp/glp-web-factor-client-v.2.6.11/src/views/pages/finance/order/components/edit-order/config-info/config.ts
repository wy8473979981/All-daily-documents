import { FieldDef, TableColumnDef, GridFieldDef } from '@/types'
import { date, resp, request, action, d, a, requiredRule, formatter as f } from '@/config/form'

export const formDefs: Array<FieldDef | GridFieldDef> = [
  { type: 'plain', model: 'capitalFlow', label: '资金流向', options: { formatter: f('transcode', 'project_zjlx') } },
  { type: 'plain', model: 'transferMethod', label: '基础债权获取方式', options: { formatter: f('transcode', 'project_sjcsfs') } },
  { type: 'plain', model: 'businessType', label: '产品模式', options: { formatter: f('transcode', 'quota_ywbq') } },
  { type: 'plain', model: 'creditDuration', label: '用信期限' },
  { type: 'plain', model: 'debtType', label: '基础债权类型', options: { formatter: f('transcode', 'project_jczqlx') } }
]
