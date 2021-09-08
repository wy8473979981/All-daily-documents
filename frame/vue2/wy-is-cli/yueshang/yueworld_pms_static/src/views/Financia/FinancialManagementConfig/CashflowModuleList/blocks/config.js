/*
 * @Author: xza
 * @Date: 2021-08-03 14:27:01
 * @LastEditTime: 2021-08-17 09:44:16
 * @LastEditors: xza
 * @Description: 弹窗配置
 * @FilePath: /baolong/src/views/Financia/FinancialManagementConfig/CashflowModuleList/blocks/config.js
 */
// 表单数据
export const formData = function() {
  return {
    cashflowId: '', // 现金流编码
    thirdPartyId: '', // 三方编码
    cashflowType: '现金流', // 类别
    cashflowName: '', // 现金流名称
    status: '', // 状态
    creatDate: '' // 创建时间
  }
}
// 表格配置
export const configData = function() {
  return [
    {
      itemType: 'input',
      prop: 'cashflowId',
      label: '现金流编码',
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
      prop: 'cashflowType',
      label: '分类',
      placeholder: '请输入',
      width: '206px',
      disabled: true,
      inputType: 'autoValue'
    },
    {
      itemType: 'input',
      prop: 'cashflowName',
      label: '现金流名称',
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
    cashflowName: [
      { required: true, message: '请选择必填项', trigger: 'change' }
    ],
    status: [
      { required: true, message: '请选择必填项', trigger: 'change' }
    ]
  }
}
