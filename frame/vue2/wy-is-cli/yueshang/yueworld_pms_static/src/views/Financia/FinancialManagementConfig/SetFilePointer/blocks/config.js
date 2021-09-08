/*
 * @Author: xza
 * @Date: 2021-08-03 15:06:48
 * @LastEditTime: 2021-08-06 17:00:25
 * @LastEditors: xza
 * @Description: 账套弹窗配置
 * @FilePath: /baolong/src/views/Financia/FinancialManagementConfig/SetFilePointer/blocks/config.js
 */

// 表单数据
export const formData = function() {
  return {
    accountId: '', // 账套编码
    thirdPartyId: '', // 三方编码
    accountName: '', // 账套名称
    accountNameShort: '', // 简称
    address: '', // 地址
    taxpayerName: '', // 纳税人名称
    UnifiedSocialCreditCode: '', // 统一社会信用代码
    effectiveDate: '', // 启用年月
    status: '', // 状态
    creatDate: '' // 创建时间
  }
}
// 表格配置
export const configData = function() {
  return [
    {
      itemType: 'input',
      prop: 'accountId',
      label: '账套编码',
      inputType: 'autoValue',
      width: '206px',
      disabled: true
    },
    {
      itemType: 'input',
      prop: 'thirdPartyId',
      label: '三方编码',
      placeholder: '请输入',
      width: '206px'
    },
    {
      itemType: 'input',
      prop: 'accountName',
      label: '账套名称',
      placeholder: '请输入',
      width: '206px'
    },
    {
      itemType: 'input',
      prop: 'accountNameShort',
      label: '简称',
      placeholder: '请输入',
      width: '206px'
    },
    {
      itemType: 'input',
      type: 'textarea',
      prop: 'address',
      label: '地址',
      placeholder: '请输入',
      width: '428px',
      span: 2
    },
    {
      itemType: 'input',
      prop: 'taxpayerName',
      label: '纳税人名称',
      placeholder: '请输入',
      width: '206px'
    },
    {
      itemType: 'input',
      prop: 'UnifiedSocialCreditCode',
      label: '统一社会信用代码',
      placeholder: '请输入',
      width: '206px'
    },
    {
      itemType: 'datePicker',
      tyoe: 'date',
      prop: 'effectiveDate',
      label: '启用年月',
      placeholder: '请输入日期',
      width: '206px'
    },
    {
      itemType: 'select',
      prop: 'status',
      label: '状态',
      placeholder: '请选择',
      width: '206px',
      list: this.$PUBFN.getOptionsList('auditStatussec')
    },
    {
      itemType: 'datePicker',
      type: 'datetime',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      prop: 'creatDate',
      label: '创建时间',
      placeholder: '请选择',
      width: '206px',
      disabled: true
    }
  ]
}

// 表格验证
export const rulesForm = function() {
  return {
    // 表单验证
    thirdPartyId: [
      { required: false, message: '请选择必填项', trigger: 'change' }
    ],
    accountName: [
      { required: true, message: '请选择必填项', trigger: 'change' }
    ],
    accountNameShort: [
      { required: true, message: '请选择必填项', trigger: 'change' }
    ],
    address: [
      { required: false, message: '请选择必填项', trigger: 'change' }
    ],
    taxpayerName: [
      { required: true, message: '请选择必填项', trigger: 'change' }
    ],
    UnifiedSocialCreditCode: [
      { required: true, message: '请选择必填项', trigger: 'change' }
    ],
    effectiveDate: [
      { required: true, message: '请选择必填项', trigger: 'change' }
    ],
    status: [
      { required: true, message: '请选择必填项', trigger: 'change' }
    ]
  }
}
