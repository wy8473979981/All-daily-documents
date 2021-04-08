import store from '@/store'

let enumList = store.getters.enumList;

export const FormConfig = [
  {
    key: 'projectId',
    label: '',
    type: 'select',
    props: {
      options: () => enumList.projectDict,
      placeholder: '项目',
      filterable: true
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
    type: 'dateRange',
    startKey: 'startDate',
    endKey: 'endDate',
    props: {
      valueFormat: 'yyyy-MM-dd',
      type: 'date'
    }
  },
]

export const TableConfig = [
  {
    key: 'projectName',
    label: '项目',
    minWidth: 160,
    fixed: true
  },
  {
    key: 'chargeType',
    label: '物业类型',
    minWidth: 140,
    sortable: 'custom'
  },
  {
    key: 'storeNo',
    label: '铺位号',
    minWidth: 140,
    sortable: 'custom'
  },
  {
    key: 'floorNum',
    label: '楼层',
    minWidth: 120,
    sortable: 'custom'
  },
  {
    key: 'storeRentSquare',
    label: '计租面积(㎡)',
    type: 'area',
    minWidth: 160,
    sortable: 'custom'
  },
  {
    key: 'storeEquityNature',
    label: '产权性质',
    minWidth: 150,
    sortable: 'custom'
  },
  {
    key: 'rentStatus',
    label: '租赁性质',
    minWidth: 160,
    sortable: 'custom'
  },
  {
    key: 'managementStatus',
    label: '是否返租',
    minWidth: 120,
    sortable: 'custom'
  },
  {
    key: 'isAssess',
    label: '是否考核',
    minWidth: 120,
    sortable: 'custom'
  }
]