import store from '@/store'

let enumList = store.getters.enumList;

export const RateConfig = [
  {
    key: 'leaseRate',
    label: '考核出租率',
    type: 'rate'
  }
]

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
    type: 'dateRange',
    startKey: 'startDate',
    endKey: 'endDate',
    props: {
      valueFormat: 'yyyy-MM-dd',
      type: 'date'
    }
  },
  {
    key: 'stage',
    label: '',
    type: 'select',
    props: {
      options: () => enumList.stageAllDict,
      placeholder: '请选择阶段'
    }
  },
  {
    key: 'areaId',
    label: '',
    type: 'select',
    props: {
      options: () => enumList.areaDict,
      placeholder: '请选择区域'
    }
  },
  {
    key: 'province',
    label: '',
    type: 'select',
    props: {
      options: () => enumList.provinceDict,
      placeholder: '请选择省份'
    }
  },
]

export const X = new Array(12).fill(1).map((i, idx) => `${idx + 1}月`)

export function TableConfig(method) {
  return [
    {
      key: 'sortIndex',
      label: '排名',
      fixed: true,
      width: 60
    },
    {
      key: 'name',
      label: '项目',
      minWidth: 120,
      fixed: true,
      type: 'link',
      props: {
        click(data) {
          method(data)
        }
      }
    },
    {
      key: 'storeRentSquare',
      label: '总面积(㎡)',
      type: 'area',
      minWidth: 120,
      sortable: 'custom'
    },
    {
      key: 'leaseRateQc',
      label: '出租率',
      type: 'rate',
      minWidth: 90,
      sortable: 'custom'
    },
    {
      key: 'leaseRate',
      label: '考核出租率',
      type: 'rate',
      minWidth: 100,
      sortable: 'custom'
    },
    {
      key: 'leaseRateIndexFinish',
      label: '考核出租率达成率',
      type: 'rate',
      minWidth: 150,
      sortable: 'custom'
    },
    {
      key: 'leaseRateTb',
      label: '同比',
      type: 'rate',
      minWidth: 110,
      sortable: 'custom'
    },
    {
      key: 'leaseRateHb',
      label: '环比',
      type: 'rate',
      minWidth: 90,
      sortable: 'custom'
    },
    {
      key: 'rentSquareQc',
      label: '出租面积(㎡)',
      type: 'area',
      minWidth: 120,
      sortable: 'custom'
    },
    {
      key: 'rentSquare',
      label: '考核出租面积(㎡)',
      type: 'area',
      minWidth: 135,
      sortable: 'custom'
    },
    {
      key: 'coverRentSquare',
      label: '押不抵租面积(㎡)',
      type: 'area',
      minWidth: 135,
      sortable: 'custom'
    },
    {
      key: 'twoSignNum',
      label: '新增双签数量',
      type: 'number',
      width: 110,
      sortable: 'custom'
    },
    {
      key: 'addRentSquare',
      label: '新增签约面积(㎡)',
      type: 'area',
      minWidth: 135,
      sortable: 'custom'
    },
    {
      key: 'failContNum',
      label: '新增解约数量',
      type: 'number',
      width: 110,
      sortable: 'custom'
    },
    {
      key: 'failRentSquare',
      label: '新增解约面积(㎡)',
      type: 'area',
      minWidth: 135,
      sortable: 'custom'
    },
  ]
}