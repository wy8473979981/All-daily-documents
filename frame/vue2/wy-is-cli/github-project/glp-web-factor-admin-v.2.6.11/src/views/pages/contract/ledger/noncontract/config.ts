import { FieldDef, GridFieldDef, TableColumnDef } from '@/types'
import { resp, request, action, d, remote } from '@/config/form'
export const baseFormDefs = [
  { type: 'select', model: 'contractTypeId', label: '合同类型', rules: [{ required: true, message: '请选择合同类型' }], options: { options: d('contract_type'), labelWidth: '80px' }, span: 8 },
  { type: 'text', model: 'contractName', label: '合同名称', rules: [{ required: true, message: '请输入合同名称' }], options: { labelWidth: '80px' }, span: 8 },
  { type: 'upload', model: 'upload', label: '合同文本', options: { resp, request, action, labelWidth: '80px' }, rules: [{ required: true, message: '请上传合同文本', type: 'array' }], span: 24 },
  { type: 'radio', model: 'signMethod', label: '签署方式', rules: [{ required: true, message: '请选择签署方式' }], options: { options: d('sign_method'), labelWidth: '80px' }, span: 24 },
  { type: 'select', model: 'signerId1', label: '请输入签署方', rules: [{ required: true, message: '请输入签署方', type: 'number' }], options: { ...remote('user-bd-name'), labelWidth: '120px' }, span: 8 },
  { type: 'select', model: 'signerId2', label: '请输入签署方', rules: [{ required: true, message: '请输入签署方', type: 'number' }], options: { ...remote('user-bd-name'), labelWidth: '120px' }, span: 8 },
  { type: 'select', model: 'signerId3', label: '请输入签署方', rules: [{ required: true, message: '请输入签署方', type: 'number' }], options: { ...remote('user-bd-name'), labelWidth: '120px' }, span: 8 }
]
