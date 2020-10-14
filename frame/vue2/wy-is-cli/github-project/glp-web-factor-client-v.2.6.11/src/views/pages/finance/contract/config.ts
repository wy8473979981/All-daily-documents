import { FieldDef, TableColumnDef } from '@/types'
import { datetime, d, p, remote } from '@/config/form'
import { formatter } from '@/config/table'
export const formDefs: FieldDef[] = [
  { type: 'text', model: 'batchNumber', label: '合同批次号', options: { placeholder: '请输入合同批次号' } },
  { type: 'text', model: 'contractCode', label: '合同编号', options: { placeholder: '请输入合同编号' } },
  { type: 'select', model: 'projectName', label: '项目名称', options: { ...remote('project-name'), placeholder: '请输入项目名称' } },
  { type: 'select', model: 'contractTypeId', label: '合同类型', options: { options: d('contract_type'), placeholder: '请选择合同类型' } }
]

const commonColumn: any = [
  { prop: 'selection', label: '', fixed: 'left', type: 'selection', reserveSelection: true, width: '64px' },
  { prop: 'batchNumber', label: '合同批次号', minWidth: '180px' },
  { prop: 'projectName', label: '项目名称', minWidth: '180px' },
  { prop: 'contractCode', label: '合同编号', minWidth: '180px' },
  { prop: 'contractTypeId', label: '合同类型', minWidth: '180px', formatter: (row: any, column: any, cellValue: string, index: number) => d('contract_type')[cellValue] },
  { prop: 'signerName', label: '签署方', minWidth: '120px' },
  { prop: 'signMethod', label: '签署方式', minWidth: '120px', formatter: (row: any, column: any, cellValue: string, index: number) => d('sign_method')[cellValue] },
  { prop: 'status', label: '客户签署状态', minWidth: '120px', formatter: (row: any, column: any, cellValue: any, index: number) => { return d('signer_status')[cellValue] } }
]
export const columns1: TableColumnDef[] = [
  ...commonColumn,
  { prop: 'opt', label: '操作', fixed: 'right', minWidth: '150px' }
]
export const columns2: TableColumnDef[] = [
  ...commonColumn,
  { prop: 'signTime', label: '签署完成日期', minWidth: '100px', formatter: formatter('date') }
]
