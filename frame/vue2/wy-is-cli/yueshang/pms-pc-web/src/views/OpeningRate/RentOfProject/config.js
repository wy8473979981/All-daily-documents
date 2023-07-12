import store from '@/store'

let enumList = store.getters.enumList;

export const FormConfig = [
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
    key: 'squareFlag',
    label: '',
    type: 'select',
    props: {
      options: () => enumList.squareFlagDict,
      placeholder: '面积类型'
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
    key: 'contNo',
    label: '合同编号',
    minWidth: 160,
    fixed: true
  },
  {
    key: 'realOpenDate',
    label: '开业时间',
    type: 'date-d',
    minWidth: 140,
    sortable: 'custom'
  },
  {
    key: 'contStartDate',
    label: '开始日期',
    type: 'date-d',
    minWidth: 140,
    sortable: 'custom'
  },
  {
    key: 'realContEndDate',
    label: '结束日期',
    type: 'date-d',
    minWidth: 140,
    sortable: 'custom'
  },
  {
    key: 'cooperativeBrand',
    label: '合作品牌',
    minWidth: 160,
    sortable: 'custom'
  },
  {
    key: 'storeNo',
    label: '铺位编号',
    minWidth: 150,
    sortable: 'custom'
  },
  {
    key: 'rentSquare',
    label: '总面积(㎡)',
    type: 'area',
    minWidth: 160,
    sortable: 'custom'
  },
  {
    key: 'zjBlance',
    label: '租金保证金(元)',
    type: 'money',
    minWidth: 160,
    sortable: 'custom'
  },
  {
    key: 'wgBlance',
    label: '物管保证金(元)',
    type: 'money',
    minWidth: 160,
    sortable: 'custom'
  },
  {
    key: 'zjOwe',
    label: '租金欠费(元)',
    type: 'money',
    minWidth: 160,
    sortable: 'custom'
  },
  {
    key: 'wgOwe',
    label: '物管欠费(元)',
    type: 'money',
    minWidth: 160,
    sortable: 'custom'
  },
  {
    key: 'blanceSubOwe',
    label: '累计差额(元)',
    type: 'money',
    minWidth: 160,
    sortable: 'custom'
  }
]