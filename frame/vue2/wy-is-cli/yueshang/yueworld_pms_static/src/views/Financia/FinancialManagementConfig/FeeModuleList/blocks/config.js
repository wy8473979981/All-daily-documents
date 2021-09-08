/*
 * @Author: xza
 * @Date: 2021-08-03 14:58:37
 * @LastEditTime: 2021-08-09 10:31:14
 * @LastEditors: Please set LastEditors
 * @Description: 弹窗配置
 * @FilePath: /baolong/src/views/Financia/FinancialManagementConfig/FeeModuleList/blocks/config.js
 */
// 表格配置
export const configData = function() {
  return [
    {
      itemType: 'input',
      prop: 'feeId',
      label: '费项编码',
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
      prop: 'feeName',
      label: '费项名称',
      placeholder: '请输入',
      width: '206px'
    },
    {
      itemType: 'select',
      prop: 'feeType',
      label: '类别',
      placeholder: '请选择',
      width: '206px',
      list: this.$PUBFN.getOptionsList('feeType1')
    },
    {
      itemType: 'select',
      prop: 'feeNature',
      label: '性质',
      placeholder: '请选择',
      width: '206px',
      list: this.$PUBFN.getOptionsList('discriminator')
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
// 表格数据
export const formData = function() {
  return {
    feeId: '', //
    thirdPartyId: '', // 三方编码
    feeName: '', // 费项名称
    creatDate: '', // 创建时间
    status: '', // 状态
    feeNature: '', // 性质
    feeType: '' // 类别
  }
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
    feeName: [
      { required: true, message: '请选择必填项', trigger: 'change' }
    ],
    feeType: [
      { required: true, message: '请选择必填项', trigger: 'change' }
    ],
    feeNature: [
      { required: true, message: '请选择必填项', trigger: 'change' }
    ],
    status: [
      { required: true, message: '请选择必填项', trigger: 'change' }
    ]
  }
}
