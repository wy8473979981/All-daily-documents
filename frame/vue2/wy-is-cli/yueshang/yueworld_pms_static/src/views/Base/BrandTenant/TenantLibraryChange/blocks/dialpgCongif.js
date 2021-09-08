/*
 * @Author: shuyuan
 * @LastEditors: shuyuan
 * @Description:商家变更列表
*/
import PUBFN from '@/utils/pubFn'

// 基本信息
export const configData = () => {
  return [
    { itemType: 'select', placeholder: '请选择', prop: 'programName', label: '所属项目', list: PUBFN.getOptionsList('enterpriseType') },
    { itemType: 'input', placeholder: '--自动带入--', prop: 'tenantId', label: '商家编码', disabled: true },
    { itemType: 'input', placeholder: '请输入', prop: 'tenantName', label: '商家名称' },
    { itemType: 'select', placeholder: '请选择', prop: 'tenantType', label: '商家性质', list: PUBFN.getOptionsList('enterpriseType') },
    { itemType: 'select', placeholder: '请选择', prop: 'tenantCompanyQuailty', label: '商家属性', list: PUBFN.getOptionsList('tenantCompanyQuailty') },
    { itemType: 'select', placeholder: '请选择', prop: 'tenantTaxpayerType', label: '纳税人类型', list: PUBFN.getOptionsList('tenantTaxpayerType') },
    { itemType: 'input', placeholder: '请输入', prop: 'tenantCompanyName', label: '公司名称' },
    { itemType: 'input', placeholder: '请输入', prop: 'tenantNaturalPerson', label: '法定代表人', list: PUBFN.getOptionsList('enterpriseType') },
    { itemType: 'input', placeholder: '请输入', prop: 'tenantUnifiedSocialCreditCode', label: '统一社会信用代码' }
  ]
}

// 品牌授权
export const tenantBrandColumnEdit = () => {
  return [
    { brandName: '授权品牌', itemType: 'input', inputType: 'text', required: true },
    { tenantBrandAuthorizationStartDate: '授权开始时间', itemType: 'input', inputType: 'text' },
    { tenantBrandAuthorizationEndDate: '授权结束时间', itemType: 'input', inputType: 'text' },
    { attachment: '授权书', itemType: 'fileUpload', type: 'file' }
  ]
}

// 品牌授权
export const tenantBrandColumnDetails = () => {
  return [
    { brandName: '授权品牌', itemType: 'text', inputType: 'text' },
    { tenantBrandAuthorizationStartDate: '授权开始时间', itemType: 'text', inputType: 'text' },
    { tenantBrandAuthorizationEndDate: '授权结束时间', itemType: 'text', inputType: 'text' },
    { attachment: '授权书', itemType: 'text', type: 'text', hasSlot: true }
  ]
}

// 业务联系人信息
export const tenantContactsColumnEdit = () => {
  return [
    { tenantContactsPerson: '姓名', itemType: 'input', inputType: 'text' },
    { tenantContactsTitle: '职位', itemType: 'input', inputType: 'text' },
    { tenantContactsTel: '固定电话', itemType: 'input', inputType: 'text' },
    { tenantContactsMobile: '手机', itemType: 'input', inputType: 'Number', numberConfig: { min: 0, max: 999999999999999, decimal: 0 } },
    { tenantContactsEmail: '邮箱', itemType: 'input', inputType: 'text' },
    { tenantContactsFax: '传真', itemType: 'input', inputType: 'Number', numberConfig: { min: 0, max: 999999999999999, decimal: 0 } },
    { tenantContactsAddress: '地址', itemType: 'input', inputType: 'text' }
  ]
}

// 业务联系人信息
export const tenantContactsColumnDetails = () => {
  return [
    { tenantContactsPerson: '姓名', itemType: 'text', inputType: 'text' },
    { tenantContactsTitle: '职位', itemType: 'text', inputType: 'text' },
    { tenantContactsTel: '固定电话', itemType: 'text', inputType: 'text' },
    { tenantContactsMobile: '手机', itemType: 'text', inputType: 'text' },
    { tenantContactsEmail: '邮箱', itemType: 'text', inputType: 'text' },
    { tenantContactsFax: '传真', itemType: 'text', inputType: 'text' },
    { tenantContactsAddress: '地址', itemType: 'text', inputType: 'text' }
  ]
}

