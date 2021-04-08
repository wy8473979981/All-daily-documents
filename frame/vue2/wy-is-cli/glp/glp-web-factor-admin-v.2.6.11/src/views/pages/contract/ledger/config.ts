import { FieldDef, TableColumnDef } from '@/types'
import { datetime, d, p, remote } from '@/config/form'
import { formatter } from '@/config/table'
const onValueChange = ({ form, items }: any) => {
  const signer = items.find((x: any) => x.id === form.signerId)
  form.signerName = signer.name
}
const onValueChange2 = ({ form, items }: any) => {
  const project = items.find((x: any) => x.projectId === form.projectId)
  form.projectName = project.projectName
}
export const formDefs: FieldDef[] = [
  { type: 'text', model: 'batchNumber', label: '合同批次号', options: { placeholder: '请输入合同批次号' } },
  { type: 'text', model: 'contractCode', label: '合同编号', options: { placeholder: '请输入合同编号' } },
  { type: 'select', model: 'contractTypeId', label: '合同类型', options: { placeholder: '请输入合同类型', options: d('contract_type') } },
  { type: 'text', model: 'contractName', label: '合同名称', options: { placeholder: '请输入合同名称' } },
  { type: 'select', model: 'signerId', label: '签署方', options: { ...remote('signer-details'), placeholder: '请输入签署方', onValueChange: onValueChange } },
  { type: 'select', model: 'projectId', label: '项目名称', options: { ...remote('project-name'), placeholder: '请输入项目名称', onValueChange: onValueChange2 } },
  { type: 'select', model: 'productType', label: '产品名称', options: { options: d('product_type'), placeholder: '请选择产品名称', filterable: true } },
  { type: 'text', model: 'targetCode', label: '关联业务编号', options: { placeholder: '请输入关联业务编号' } },
  { type: 'select', model: 'status', label: '合同签署状态', options: { options: d('ht_signer_status'), placeholder: '请选择合同签署状态' } },
  { type: 'date', model: 'signTime', label: '签署日期', options: { type: 'daterange', format: datetime } }
]

export const columns: TableColumnDef[] = [
  { prop: 'batchNumber', label: '合同批次号', width: '150px' },
  { prop: 'projectName', label: '项目名称', width: '240px' },
  { prop: 'productType', label: '产品名称', width: '180px', formatter: (row: any, column: any, cellValue: string, index: number) => { return d('product_type')[cellValue] } },
  { prop: 'contractCode', label: '合同编号', width: '200px' },
  { prop: 'contractTypeId', label: '合同类型', width: '180px', formatter: (row: any, column: any, cellValue: string, index: number) => d('contract_type')[cellValue] },
  { prop: 'contractName', label: '合同名称', width: '240px' },
  { prop: 'isCustomContract', label: '合同属性', width: '80px', formatter: (row: any, column: any, cellValue: any, index: number) => { return cellValue ? '非标合同' : '标准合同' } },
  { prop: 'signerName', label: '签署方', width: '80px' },
  { prop: 'signMethod', label: '签署方式', width: '80px', formatter: (row: any, column: any, cellValue: string, index: number) => d('sign_method')[cellValue] },
  { prop: 'contractRelatedBusinessRes', label: '关联业务编号', width: '250px', showOverflowTooltip: false },
  { prop: 'targetType', label: '关联对象', width: '80px', formatter: (row: any, column: any, cellValue: any, index: number) => { return d('target_type')[cellValue] } },
  { prop: 'status', label: '合同签署状态', width: '120px', formatter: (row: any, column: any, cellValue: any, index: number) => { return d('ht_signer_status')[cellValue] } },
  { prop: 'signTime', label: '签署日期', width: '120px', formatter: formatter('date') },
  { prop: 'opt', label: '操作', fixed: 'right', width: '250px' }
]

export const columns1: TableColumnDef[] = [
  { prop: 'selection', label: '', fixed: 'left', type: 'selection', reserveSelection: true, width: '40px' },
  ...columns
]
export function arrDiff (arr: any[]) {
  if (arr.length > 0) {
    return !arr.some(function (value: any, index: any) {
      return value.projectId !== arr[0].projectId
    })
  } else {
    return true
  }
}
