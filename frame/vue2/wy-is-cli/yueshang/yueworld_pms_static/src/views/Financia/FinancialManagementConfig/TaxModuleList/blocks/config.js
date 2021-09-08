/*
 * @Author: xza
 * @Date: 2021-08-06 15:31:57
 * @LastEditTime: 2021-08-24 09:58:32
 * @LastEditors: xza
 * @Description: 税率弹窗配置
 * @FilePath: /baolong/src/views/Financia/FinancialManagementConfig/TaxModuleList/blocks/config.js
 */

// 表单配置
export const configData = function() {
  return [
    {
      itemType: 'input',
      prop: 'taxId',
      label: '税率编码',
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
      prop: 'taxName',
      label: '税率名称',
      placeholder: '请输入',
      width: '206px'
    },
    {
      itemType: 'input',
      type: 'number',
      inputType: 'Number',
      prop: 'tax',
      label: '税值',
      placeholder: '请输入',
      width: '206px',
      numberConfig: { decimal: 0 }
    },
    {
      itemType: 'select',
      prop: 'taxType',
      label: '税率类别',
      placeholder: '请选择',
      width: '206px',
      list: this.$PUBFN.getOptionsList('taxTypeID')
    },
    {
      itemType: 'select',
      prop: 'taxCollectType',
      label: '征收类型',
      placeholder: '请选择',
      width: '206px',
      list: this.$PUBFN.getOptionsList('taxCollectType')
    },
    {
      itemType: 'select',
      prop: 'status',
      label: '状态',
      placeholder: '请选择',
      width: '206px',
      list: this.$PUBFN.getOptionsList('auditStatussec')
    }
  ]
}

// 表单数据
export const formData = function() {
  return {
    taxId: '', // 税率编码
    thirdPartyId: '', // 三方编码
    taxName: '', // 税率名称
    tax: '', // 税值
    taxType: '', // 税率类别
    taxCollectType: '', // 征收类型
    status: '' // 状态
  }
}

// 表单验证
export const rulesForm = function() {
  return {
    // 表单验证
    thirdPartyId: [
      { required: false, message: '请选择必填项', trigger: 'change' }
    ],
    taxName: [
      { required: true, message: '请选择必填项', trigger: 'change' }
    ],
    tax: [
      { required: true, message: '请选择必填项', trigger: 'change' }
    ],
    taxType: [
      { required: true, message: '请选择必填项', trigger: 'change' }
    ],
    taxCollectType: [
      { required: true, message: '请选择必填项', trigger: 'change' }
    ],
    status: [
      { required: true, message: '请选择必填项', trigger: 'change' }
    ]
  }
}
