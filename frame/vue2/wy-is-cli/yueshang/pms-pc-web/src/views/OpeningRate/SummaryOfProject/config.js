import store from '@/store'
import { formatNumber } from 'utils/utils'

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


export function TableConfig() {
  return [
    {
      key: 'yearMonth',
      label: '月份',
      width: 100,
      fixed: true
    },
    {
      key: 'openRateQc',
      label: '开业率',
      type: 'rate',
      minWidth: 100,
      sortable: 'custom',
    },
    {
      key: 'openRate',
      label: '考核开业率',
      type: 'rate',
      minWidth: 120,
      sortable: 'custom'
    },
    {
      key: 'openRentSquareQc',
      label: '开业面积(㎡)',
      type: 'link',
      minWidth: 120,
      align: 'right',
      sortable: 'custom',
      props: {
        click: (data) => {
          this.handleLinkClickToArea(data)
        },
        formatter: (value) => formatNumber(value),
      }
    },
    {
      key: 'openRentSquare',
      label: '考核开业面积(㎡)',
      // type: 'area',
      minWidth: 160,
      sortable: 'custom',
      type: 'link',
      align: 'right',
      props: {
        click: (data) => {
          this.handleLinkClick(data)
        },
        formatter: (value) => formatNumber(value),
      }
    },
    {
      key: 'coverRentSquare',
      label: '押不抵租面积(㎡)',
      type: 'link',
      minWidth: 160,
      align: 'right',
      sortable: 'custom',
      props: {
        click: (data) => {
          this.handleLinkClickToRent(data)
        },
        formatter: (value) => formatNumber(value),
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
      key: 'coverRentSum',
      label: '押不抵租商户数(个)',
      align: 'right',
      width: 150,
      sortable: 'custom'
    }
  ]
}