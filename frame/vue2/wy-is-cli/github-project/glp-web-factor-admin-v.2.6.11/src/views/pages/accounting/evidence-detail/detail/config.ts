import { FieldDef, TableColumnDef } from '@/types'
import { formatter } from '@/config/table'
import { formatter as f } from '@/config/form'

export const baseFormDefs: FieldDef[] = [
  { type: 'plain', model: 'voucherNo', label: '凭证编号:' },
  { type: 'plain', model: 'voucherName', label: '凭证名称:' },
  { type: 'plain', model: 'debtNo', label: '借据编号:', options: { formatter: (value: string, model: string, form: Record<string | number, any>) => value || '-' } },
  { type: 'plain', model: 'accountingDate', label: '记账日期:' },
  { type: 'plain', model: 'createTime', label: '生成日期:' },
  { type: 'plain', model: 'syncJdeDate', label: '同步JDE日期:', options: { formatter: (value: string, model: string, form: Record<string | number, any>) => value || '-' } },
  { type: 'plain', model: 'syncJdeStatus', label: '同步JDE状态:', options: { formatter: f('transcode', 'syncJdeStatus') } }
]

const p = (row: any, column: any, cellValue: string, index: number) => {
  const value = row.amount; const unit = ''; const precise = 2; const suffix = ''
  if (isNaN(value)) return value
  const text = Number(value).toFixed(precise)
  const bit = text.indexOf('.') < 0 ? '' : text.substr(text.indexOf('.'))
  const f = text.replace(/\..*$/, '').split('').reverse().join('').replace(/(\d{3})\B/g, (_, c) => _ + ',').split('').reverse().join('') + bit
  return unit + f + suffix || '-'
}

export const columns: TableColumnDef[] = [
  { prop: 'index', label: '行号', minWidth: '40px', formatter: (row: any, column: any, cellValue: string, index: number) => (index + 1).toString() },
  { prop: 'dcFlag', label: '借贷方', minWidth: '150px', formatter: formatter('transcode', 'dcFlag') },
  { prop: 'subjectName', label: '科目名称', minWidth: '150px' },
  { prop: 'subjectCode', label: '科目编码', minWidth: '150px' },
  { prop: 'amount', label: '金额(元)', minWidth: '100px', formatter: p }
]
