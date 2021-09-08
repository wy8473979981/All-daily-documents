
export const formData = { // 表单数据
  s1: '',
  s2: ''
}
export const contractConfigData = [ // 合同表单配置
  {
    itemType: 'select',
    prop: 's7',
    required: true,
    label: '合同类型',
    placeholder: '请选择合同类型',
    width: '200px',
    list: this.$PUBFN.getOptionsList('globalSearchList'),
    listName: 'label',
    listValue: 'value'
  },
  {
    itemType: 'datePicker',
    prop: 's8',
    required: true,
    type: 'datetimerange',
    label: '合同起止日期',
    placeholder: '请选择楼层',
    width: '200px'
  },
  {
    itemType: 'select',
    prop: 's9',
    required: true,
    label: '品牌',
    placeholder: '请选择合同类型',
    width: '200px',
    list: this.$PUBFN.getOptionsList('globalSearchList'),
    listName: 'label',
    listValue: 'value'
  },
  {
    itemType: 'select',
    prop: 's10',
    required: true,
    label: '计租方式',
    placeholder: '请选择合同类型',
    width: '200px',
    list: this.$PUBFN.getOptionsList('globalSearchList'),
    listName: 'label',
    listValue: 'value'
  },
  {
    itemType: 'select',
    prop: 's11',
    required: true,
    label: '固定支付周期',
    placeholder: '请选择合同类型',
    width: '200px',
    list: this.$PUBFN.getOptionsList('globalSearchList'),
    listName: 'label',
    listValue: 'value'
  },
  {
    itemType: 'input',
    prop: 's12',
    required: true,
    label: '租金单价元',
    placeholder: '请输入',
    width: '200px'
  },
  {
    itemType: 'select',
    prop: 's13',
    required: true,
    label: '扣点支付周期',
    placeholder: '请选择合同类型',
    width: '200px',
    list: this.$PUBFN.getOptionsList('globalSearchList'),
    listName: 'label',
    listValue: 'value'
  },
  {
    itemType: 'select',
    prop: 's14',
    required: true,
    label: '销售额方式',
    placeholder: '请选择合同类型',
    width: '200px',
    list: this.$PUBFN.getOptionsList('globalSearchList'),
    listName: 'label',
    listValue: 'value'
  },
  {
    itemType: 'input',
    prop: 's15',
    required: true,
    label: '预估销售额(元)',
    placeholder: '请输入',
    width: '200px'
  },
  {
    itemType: 'select',
    prop: 's16',
    required: true,
    label: '扣点',
    placeholder: '请选择合同类型',
    width: '200px',
    list: this.$PUBFN.getOptionsList('globalSearchList'),
    listName: 'label',
    listValue: 'value'
  },
  {
    itemType: 'select',
    prop: 's17',
    required: true,
    label: '物管费支付周期',
    placeholder: '请选择合同类型',
    width: '200px',
    list: this.$PUBFN.getOptionsList('globalSearchList'),
    listName: 'label',
    listValue: 'value'
  },
  {
    itemType: 'input',
    prop: 's18',
    required: true,
    label: '物管费单价(元)',
    placeholder: '请选择合同类型',
    width: '200px'
  },
  {
    itemType: 'datePicker',
    prop: '19',
    required: true,
    type: 'datetimerange',
    label: '免租期',
    placeholder: '请选择楼层',
    width: '200px'
  }
]
