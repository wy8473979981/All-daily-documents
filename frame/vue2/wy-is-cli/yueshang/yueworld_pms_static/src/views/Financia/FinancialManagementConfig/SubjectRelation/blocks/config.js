/*
 * @Author: xza
 * @Date: 2021-08-06 12:43:32
 * @LastEditTime: 2021-08-10 08:59:32
 * @LastEditors: xza
 * @Description: 费用项科目关系弹窗配置
 * @FilePath: /baolong/src/views/Financia/FinancialManagementConfig/SubjectRelation/blocks/config.js
 */
// 表格配置
export const configData = function() {
  return [
    {
      itemType: 'select',
      prop: 'accountName',
      label: '账套',
      width: '206px',
      list: this.$PUBFN.getOptionsList('subjectRelationFee')
    },
    {
      itemType: 'select',
      prop: 'feeName',
      label: '费项',
      placeholder: '请选择',
      width: '206px',
      list: this.$PUBFN.getOptionsList('allProjectFeesNo')
    },
    {
      itemType: 'select',
      prop: 'subjectInfo',
      label: '科目',
      placeholder: '请选择',
      list: this.$PUBFN.getOptionsList('allProjectFeeNo'),
      width: '206px'
    },
    {
      itemType: 'input',
      prop: 'remark',
      label: '备注',
      placeholder: '请输入',
      width: '428px',
      span: 2,
      type: 'textarea'
    }
  ]
}

// 表单验证
export const rulesForm = function() {
  return {
    accountName: [
      { required: true, message: '请选择必填项', trigger: 'change' }
    ],
    feeName: [
      { required: true, message: '请选择必填项', trigger: 'change' }
    ],
    subjectInfo: [
      { required: true, message: '请选择必填项', trigger: 'change' }
    ]
  }
}

// 表格数据
export const formData = function() {
  return {
    accountName: '', // 账套
    feeName: '', // 费项
    subjectInfo: '', // 科目
    remark: '' // 备注
  }
}
