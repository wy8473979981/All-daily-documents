/*
 * @Author: xza
 * @Date: 2021-08-03 11:24:30
 * @LastEditTime: 2021-08-09 11:19:08
 * @LastEditors: xza
 * @Description: 弹窗配置
 * @FilePath: /baolong/src/views/Financia/FinancialManagementConfig/AccountingSubject/blocks/config.js
 */

// 表格配置
export const configData = function() {
  return [
    {
      itemType: 'input',
      prop: 'subjectId',
      label: '科目编码',
      placeholder: '请输入',
      width: '206px'
    },
    {
      itemType: 'input',
      prop: 'thirdPartyId',
      label: '三方编码',
      placeholder: '请输入',
      width: '206px'
    },
    {
      itemType: 'select',
      prop: 'accountName',
      label: '账套',
      placeholder: '请选择',
      width: '206px',
      list: this.$PUBFN.getOptionsList('subjectRelationFeeAlls')
    },
    {
      itemType: 'select',
      prop: 'upperSubjectName',
      label: '上层科目',
      placeholder: '请选择',
      width: '206px',
      list: this.$PUBFN.getOptionsList('upperSubjectName')
    },
    {
      itemType: 'input',
      prop: 'subjectName',
      label: '科目名称',
      placeholder: '请输入',
      width: '206px'
    },
    {
      itemType: 'select',
      prop: 'subjectType',
      label: '类别',
      placeholder: '请选择',
      width: '206px',
      list: this.$PUBFN.getOptionsList('subjectType')
    },
    {
      itemType: 'select',
      prop: 'direction',
      label: '余额方向',
      placeholder: '请选择',
      width: '206px',
      list: this.$PUBFN.getOptionsList('direction')
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
    subjectId: [
      { required: true, message: '请选择必填项', trigger: 'change' }
    ],
    thirdPartyId: [
      { required: false, message: '请选择必填项', trigger: 'change' }
    ],
    accountName: [
      { required: true, message: '请选择必填项', trigger: 'change' }
    ],
    subjectName: [
      { required: true, message: '请选择必填项', trigger: 'change' }
    ],
    subjectType: [
      { required: true, message: '请选择必填项', trigger: 'change' }
    ],
    direction: [
      { required: true, message: '请选择必填项', trigger: 'change' }
    ],
    status: [
      { required: true, message: '请选择必填项', trigger: 'change' }
    ]
  }
}

// 表单数据
export const formData = function() {
  return {
    accountName: '', // 账套
    subjectId: '', // 科目编码
    thirdPartyId: '', // 三方编码
    upperSubjectName: '', // 上层科目
    subjectName: '', // 科目名称
    subjectType: '', // 类别
    direction: '', // 余额方向
    status: '', // 状态
    creatDate: '' // 创建时间
  } // 表格数据
}
