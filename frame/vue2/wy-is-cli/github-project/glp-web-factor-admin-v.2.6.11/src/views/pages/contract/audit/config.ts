import { FieldDef, TableColumnDef, GridFieldDef } from '@/types'
import { d, datetime } from '@/config/form'
import { formatter } from '@/config/table'

export const columns: TableColumnDef[] = [
  { prop: 'contractCode', label: '合同编号', width: '200px' },
  { prop: 'contractTypeId', label: '合同类型', width: '200px' },
  { prop: 'contractName', label: '合同名称', width: '200px' },
  { prop: 'isCustomContract', label: '合同属性', width: '100px' },
  { prop: 'signerName', label: '签署方', width: '100px' },
  { prop: 'signMethod', label: '签署方式', width: '120px', formatter: (row: any, column: any, cellValue: string, index: number) => d('sign_method')[cellValue] },
  { prop: 'contractRelatedBusinessRes', label: '关联业务编号', width: '320px', showOverflowTooltip: false },
  { prop: 'relatedBusinessType', label: '关联对象', width: '100px', formatter: (row: any, column: any, cellValue: string, index: number) => d('target_type')[cellValue] },
  { prop: 'opt', label: '操作', fixed: 'right', minWidth: '260px' }
]
export const riskColumns: TableColumnDef[] = [
  { prop: 'contractCode', label: '用信清单', minWidth: '120px' },
  { prop: 'opt', label: '操作', minWidth: '120px' }
]

export const columns2: TableColumnDef[] = [
  { prop: 'createTime', label: '时间', minWidth: '120px', formatter: formatter('date', 'T') },
  { prop: 'operatorName', label: '操作人', minWidth: '120px' },
  { prop: 'auditType', label: '审批状态', minWidth: '120px', formatter: (row: any, column: any, cellValue: string, index: number) => d('audit_status')[cellValue] },
  { prop: 'remark', label: '意见', minWidth: '120px' }
]

export const defs2: Array<GridFieldDef | FieldDef> = [
  { type: 'textarea', model: 'type', label: '审批意见' }
]
