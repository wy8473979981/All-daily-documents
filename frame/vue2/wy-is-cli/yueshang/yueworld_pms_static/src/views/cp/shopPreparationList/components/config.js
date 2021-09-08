import { selectList, selectList1, selectList2, selectList3, selectList4, selectList5, selectList6 } from './data'
export const formData = {
  t1: '',
  t2: '',
  t3: '',
  t4: ''

}

export const configData = [ // 表单配置
  {
    itemType: 'input',
    label: '铺号',
    placeholder: '请输入',
    width: '246px',
    required: true
  },
  {
    itemType: 'select',
    prop: 't2',
    label: '楼层',
    placeholder: '请选择',
    width: '246px',
    list: selectList,
    required: true
  },
  {
    itemType: 'input',
    prop: 't3',
    label: '计租面积（㎡）',
    placeholder: '请输入',
    width: '246px',
    required: true
  },
  {
    itemType: 'select',
    prop: 't4',
    label: '签批业态',
    placeholder: '请选择',
    width: '246px',
    required: true
  },
  {
    itemType: 'input',
    prop: 't5',
    label: '标准租金(元)',
    placeholder: '请输入',
    width: '246px',
    required: true
  },
  {
    itemType: 'input',
    prop: 't6',
    label: '标准管理费(元)',
    placeholder: '请输入',
    width: '246px',
    required: true
  }

]
export const configData1 = [ // 表单配置
  {
    itemType: 'select',
    prop: 't1',
    label: '合同类型',
    list: selectList2,
    placeholder: '请输入',
    width: '246px',
    required: true
  },
  {
    itemType: 'datePicker',
    prop: 't2',
    label: '合同起止日期',
    type: 'daterange',
    width: '246px',
    required: true,
    span: 1 },
  {
    itemType: 'select',
    prop: 't3',
    label: '品牌',
    list: selectList4,
    placeholder: '请输入',
    width: '246px',
    required: true
  },
  {
    itemType: 'select',
    prop: 't4',
    label: '计租方式',
    list: selectList1,
    placeholder: '请选择',
    width: '246px',
    required: true
  },
  {
    itemType: 'select',
    prop: 't5',
    list: selectList6,
    label: '固定支付周期',
    placeholder: '请输入',
    width: '246px',
    required: true
  },
  { inputType: 'Number', numberConfig: { min: 0, decimal: 2 },
    itemType: 'input',
    prop: 't6',
    label: '租金单价(元)',
    placeholder: '请输入',
    width: '246px',
    required: true
  },
  {
    itemType: 'select',
    prop: 't7',
    label: '扣点支付周期',
    list: selectList6,
    placeholder: '请输入',
    width: '246px',
    required: true
  },
  { inputType: 'Number', numberConfig: { min: 0, decimal: 2 },
    itemType: 'select',
    prop: 't8',
    label: '销售额方式',
    list: selectList5,
    placeholder: '请输入',
    width: '246px',
    required: true
  },
  { inputType: 'Number', numberConfig: { min: 0, decimal: 2 },
    itemType: 'input',
    prop: 't9',
    label: '预估销售额(元)',
    placeholder: '请输入',
    width: '246px',
    required: true
  },
  {
    itemType: 'select',
    prop: 't10',
    label: '扣点',
    list: selectList3,
    placeholder: '请输入',
    width: '246px',
    required: true
  },
  {
    itemType: 'select',
    prop: 't11',
    list: selectList6,
    label: '物管费支付周期',
    placeholder: '请输入',
    width: '246px',
    required: true
  },
  { inputType: 'Number', numberConfig: { min: 0, decimal: 2 },
    itemType: 'input',
    prop: 't12',
    label: '物管费单价(元)',
    placeholder: '请输入',
    width: '246px',
    required: true
  },
  {
    itemType: 'datePicker',
    prop: 't13',
    label: '免租期',
    type: 'daterange',
    width: '246px',
    span: 1,
    required: true }

]
export const rulesForm = { // 表单验证
  t1: [{
    required: true,
    message: '请输入必填项',
    trigger: 'blur'
  }],
  a1: [{
    required: true,
    message: '请输入必填项',
    trigger: 'blur'
  }],
  t3: [{
    required: true,
    message: '请输入必填项',
    trigger: 'blur'
  }],
  t5: [{
    required: true,
    message: '请输入必填项',
    trigger: 'blur'
  }],
  t20: [{
    required: true,
    message: '请输入必填项',
    trigger: 'blur'
  }]
}
export const rulesForm1 = { // 表单验证
  t1: [{
    required: true,
    message: '请输入必填项',
    trigger: 'blur'
  }],
  a1: [{
    required: true,
    message: '请输入必填项',
    trigger: 'blur'
  }],
  t3: [{
    required: true,
    message: '请输入必填项',
    trigger: 'blur'
  }],
  t5: [{
    required: true,
    message: '请输入必填项',
    trigger: 'blur'
  }],
  t20: [{
    required: true,
    message: '请输入必填项',
    trigger: 'blur'
  }]
}
