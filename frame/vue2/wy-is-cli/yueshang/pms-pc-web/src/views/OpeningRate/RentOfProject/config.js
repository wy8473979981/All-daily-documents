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
    key: 'key1',
    label: '合同编号',
    minWidth: 160,
    fixed: true
  },
  {
    key: 'key2',
    label: '开业时间',
    type: 'date-d',
    minWidth: 140,
    sortable: 'custom'
  },
  {
    key: 'key3',
    label: '开始日期',
    type: 'date-d',
    minWidth: 140,
    sortable: 'custom'
  },
  {
    key: 'key5',
    label: '结束日期',
    type: 'date-d',
    minWidth: 140,
    sortable: 'custom'
  },
  {
    key: 'key6',
    label: '合作品牌',
    minWidth: 160,
    sortable: 'custom'
  },
  {
    key: 'key8',
    label: '铺位编号',
    minWidth: 150,
    sortable: 'custom'
  },
  {
    key: 'key9',
    label: '总面积(㎡)',
    type: 'area',
    minWidth: 160,
    sortable: 'custom'
  },
  {
    key: 'key10',
    label: '租金保证金(元)',
    type: 'money',
    minWidth: 160,
    sortable: 'custom'
  },
  {
    key: 'key11',
    label: '物管保证金(元)',
    type: 'money',
    minWidth: 160,
    sortable: 'custom'
  },
  {
    key: 'key12',
    label: '租金欠费(元)',
    type: 'money',
    minWidth: 160,
    sortable: 'custom'
  },
  {
    key: 'key13',
    label: '物管欠费(元)',
    type: 'money',
    minWidth: 160,
    sortable: 'custom'
  },
  {
    key: 'key14',
    label: '累计差额(元)',
    type: 'money',
    minWidth: 160,
    sortable: 'custom'
  }
]