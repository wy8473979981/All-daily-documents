/*
 * @Author: jllk
 * @Date: 2021-08-05 14:33:58
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-08-16 17:12:40
 */
// 字典
import PUBFN from '@/utils/pubFn'

// 详情表单配置
export const configData = function() {
  return [
    {
      itemType: 'input',
      prop: 'bankAccountId',
      label: '银行编码',
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
      itemType: 'select',
      prop: 'accountName',
      label: '账套',
      placeholder: '请选择',
      list: PUBFN.getOptionsList('accountfeeName'),
      width: '206px'
    },
    {
      itemType: 'select',
      prop: 'area',
      label: '区域',
      placeholder: '请选择',
      list: PUBFN.getOptionsList('area'),
      width: '206px'
    },
    {
      itemType: 'input',
      prop: 'bankName',
      label: '银行名称',
      placeholder: '请输入',
      width: '206px'
    },
    {
      itemType: 'input',
      prop: 'bankAccount',
      label: '账户',
      placeholder: '请输入',
      width: '206px'
    },
    {
      itemType: 'select',
      prop: 'currency',
      label: '币种',
      placeholder: '请选择',
      list: PUBFN.getOptionsList('currency'),
      width: '206px'
    },
    {
      itemType: 'select',
      prop: 'status',
      label: '状态',
      placeholder: '请选择',
      list: PUBFN.getOptionsList('selectstatus'),
      width: '206px'
    },
    {
      itemType: 'datePicker',
      type: 'datetime',
      valueFormat: 'yyyy-MM-dd HH:mm',
      prop: 'creatDate',
      label: '创建时间',
      placeholder: '请选择',
      width: '206px',
      disabled: true
    }
  ]
}

// 编辑表单配置
export const configDataEdit = function() {
  return [
    {
      itemType: 'input',
      prop: 'bankAccountId',
      label: '银行编码',
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
      itemType: 'select',
      prop: 'accountName',
      label: '账套',
      placeholder: '请选择',
      list: PUBFN.getOptionsList('allPros'),
      width: '206px'
    },
    {
      itemType: 'select',
      prop: 'area',
      label: '区域',
      placeholder: '请选择',
      list: PUBFN.getOptionsList('area'),
      width: '206px'
    },
    {
      itemType: 'input',
      prop: 'bankName',
      label: '银行名称',
      placeholder: '请输入',
      width: '206px'
    },
    {
      itemType: 'input',
      prop: 'bankAccount',
      label: '账户',
      placeholder: '请输入',
      width: '206px'
    },
    {
      itemType: 'select',
      prop: 'currency',
      label: '币种',
      placeholder: '请选择',
      list: PUBFN.getOptionsList('currency'),
      width: '206px'
    },
    {
      itemType: 'select',
      prop: 'status',
      label: '状态',
      placeholder: '请选择',
      list: PUBFN.getOptionsList('selectstatus'),
      width: '206px'
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
//  表单验证
export const rulesForm = function() {
  return {
    accountName: [
      { required: true, message: '请选择必填项', trigger: 'change' }
    ],
    area: [
      { required: true, message: '请选择必填项', trigger: 'change' }
    ],
    bankName: [
      { required: true, message: '请选择必填项', trigger: 'change' }
    ],
    bankAccount: [
      { required: true, message: '请选择必填项', trigger: 'change' }
    ],
    currency: [
      { required: true, message: '请选择必填项', trigger: 'change' }
    ],
    status: [
      { required: true, message: '请选择必填项', trigger: 'change' }
    ]
  }
}
