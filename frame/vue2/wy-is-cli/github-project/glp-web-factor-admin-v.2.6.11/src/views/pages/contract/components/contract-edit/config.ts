import { d, remote, a, uploadOptions, formatter as f } from '@/config/form'
import { FieldDef, GridFieldDef } from '@/types/form'
import { emailValidator } from '@/config/validator/email'
import { auditNodeEdit } from '@/views/pages/contract/common/approvalRole'
import Vue from 'vue'
import addRow from '@/utils/addrow'
const uploadOther = { type: 'list', limit: 1, maxSize: '10M', tip: '请选择docx文件，大小不超过10M', accept: '.docx' }
const _uploadOptions: any = { ...uploadOptions, ...uploadOther }
let initData: any = {}

const modifyAble = ({ form }: any) => {
  return !form.allowChangeSignMethod || !auditNodeEdit[form.auditNode.toString()]
}
const autoSignDisabled = (x: string, y: string, isEdit = false) => {
  return ({ form }: any): any => {
    if (form[x].includes('普洛斯')) {
      form[y] = '1'
      return true
    }
    if (isEdit) {
      return !form.allowChangeSignMethod || !auditNodeEdit[form.auditNode.toString()]
    }
  }
}

const dependOn = (param: any, flag?: boolean) => {
  return ({ form }: any) => {
    if (flag) {
      return form.signMethod === param
    } else {
      return form.signMethod !== param
    }
  }
}
const relativeContractList = ['1', '4', '12']
const relativeContract = ({ form }: any) => {
  const contractTypeId = form?.contractTypeId
  if (relativeContractList.includes(contractTypeId)) {
    return false
  } else {
    return true
  }
}

const onValueChange = (param: any) => {
  return ({ form, items, value }: any) => {
    const signer = items.find((item: any) => {
      return item.id === value
    })
    form[param] = signer && signer.name
  }
}

const oD = d('contract_type')
const oD2 = {
  13: oD['13'],
  14: oD['14']
}

export const emailConfig: any = addRow({ type: 'textarea', model: 'emailNotifyAddress', label: '邮箱', rules: [{ required: true, message: '邮箱不能为空' }, { validator: emailValidator, trigger: 'blur', sep: ',' }], options: { labelWidth: '90px', placeholder: '输入邮箱，多个邮箱时用逗号隔开', disabled: modifyAble }, dependOn: dependOn('3', true) })

const getInitData = ({ form, value }: any) => {
  if (form.signMethod === '1' || form.signMethod === '3') {
    Object.keys(initData).forEach(key => {
      Vue.set(form, key, initData[key])
    })
  }
}
const copySignerId: any = []
for (let i = 1; i < 4; i++) {
  copySignerId.push(addRow([
    { type: 'select', model: `signerId${i}`, label: '签署方', options: { ...remote(`signer-details${i}`), labelWidth: '90px', onValueChange: onValueChange(`signerName${i}`) } },
    { type: 'select', model: `autoSign${i}`, label: '签署类型', options: { options: { 0: '手动签', 1: '自动签' }, labelWidth: '90px', disabled: autoSignDisabled(`signerName${i}`, `autoSign${i}`) }, dependOn: dependOn('1', true) }
  ]))
}

