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
    key: 'yearMonth',
    props: {
      valueFormat: 'yyyy-MM',
      type: 'month'
    }
  },
]


export const TableConfig = [
  {
    key: 'name',
    label: '楼层',
    width: 120,
    fixed: true
  },
  {
    key: 'storeNum',
    label: '总铺位数',
    align: 'right',
    minWidth: 80,
    sortable: 'custom'
  },
  {
    key: 'storeRentSquare',
    label: '总面积(㎡)',
    type: 'area',
    minWidth: 160,
    sortable: 'custom'
  },
  {
    key: 'rentSquareQc',
    label: '开业面积(㎡)',
    type: 'area',
    minWidth: 160,
    sortable: 'custom'
  },
  {
    key: 'coverRentSquare',
    label: '押不抵租面积(㎡)',
    type: 'area',
    minWidth: 160,
    sortable: 'custom'
  },
  {
    key: 'rentSquare',
    label: '考核开业面积(㎡)',
    type: 'area',
    minWidth: 160,
    sortable: 'custom'
  },
  {
    key: 'openRateQc',
    label: '开业率',
    type: 'rate',
    minWidth: 100,
    sortable: 'custom'
  },
  {
    key: 'openRate',
    label: '考核开业率',
    type: 'rate',
    minWidth: 120
  },
]