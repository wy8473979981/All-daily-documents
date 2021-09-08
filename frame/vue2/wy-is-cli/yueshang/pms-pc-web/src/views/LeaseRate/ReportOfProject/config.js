import store from '@/store'
import { formatNumber } from 'utils/utils'

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
    type: 'dateRange',
    startKey: 'startDate',
    endKey: 'endDate',
    props: {
      valueFormat: 'yyyy-MM-dd',
      type: 'date'
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

export function TableConfig() {
  return [
    {
      key: 'sortIndex',
      label: '序号',
      fixed: true,
      width: 60
    },
    {
      key: 'name',
      label: '项目',
      minWidth: 120,
      fixed: true,
    },
    {
      key: 'storeRentSquare',
      label: '总面积(㎡)',
      type: 'link',
      minWidth: 120,
      align: 'right',
      sortable: 'custom',
      props: {
        click: (data) => {
          this.handleLinkClick(data, 'lr-area-project')
        },
        formatter: (value) => formatNumber(value),
      }
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
      type: 'link',
      minWidth: 120,
      align: 'right',
      sortable: 'custom',
      props: {
        click: (data) => {
          this.handleLinkClick(data, 'lr-realsearea-project')
        },
        formatter: (value) => formatNumber(value),
      }
    },
    {
      key: 'rentSquare',
      label: '考核出租面积(㎡)',
      type: 'link',
      minWidth: 135,
      align: 'right',
      sortable: 'custom',
      props: {
        click: (data) => {
          this.handleLinkClick(data, 'lr-check-project')
        },
        formatter: (value) => formatNumber(value),
      }
    },
    {
      key: 'leaseCoverRentSquare',
      label: '押不抵租面积(㎡)',
      type: 'link',
      minWidth: 135,
      align: 'right',
      sortable: 'custom',
      props: {
        click: (data) => {
          this.handleLinkClick(data, 'lr-rent-project')
        },
        formatter: (value) => formatNumber(value),
      }
    },
    {
      key: 'twoSignNum',
      label: '新增双签数(个)',
      align: 'right',
      width: 130,
      sortable: 'custom'
    },
    {
      key: 'twoSignRentSquare',
      label: '新增签约面积(㎡)',
      type: 'area',
      minWidth: 135,
      sortable: 'custom'
    },
    {
      key: 'failContNum',
      label: '新增解约数(个)',
      align: 'right',
      width: 130,
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