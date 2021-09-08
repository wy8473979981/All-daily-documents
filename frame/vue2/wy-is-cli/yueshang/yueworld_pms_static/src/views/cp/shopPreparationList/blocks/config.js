export const configData = [ // 表单配置
  {
    itemType: 'input',
    prop: 's1',
    required: true,
    label: '铺号',
    placeholder: '请输入',
    width: '200px'
  },
  {
    itemType: 'select',
    prop: 's2',
    required: true,
    label: '楼层',
    placeholder: '请选择楼层',
    width: '200px',
    list: this.$PUBFN.getOptionsList('globalSearchList'),
    listName: 'label',
    listValue: 'value'
  },
  {
    itemType: 'input',
    prop: 's3',
    required: true,
    label: '计租面积',
    placeholder: '请输入',
    width: '200px'
  },
  {
    itemType: 'select',
    prop: 's4',
    required: true,
    label: '签批业态',
    placeholder: '请选择签批业态',
    width: '200px',
    list: this.$PUBFN.getOptionsList('globalSearchList'),
    listName: 'label',
    listValue: 'value'
  },
  {
    itemType: 'input',
    prop: 's5',
    required: true,
    label: '标准租金(元)',
    placeholder: '请输入',
    width: '200px'
  },
  {
    itemType: 'input',
    prop: 's6',
    required: true,
    label: '标准管理费(元)',
    placeholder: '请输入',
    width: '200px'
  }
]
