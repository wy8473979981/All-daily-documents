import store from '@/store'

let enumList = store.getters.enumList;

export const FormConfig = [
  {
    key: 'projectId',
    label: '',
    type: 'select',
    props: {
      options: () => enumList.projectDict,
      placeholder: '项目名称',
      filterable: true
    }
  },
  {
    key: 'chargeType',
    label: '',
    type: 'select',
    props: {
      options: () => enumList.chargeTypeDict,
      placeholder: '物业类型'
    }
  },
  {
    label: '',
    type: 'date',
    key: 'date',
    props: {
      valueFormat: 'yyyy-MM',
      type: 'month'
    }
  },
]


export const TableConfig = [
  {
    key: 'key1',
    label: '楼层',
    fixed: true
  },
  {
    key: 'key2',
    label: '总铺位数',
    type: 'number',
    minWidth: 120,
    sortable: 'custom'
  },
  {
    key: 'key3',
    label: '总面积(㎡)',
    type: 'area',
    minWidth: 160,
    sortable: 'custom'
  },
  {
    key: 'key5',
    label: '开业面积(㎡)',
    type: 'area',
    minWidth: 160,
    sortable: 'custom'
  },
  {
    key: 'key8',
    label: '押不抵租面积(㎡)',
    type: 'area',
    minWidth: 160,
    sortable: 'custom'
  },
  {
    key: 'key6',
    label: '考核开业面积(㎡)',
    type: 'area',
    minWidth: 160,
    sortable: 'custom'
  },
  {
    key: 'key7',
    label: '开业率',
    type: 'rate',
    minWidth: 100,
    sortable: 'custom'
  },
  {
    key: 'key8',
    label: '考核开业率',
    type: 'rate',
    minWidth: 120
  },
]