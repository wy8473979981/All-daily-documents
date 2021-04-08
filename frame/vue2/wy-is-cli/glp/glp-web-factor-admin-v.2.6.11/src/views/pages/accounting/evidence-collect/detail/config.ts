import { FieldDef, TableColumnDef } from '@/types'
import { formatter as f } from '@/config/form'
import { formatter } from '@/config/table'

export const baseFormDefs: FieldDef[] = [
  { type: 'plain', model: 'voucherName', label: '凭证名称:' },
  { type: 'plain', model: 'subjectName', label: '科目名称:' },
  { type: 'plain', model: 'subjectCode', label: '科目编码:' },
  { type: 'plain', model: 'dcFlag', label: '借贷方:', options: { formatter: f('transcode', 'dcFlag') } },
  { type: 'plain', model: 'syncJdeStatus', label: '同步JDE状态:', options: { formatter: f('transcode', 'syncJdeStatus') } },
  { type: 'plain', model: 'syncJdeDate', label: '同步JDE日期:', options: { formatter: (value: string, model: string, form: Record<string | number, any>) => value || '-' } }
]

export const columns: TableColumnDef[] = [
  { prop: 'index', label: '序号', minWidth: '40px', formatter: (row: any, column: any, cellValue: string, index: number) => (index + 1).toString() },
  { prop: 'debtNo', label: '借据编号', minWidth: '150px', formatter: (row: any, column: any, cellValue: string, index: number) => cellValue || '-' },
  { prop: 'voucherNo', label: '凭证编号', minWidth: '150px' },
  { prop: 'amount', label: '金额(元)', minWidth: '150px', align: 'right', formatter: formatter('currency') },
  { prop: 'accountDate', label: '记账日期', minWidth: '100px' },
  { prop: 'generateDate', label: '生成日期', minWidth: '100px' }
]