const addContractDefs: Array<FieldDef | GridFieldDef> = [
  { def: { type: 'upload', model: 'upload', label: '合同文本', options: { labelWidth: '90px', ..._uploadOptions }, rules: [{ required: true, message: '请上传合同文本', type: 'array' }] }, span: 12 },
  addRow({ type: 'select', model: 'signMethod', label: '签署方式', rules: [{ required: true, message: '请选择签署方式' }], options: { options: d('sign_method'), labelWidth: '90px' } }),
  ...copySignerId,
  addRow({ type: 'textarea', model: 'email', label: '邮箱', rules: [{ required: true, message: '邮箱不能为空' }, { validator: emailValidator, trigger: 'blur', sep: ',' }], options: { labelWidth: '90px', placeholder: '输入邮箱，多个邮箱时用逗号隔开' }, dependOn: dependOn('3', true) })
]
export const todoBaseFormDefs = [
  { span: 8, def: { type: 'select', model: 'contractTypeId', label: '合同类型', rules: [{ required: true, message: '合同类型不能为空' }], options: { options: oD, placeholder: '请选择合同类型', labelWidth: '90px' } } },
  { span: 8, def: { type: 'text', model: 'contractName', label: '合同名称', rules: [{ required: true, message: '合同名称不能为空' }], options: { labelWidth: '90px', placeholder: '请输入合同名称' } } },
  { span: 8, def: { type: 'select', model: 'coreContractId', label: '关联主合同', rules: [{ required: true, message: '关联主合同', type: 'number' }], options: { labelWidth: '100px', options: a('getPass-contractList'), placeholder: '请选择关联主合同' }, dependOn: relativeContract } },
  ...addContractDefs
]
export const ledgerBaseFormDefs = [
  { span: 8, def: { type: 'select', model: 'contractTypeId', label: '合同类型', rules: [{ required: true, message: '合同类型不能为空' }], options: { options: oD2, placeholder: '请选择合同类型', labelWidth: '90px' } } },
  { span: 8, def: { type: 'text', model: 'contractName', label: '合同名称', rules: [{ required: true, message: '合同名称不能为空' }], options: { labelWidth: '90px', placeholder: '请输入合同名称' } } },
  { span: 8, def: { type: 'select', model: 'coreContractId', label: '关联主合同', rules: [{ required: true, message: '关联主合同', type: 'number' }], options: { labelWidth: '100px', options: a('getPass-contractList'), placeholder: '请选择关联主合同' } } },
  ...addContractDefs
]

export const baseFormDefs: Array<FieldDef | GridFieldDef> = [ // 详情编辑
  { def: { type: 'plain', model: 'projectName', label: '项目名称', options: { labelWidth: '90px' } }, span: 24 },
  { def: { type: 'plain', model: 'contractTypeId', label: '合同类型', options: { formatter: f('transcode', 'contract_type'), labelWidth: '90px' } }, span: 12 },
  { def: { type: 'plain', model: 'contractName', label: '合同名称', options: { labelWidth: '90px', disabled: true } }, span: 12 },
  { def: { type: 'upload', model: 'upload', label: '合同文本', rules: [{ required: true, message: '请上传合同文本', type: 'array' }], options: { ..._uploadOptions, labelWidth: '90px' } }, span: 12 },
  { def: { type: 'plain', model: 'versionNumber', label: '版本号', options: { labelWidth: '90px', formatter: (x: any) => `v${x}.0` } }, span: 12 },
  addRow({ type: 'textarea', model: 'updateContent', label: '本次调整点', options: { labelWidth: '90px', placeholder: '若调整了合同内容，请输入调整点' } }),
  addRow({ type: 'select', model: 'signMethod', label: '签署方式', options: { options: d('signMethod'), labelWidth: '90px', onValueChange: getInitData, disabled: modifyAble } })
]

export function createBaseFormDefsFn(arr: [], emailNotifyAddress: any, signMethod: any) {
  const signerListConfig: any = []
  const signerListDetail: any = {}
  arr.forEach((item: any, index) => {
    const i = index + 1
    const tempaddRow = addRow([
      { type: 'select', model: `signerId${i}`, label: '签署方', options: { ...remote(`signer-details${i}`), labelWidth: '90px', disabled: true } },
      { type: 'select', model: `autoSign${i}`, label: '签署类型', rules: [{ required: true, message: '签署类型不能为空' }], options: { options: { 0: '手动签', 1: '自动签' }, labelWidth: '90px', disabled: autoSignDisabled(`signerName${i}`, `autoSign${i}`, true) }, dependOn: dependOn('1', true) }
    ])
    signerListConfig.push(tempaddRow)
    signerListDetail[`autoSign${i}`] = item.autoSign ? '1' : '0'
    signerListDetail[`signerId${i}`] = item.signerId
    signerListDetail[`signerName${i}`] = item.signerName
  })
  initData = { ...signerListDetail, emailNotifyAddress }
  return { signerListConfig, signerListDetail }
}