// 证照项目
export const tenantLicenseColumnEdit = () => {
  return [
    { tenantLicenseType: '证照类型', itemType: 'select', inputType: 'text', list: PUBFN.getOptionsList('tenantLicenseType') },
    { tenantLicenseCode: '证照编号', itemType: 'input', inputType: 'text' },
    { tenantLicenseEffectiveStartDate: '有效期开始时间', itemType: 'datePicker', inputType: 'text' },
    { tenantLicenseEffectiveEndDate: '有效期结束时间', itemType: 'datePicker', inputType: 'text' },
    { tenantLicenseStatus: '证照状态', itemType: 'select', inputType: 'text', list: PUBFN.getOptionsList('tenantLicenseStatus') },
    { tenantLicenseAttachment: '证照图片', itemType: 'fileUpload', type: 'file' }
  ]
}

// 证照项目
export const tenantLicenseColumnDetails = () => {
  return [
    { tenantLicenseType: '证照类型', itemType: 'text', inputType: 'text' },
    { tenantLicenseCode: '证照编号', itemType: 'text', inputType: 'text' },
    { tenantLicenseEffectiveStartDate: '有效期开始时间', itemType: 'text', inputType: 'text' },
    { tenantLicenseEffectiveEndDate: '有效期结束时间', itemType: 'text', inputType: 'text' },
    { tenantLicenseStatus: '证照状态', itemType: 'text', inputType: 'text' },
    { tenantLicenseAttachment: '证照图片', itemType: 'text', type: 'text', width: '120px', hasSlot: true }
  ]
}

// 合同信息
export const contractColumnEdit = () => {
  return [
    { itemType: 'input', placeholder: '请输入', prop: 'tenantContractName', label: '合同抬头' },
    { itemType: 'input', placeholder: '请输入', prop: 'tenantContractAddress', label: '合同地址' },
    { itemType: 'input', placeholder: '请输入', prop: 'tenantContractTel', label: '合同电话', inputType: 'Number', numberConfig: { min: 0, max: 999999999999999, decimal: 0 } },
    { itemType: 'input', placeholder: '请输入', prop: 'tenantContractPerson', label: '合同联系人' },
    { itemType: 'input', placeholder: '请输入', prop: 'tenantContractFax', label: '合同传真' },
    { itemType: 'input', placeholder: '请输入', prop: 'tenantContractEmail', label: '合同邮箱' },
    { itemType: 'input', placeholder: '请输入', prop: 'tenantContractPostcode', label: '合同邮编', inputType: 'Number', numberConfig: { min: 0, max: 999999999999999, decimal: 0 } }
  ]
}

// 合同信息
export const contractColumnDetails = () => {
  return [
    { itemType: 'text', placeholder: '请输入', prop: 'tenantContractName', label: '合同抬头' },
    { itemType: 'text', placeholder: '请输入', prop: 'tenantContractAddress', label: '合同地址' },
    { itemType: 'text', placeholder: '请输入', prop: 'tenantContractTel', label: '合同电话' },
    { itemType: 'text', placeholder: '请输入', prop: 'tenantContractPerson', label: '合同联系人' },
    { itemType: 'text', placeholder: '请输入', prop: 'tenantContractFax', label: '合同传真' },
    { itemType: 'text', placeholder: '请输入', prop: 'tenantContractEmail', label: '合同邮箱' },
    { itemType: 'text', placeholder: '请输入', prop: 'tenantContractPostcode', label: '合同邮编' }
  ]
}

// 开票信息
export const tenantLetterColumn = () => {
  return [
    { tenantLetterhead: '开票名称', itemType: 'input', inputType: 'text' },
    { tenantLetterheadUnifiedSocialCreditCode: '统一社会信用代码', itemType: 'input', inputType: 'text' },
    { tenantLetterheadAddress: '地址', itemType: 'input', inputType: 'Number', numberConfig: { min: 0, max: 999999999999999, decimal: 0 } },
    { tenantLetterheadTel: '电话', itemType: 'input', inputType: 'text' },
    { tenantLetterheadBankname: '开户行', itemType: 'input', inputType: 'text' },
    { tenantLetterheadBankaccount: '开户账号', itemType: 'input', inputType: 'Number', numberConfig: { min: 0, max: 999999999999999, decimal: 0 } }
  ]
}

// 诚信记录
export const tenantCreditColumn = () => {
  return [
    { tenantCreditRecord: '诚信记录类别', itemType: 'select', inputType: 'text', width: '156px', list: PUBFN.getOptionsList('tenantCreditRecord') },
    { tenantCreditRecordDetail: '内容描述', itemType: 'input', inputType: 'text', minwidth: '700px' }
  ]
}

// 审核记录
export const examineColumn = () => {
  return [
    { examine1: 'xxxx', itemType: 'text', inputType: 'text' },
    { examine2: 'xxx', itemType: 'text', inputType: 'text' },
    { examine3: 'xxx', itemType: 'text', inputType: 'text' }
  ]
}
