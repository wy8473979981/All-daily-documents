import store from '@/store'
import { formatNumber } from 'utils/utils'

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

export const X = new Array(12).fill(1).map((i, idx) => `${idx + 1}月`)

export function TableConfig() {
  return [
    {
      key: 'yearMonth',
      label: '月份',
      fixed: true,
      width: 80
    },
    {
      key: 'openRateQc',
      label: '开业率',
      type: 'link',
      minWidth: 80,
      align: 'right',
      sortable: 'custom',
      props: {
        click: (data) => {
          this.handleLinkClick(data)
        },
        formatter: (value) => formatNumber(value, 'rate'),
      }
    },
    {
      key: 'openRate',
      label: '考核开业率',
      type: 'rate',
      minWidth: 110,
      sortable: 'custom'
    },
    {
      key: 'openRateTb',
      label: '考核开业率同比',
      type: 'rate',
      minWidth: 140,
      sortable: 'custom'
    },
    {
      key: 'coverRentSum',
      label: '押不抵租数(个)',
      align: 'right',
      width: 130,
      sortable: 'custom'
    },
    {
      key: 'coverRentSquare',
      label: '押不抵租面积(㎡)',
      type: 'area',
      minWidth: 140,
      sortable: 'custom'
    },
    {
      key: 'emptyRentSquare',
      label: '实时空铺面积(㎡)',
      type: 'area',
      minWidth: 110,
      sortable: 'custom'
    },
    // {
    //   key: 'emptyRentSquareTb',
    //   label: '空铺面积同比',
    //   type: 'rate',
    //   minWidth: 120,
    //   sortable: 'custom'
    // },
    {
      key: 'failContNum',
      label: '非正常解约数(个)',
      align: 'right',
      width: 140,
      sortable: 'custom'
    },
    {
      key: 'failRentSquare',
      label: '非正常解约面积(㎡)',
      type: 'area',
      minWidth: 150,
      sortable: 'custom'
    },
    {
      key: 'expireContNum',
      label: '合约到期数(个)',
      align: 'right',
      width: 140,
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
