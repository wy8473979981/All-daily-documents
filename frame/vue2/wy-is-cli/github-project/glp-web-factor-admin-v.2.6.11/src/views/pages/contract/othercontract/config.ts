import { FieldDef, TableColumnDef } from '@/types'
import { d, datetime, p, remote } from '@/config/form'
import { formatter } from '@/config/table'
const onValueChange = ({ form, items }: any) => {
  const signer = items.find((x: any) => x.id === form.signerId)
  form.signerName = signer.name
}
export const formDefs: FieldDef[] = [
  { type: 'text', model: 'batchNumber', label: '合同批次号', options: { placeholder: '请输入合同批次号' } },
  { type: 'text', model: 'contractCode', label: '合同编号', options: { placeholder: '请输入合同编号' } },
  { type: 'select', model: 'contractTypeId', label: '合同类型', options: { placeholder: '请输入合同类型', options: d('contract_type') } },
  { type: 'text', model: 'contractName', label: '合同名称', options: { placeholder: '请输入合同名称' } },
  { type: 'select', model: 'signerId', label: '签署方', options: { ...remote('signer-details'), placeholder: '请输入签署方', onValueChange: onValueChange } },
  { type: 'select', model: 'productType', label: '产品名称', options: { options: d('product_type'), placeholder: '请选择产品名称' } },
  { type: 'text', model: 'relatedBusinessCode', label: '关联业务编号', options: { placeholder: '请输入关联业务编号' } },
  { type: 'select', model: 'auditStatus', label: '合同审核状态', options: { options: d('process_status'), placeholder: '请选择合同审核状态' } },
  { type: 'select', model: 'signStatus', label: '合同签署状态', options: { options: d('ht_signer_status'), placeholder: '请选择合同签署状态' } },
  { type: 'date', model: 'signTime', label: '签署日期', options: { type: 'daterange', format: datetime } }
]

export const columns: TableColumnDef[] = [
  { prop: 'batchNumber', label: '合同批次号', width: '160px' },
  { prop: 'projectName', label: '项目名称', width: '320px' },
  { prop: 'contractCode', label: '合同编号', width: '180px' },
  { prop: 'typeName', label: '合同类型', width: '180px' },
  { prop: 'contractName', label: '合同名称', width: '200px' },
  { prop: 'isCustomContract', label: '合同属性', width: '80px' },
  { prop: 'signerName', label: '签署方', width: '80px' },
  { prop: 'signMethod', label: '签署方式', width: '80px', formatter: (row: any, column: any, cellValue: string, index: number) => d('sign_method')[cellValue] },
  { prop: 'contractRelatedBusinessRes', label: '关联业务编号', width: '200px', showOverflowTooltip: false },
  { prop: 'relatedBusinessType', label: '关联对象', width: '80px', formatter: (row: any, column: any, cellValue: string, index: number) => d('target_type')[cellValue] },
  { prop: 'auditStatus', label: '合同审核状态', width: '110px', formatter: (row: any, column: any, cellValue: string, index: number) => d('process_status')[cellValue] },
  { prop: 'signStatus', label: '合同签署状态', width: '110px', formatter: (row: any, column: any, cellValue: string, index: number) => d('ht_signer_status')[cellValue] },
  { prop: 'signTime', label: '签署日期', width: '120px', formatter: formatter('date') }
]
