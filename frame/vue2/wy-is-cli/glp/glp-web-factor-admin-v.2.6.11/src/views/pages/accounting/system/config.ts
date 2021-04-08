import { FieldDef, TableColumnDef, FormDef, GridFieldDef } from '@/types'
import { d, a, p } from '@/config/form'
import { formatter } from '@/config/table'

const dependOn = () => {
  return ({ form }: any) => {
    return !form.appId
  }
}

export const formDefs: FieldDef[] = [
  { type: 'select', model: 'appId', label: '资金端名称', options: { options: d('channel') } },
  { type: 'select', model: 'companyCode', label: '主体名称', options: { options: a('fae-companies'), disabled: dependOn() } },
  { type: 'text', model: 'subjectName', label: '会计科目名称' },
  { type: 'select', model: 'status', label: '状态', options: { options: d('useStatus') } },
  { type: 'date', model: 'createTime', label: '创建时间', options: { type: 'daterange', format: 'yyyy-MM-dd' } }
]

export const columns: TableColumnDef[] = [
  { prop: 'index', label: '序号', minWidth: '40px', formatter: (row: any, column: any, cellValue: string, index: number) => (index + 1).toString() },
  { prop: 'appId', label: '资金端名称', minWidth: '150px', formatter: formatter('transcode', 'channel') },
  { prop: 'companyName', label: '主体名称', minWidth: '250px', formatter: (row: any, column: any, cellValue: any) => (cellValue || []).join(';') || '-' },
  { prop: 'subjectCode', label: '明细科目编码', minWidth: '170px' },
  { prop: 'subjectName', label: '会计科目名称', minWidth: '250px', formatter: formatter('empty') },
  { prop: 'createTime', label: '创建时间', minWidth: '170px' },
  { prop: 'status', label: '状态', minWidth: '100px', formatter: formatter('transcode', 'useStatus') },
  { prop: 'opt', label: '操作', fixed: 'right', minWidth: '180px' }
]

export const createDefs: Array<FieldDef | GridFieldDef> = [
  { type: 'select', model: 'appId', label: '资金端名称', options: { options: d('channel') }, rules: [{ required: true, message: '必填' }] },
  { type: 'text', model: 'subjectCode', label: '明细科目编码', rules: [{ required: true, message: '必填' }] },
  { type: 'text', model: 'subjectName', label: '会计科目名称', rules: [{ required: true, message: '必填' }] }
]

export const editDefs: FieldDef[] = [
  { type: 'select', model: 'appId', label: '资金端名称', options: { disabled: true, options: d('channel') }, rules: [{ required: true, message: '必填' }] },
  { type: 'text', model: 'subjectCode', label: '明细科目编码', options: { disabled: true }, rules: [{ required: true, message: '必填' }] },
  { type: 'text', model: 'subjectName', label: '会计科目名称', rules: [{ required: true, message: '必填' }] }
]
