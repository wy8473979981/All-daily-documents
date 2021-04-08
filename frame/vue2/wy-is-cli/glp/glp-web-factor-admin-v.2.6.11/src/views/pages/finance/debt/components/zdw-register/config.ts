import { validator } from '@/config/validator'
import { format } from '@/utils/date'
import { FieldDef, TableColumnDef, GridFieldDef, TableDef } from '@/types'
import { d, date, datetime, uploadOptions, remote, a, amountOptions, requiredRule, textareaOptions, textOptions, multiEmailOptions, emailSep } from '@/config/form'

export const initFormDefs: Array<FieldDef | GridFieldDef> = [
  { type: 'text', model: 'contractNumber', label: '保理合同编号', options: { ...textOptions, disabled: true } },
  { type: 'text', model: 'debtReceivableNumber', label: '应收账款转让登记协议', options: { ...textOptions, disabled: true } },
  { type: 'select', model: 'registerType', label: '登记业务类型', options: { options: d('zdw_type') }, rules: [requiredRule()] },
  { type: 'number', model: 'dueTime', label: '登记期限（月）', options: { min: 0, precision: 0 }, rules: [requiredRule('number')] },
  { type: 'date', model: 'registerDueTime', label: '登记到期日', options: { type: 'date', format: date }, rules: [requiredRule()] },
  { type: 'text', model: 'registerCertificateNo', label: '登记证明编号', options: { ...textOptions }, rules: [requiredRule()] },
  { type: 'upload', model: 'files', label: '中登登记文件', options: { ...uploadOptions, limit: 1, tip: '' }, rules: [requiredRule('array')] },
  { type: 'text', model: 'registerModifiedCode', label: '修改码', options: { ...textOptions }, rules: [requiredRule()] },
  { type: 'textarea', model: 'registerRemark', label: '备注', options: { ...textareaOptions } }
]

export const changeFormDefs: Array<FieldDef | GridFieldDef> = [
  { type: 'text', model: 'contractNumber', label: '保理合同编号', options: { ...textOptions, disabled: true } },
  { type: 'text', model: 'debtReceivableNumber', label: '应收账款转让登记协议', options: { ...textOptions, disabled: true } },
  { type: 'select', model: 'registerType', label: '登记业务类型', options: { options: d('zdw_type') }, rules: [requiredRule()] },
  { type: 'number', model: 'dueTime', label: '登记期限（月）', options: { min: 0, precision: 0 }, rules: [requiredRule('number')] },
  { type: 'date', model: 'registerDueTime', label: '登记到期日', options: { type: 'date', format: date }, rules: [requiredRule()] },
  { type: 'text', model: 'registerCertificateNo', label: '登记证明编号', options: { ...textOptions }, rules: [requiredRule()] },
  { type: 'upload', model: 'files', label: '中登登记文件', options: { ...uploadOptions, limit: 1, tip: '' }, rules: [requiredRule('array')] },
  { type: 'textarea', model: 'registerRemark', label: '备注', options: { ...textareaOptions } }
]

export const extendFormDefs: Array<FieldDef | GridFieldDef> = [
  { type: 'text', model: 'contractNumber', label: '保理合同编号', options: { ...textOptions, disabled: true } },
  { type: 'text', model: 'debtReceivableNumber', label: '应收账款转让登记协议', options: { ...textOptions, disabled: true } },
  { type: 'select', model: 'registerType', label: '登记业务类型', options: { options: d('zdw_type'), disabled: true }, rules: [requiredRule()] },
  { type: 'number', model: 'dueTime', label: '登记期限（月）', options: { min: 0, precision: 0 }, rules: [requiredRule('number')] },
  { type: 'date', model: 'registerDueTime', label: '登记到期日', options: { type: 'date', format: date }, rules: [requiredRule()] },
  { type: 'text', model: 'registerCertificateNo', label: '登记证明编号', options: { ...textOptions }, rules: [requiredRule()] },
  { type: 'upload', model: 'files', label: '中登登记文件', options: { ...uploadOptions, limit: 1, tip: '' }, rules: [requiredRule('array')] },
  { type: 'textarea', model: 'registerRemark', label: '备注', options: { ...textareaOptions } }
]

export const cancelFormDefs: Array<FieldDef | GridFieldDef> = [
  { type: 'text', model: 'contractNumber', label: '保理合同编号', options: { ...textOptions, disabled: true } },
  { type: 'text', model: 'debtReceivableNumber', label: '应收账款转让登记协议', options: { ...textOptions, disabled: true } },
  { type: 'select', model: 'registerType', label: '登记业务类型', options: { options: d('zdw_type'), disabled: true }, rules: [requiredRule()] },
  { type: 'number', model: 'dueTime', label: '登记期限（月）', options: { min: 0, precision: 0, disabled: true }, rules: [requiredRule('number')] },
  { type: 'date', model: 'registerDueTime', label: '登记到期日', options: { type: 'date', format: datetime, disabled: true }, rules: [requiredRule()] },
  { type: 'text', model: 'registerCertificateNo', label: '登记证明编号', options: { ...textOptions }, rules: [requiredRule()] },
  { type: 'upload', model: 'files', label: '附件上传', options: { ...uploadOptions, limit: 1, tip: '' } },
  { type: 'select', model: 'cancelType', label: '注销原因', options: { options: d('zdw_cancel') }, rules: [requiredRule()] },
  { type: 'textarea', model: 'cancelRemark', label: '注销原因描述', options: { ...textareaOptions }, rules: [requiredRule()] }
]
