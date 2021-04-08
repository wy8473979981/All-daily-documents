import { FieldDef, TableColumnDef } from '@/types'
import { d, datetime } from '@/config/form'
import { formatter } from '@/config/table'
export const formDefs: FieldDef[] = [
  { type: 'select', model: 'appId', label: '资金端名称', options: { options: d('channel') } },
  { type: 'date', model: 'summaryMonth', label: '汇总月份', options: { type: 'month', format: 'yyyyMM' } },
  { type: 'text', model: 'voucherName', label: '凭证名称' },
  { type: 'select', model: 'dcFlag', label: '借贷方', options: { options: d('dcFlag') } },
  { type: 'text', model: 'subjectName', label: '科目名称' },
  { type: 'select', model: 'syncJdeStatus', label: '同步JDE状态', options: { options: d('syncJdeStatus') } }
]

export const columns: TableColumnDef[] = [
  { prop: 'appId', label: '资金端名称', minWidth: '150px', formatter: formatter('transcode', 'channel') },
  { prop: 'summaryMonthCn', label: '汇总月份', minWidth: '150px' },
  { prop: 'voucherName', label: '凭证名称', minWidth: '150px', formatter: formatter('transcode', 'jdeType') },
  { prop: 'dcFlag', label: '借贷方', minWidth: '170px', formatter: formatter('transcode', 'dcFlag') },
  { prop: 'amount', label: '金额(元)', minWidth: '250px', align: 'right', formatter: formatter('currency') },
  { prop: 'subjectName', label: '科目名称', minWidth: '200px' },
  { prop: 'subjectCode', label: '科目编码', minWidth: '200px' },
  { prop: 'syncJdeDate', label: '同步日期', minWidth: '200px', formatter: (row: any, column: any, cellValue: string, index: number) => cellValue || '-' },
  { prop: 'syncJdeStatus', label: '同步JDE状态', minWidth: '170px', formatter: formatter('transcode', 'syncJdeStatus') },
  { prop: 'opt', label: '操作', fixed: 'right', minWidth: '180px' }
]
