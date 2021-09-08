/*
 * @Author: xza
 * @Date: 2021-08-03 11:24:30
 * @LastEditTime: 2021-08-09 10:51:22
 * @LastEditors: xza
 * @Description: 辅助核算弹窗配置
 * @FilePath: /baolong/src/views/Financia/FinancialManagementConfig/AccountingSubject/blocks/config.js
 */

// 表单数据
export const formData = function() {
  return {
    assistingId: '', // 辅助核算编码
    thirdPartyId: '', // 三方编码
    assistingType: '辅助核算', // 分类
    assistingName: '', // 辅助核算名称
    status: '', // 状态
    assistingMold: '', // 核算类型
    creatDate: '' // 创建时间
  }
}
// 表格配置
export const configData = function() {
  return [
    {
      itemType: 'input',
      prop: 'assistingId',
      label: '辅助核算编码',
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
      prop: 'assistingType',
      label: '分类',
      placeholder: '辅助核算',
      width: '206px',
      disabled: true
    },
    {
      itemType: 'input',
      prop: 'assistingName',
      label: '辅助核算名称',
      placeholder: '请输入',
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
      itemType: 'select',
      prop: 'assistingMold',
      label: '核算类型',
      placeholder: '请选择',
      width: '206px',
      list: this.$PUBFN.getOptionsList('assistingMoldAdd')
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
    assistingName: [
      { required: true, message: '请选择必填项', trigger: 'change' }
    ],
    status: [
      { required: true, message: '请选择必填项', trigger: 'change' }
    ],
    assistingMold: [
      { required: true, message: '请选择必填项', trigger: 'change' }
    ]
  }
}
