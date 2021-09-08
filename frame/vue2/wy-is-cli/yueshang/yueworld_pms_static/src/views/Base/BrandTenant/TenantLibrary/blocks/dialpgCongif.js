/*
 * @Author: shuyuan
 * @LastEditors: fhj
 * @Description:商家库
*/
import PUBFN from '@/utils/pubFn'

// 品牌授权可编辑
export const tenantBrandColumnEdit = () => {
  return [
    { brandName: '授权品牌', itemType: 'select', inputType: 'text', required: true, list: PUBFN.getOptionsList('bandName') },
    { tenantBrandAuthorizationStartDate: '授权开始时间', itemType: 'datePicker', inputType: 'text' },
    { tenantBrandAuthorizationEndDate: '授权结束时间', itemType: 'datePicker', inputType: 'text' },
    { attachment: '授权书', itemType: 'fileUpload', canOperate: true }
  ]
}

// 品牌授权不可编辑
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
    { tenantContactsPerson: '姓名', itemType: 'input', inputType: 'text', required: true },
    { tenantContactsTitle: '职位', itemType: 'input', inputType: 'text' },
    { tenantContactsTel: '固定电话', itemType: 'input', inputType: 'text' },
    { tenantContactsMobile: '手机', itemType: 'input', inputType: 'Number', numberConfig: { min: 0, max: 9999999999999, decimal: 0 }, required: true },
    { tenantContactsEmail: '邮箱', itemType: 'input', inputType: 'text' },
    { tenantContactsFax: '传真', itemType: 'input', inputType: 'text' },
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
    { tenantLicenseEffectiveStartDate: '有效期开始时间', itemType: 'datePicker', inputType: 'text', width: '120px' },
    { tenantLicenseEffectiveEndDate: '有效期结束时间', itemType: 'datePicker', inputType: 'text', width: '120px' },
    { tenantLicenseStatus: '证照状态', itemType: 'select', inputType: 'text', list: PUBFN.getOptionsList('tenantLicenseStatus') },
    { tenantLicenseAttachment: '证照图片', itemType: 'fileUpload', canOperate: true, width: '120px' }
  ]
}

// 证照项目
export const tenantLicenseColumnDetails = () => {
  return [
    { tenantLicenseType: '证照类型', itemType: 'text', inputType: 'text', list: PUBFN.getOptionsList('tenantLicenseType') },
    { tenantLicenseCode: '证照编号', itemType: 'text', inputType: 'text' },
    { tenantLicenseEffectiveStartDate: '有效期开始时间', itemType: 'text', inputType: 'text' },
    { tenantLicenseEffectiveEndDate: '有效期结束时间', itemType: 'text', inputType: 'text' },
    { tenantLicenseStatus: '证照状态', itemType: 'text', inputType: 'text', list: PUBFN.getOptionsList('tenantLicenseStatus') },
    { tenantLicenseAttachment: '证照图片', itemType: 'text', type: 'text', width: '120px', hasSlot: true }
  ]
}

// 合同信息
export const contractColumnEdit = () => {
  return [
    { itemType: 'input', placeholder: '请输入', prop: 'tenantContractName', label: '合同抬头', inputType: 'text' },
    { itemType: 'input', placeholder: '请输入', prop: 'tenantContractAddress', label: '合同地址', inputType: 'text' },
    { itemType: 'input', placeholder: '请输入', prop: 'tenantContractTel', label: '合同电话', inputType: 'Number', numberConfig: { min: 0, max: 9999999999999999, decimal: 0 }},
    { itemType: 'input', placeholder: '请输入', prop: 'tenantContractPerson', label: '合同联系人', inputType: 'text' },
    { itemType: 'input', placeholder: '请输入', prop: 'tenantContractFax', label: '合同传真', inputType: 'text' },
    { itemType: 'input', placeholder: '请输入', prop: 'tenantContractEmail', label: '合同邮箱', inputType: 'text' },
    { itemType: 'input', placeholder: '请输入', prop: 'tenantContractPostcode', label: '合同邮编', inputType: 'Number', numberConfig: { min: 0, max: 999999999999999, decimal: 0 }}
  ]
}

// 合同信息
export const contractColumnDetails = () => {
  return [
    { itemType: 'text', placeholder: '请输入', prop: 'tenantContractName', label: '合同抬头', inputType: 'text' },
    { itemType: 'text', placeholder: '请输入', prop: 'tenantContractAddress', label: '合同地址', inputType: 'text' },
    { itemType: 'text', placeholder: '请输入', prop: 'tenantContractTel', label: '合同电话', inputType: 'text' },
    { itemType: 'text', placeholder: '请输入', prop: 'tenantContractPerson', label: '合同联系人', inputType: 'text' },
    { itemType: 'text', placeholder: '请输入', prop: 'tenantContractFax', label: '合同传真', inputType: 'text' },
    { itemType: 'text', placeholder: '请输入', prop: 'tenantContractEmail', label: '合同邮箱', inputType: 'text' },
    { itemType: 'text', placeholder: '请输入', prop: 'tenantContractPostcode', label: '合同邮编', inputType: 'text' }
  ]
}

// 开票信息
export const tenantLetterColumn = () => {
  return [
    { tenantLetterhead: '开票名称', itemType: 'input', inputType: 'text' },
    { tenantLetterheadUnifiedSocialCreditCode: '统一社会信用代码', itemType: 'input', inputType: 'text', width: '200px' },
    { tenantLetterheadAddress: '地址', itemType: 'input', inputType: 'text' },
    { tenantLetterheadTel: '电话', itemType: 'input', inputType: 'Number', numberConfig: { min: 0, max: 9999999999999, decimal: 0 }},
    { tenantLetterheadBankname: '开户行', itemType: 'input', inputType: 'text' },
    { tenantLetterheadBankaccount: '开户账号', itemType: 'input', inputType: 'Number', numberConfig: { min: 0, max: 999999999999999999999999, decimal: 0 }}
  ]
}

// 诚信记录
export const tenantCreditColumn = () => {
  return [
    { tenantCreditRecord: '诚信记录类别', itemType: 'select', inputType: 'text', width: '156px', list: PUBFN.getOptionsList('tenantCreditRecord') },
    { tenantCreditRecordDetail: '内容描述', itemType: 'input', inputType: 'text' }
  ]
}
