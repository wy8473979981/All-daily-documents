
import store from '@/store'

let enumList = store.getters.enumList;

export const RateConfig = [
  {
    key: 'openRate',
    label: '考核开业率',
    type: 'rate'
  },
  {
    key: 'openRateTb',
    label: '累计同比',
    type: 'rate'
  },
  {
    key: 'openRateHb',
    label: '累计环比',
    type: 'rate'
  },
  {
    key: 'futureExpireRentSquare',
    label: '三个月内租约到期总面积（㎡)'
  },
  {
    key: 'futureExpireRentSquareRate',
    label: '三个月内租约到期面积占比',
    type: 'rate'
  },
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
    startKey: 'startYearMonth',
    endKey: 'yearMonth',
    props: {
      valueFormat: 'yyyy-MM',
      type: 'month'
    }
  },
  {
    key: 'stage',
    label: '',
    type: 'select',
    props: {
      options: () => enumList.stageAllDict,
      placeholder: '项目阶段'
    }
  },
  {
    key: 'areaId',
    label: '',
    type: 'select',
    props: {
      options: () => enumList.areaDict,
      placeholder: '项目区域'
    }
  },
  {
    key: 'province',
    label: '',
    type: 'select',
    props: {
      options: () => enumList.provinceDict,
      placeholder: '省份'
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
      type: 'link',
      minWidth: 120,
      fixed: true,
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
      key: 'openRateQc',
      label: '开业率',
      type: 'rate',
      minWidth: 80,
      sortable: 'custom'
    },
    {
      key: 'openRate',
      label: '考核开业率',
      type: 'rate',
      minWidth: 110,
      sortable: 'custom'
    },
    {
      key: 'openRateIndexFinish',
      label: '考核开业率达成率',
      type: 'rate',
      minWidth: 150,
      sortable: 'custom'
    },
    {
      key: 'openRateTb',
      label: '同比',
      type: 'rate',
      minWidth: 100,
      sortable: 'custom'
    },
    {
      key: 'openRateHb',
      label: '环比',
      type: 'rate',
      minWidth: 100,
      sortable: 'custom'
    },
    {
      key: 'addRentSquare',
      label: '新增签约面积(㎡)',
      type: 'area',
      minWidth: 140,
      sortable: 'custom'
    },
    {
      key: 'intoRentSquare',
      label: '进场装修中面积(㎡)',
      type: 'area',
      minWidth: 150,
      sortable: 'custom'
    },
    {
      key: 'openRentSquare',
      label: '开业面积(㎡)',
      type: 'area',
      minWidth: 130,
      sortable: 'custom'
    },
    {
      key: 'failRentSquare',
      label: '解约面积(㎡)',
      type: 'area',
      minWidth: 110,
      sortable: 'custom'
    },
    {
      key: 'emptyRentSquare',
      label: '空铺面积(㎡)',
      type: 'area',
      minWidth: 130,
      sortable: 'custom'
    },
    {
      key: 'expireRentSquare',
      label: '合约到期面积(㎡)',
      type: 'area',
      minWidth: 140,
      sortable: 'custom'
    }
  ]
}