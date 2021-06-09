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
      minWidth: 90,
      fixed: true,
      props: {
        click(data) {
          method(data)
        }
      }
    },
    {
      key: 'openRateQc',
      label: '开业率',
      type: 'rate',
      minWidth: 90,
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
      key: 'openRentSquareQc',
      label: '开业面积(㎡)',
      type: 'area',
      minWidth: 130,
      sortable: 'custom'
    },
    {
      key: 'openRentSquare',
      label: '考核开业面积(㎡)',
      type: 'area',
      minWidth: 140,
      sortable: 'custom'
    },
    {
      key: 'storeRentSquare',
      label: '总面积(㎡)',
      type: 'area',
      minWidth: 130,
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
      key: 'coverRentSum',
      label: '押不抵租商户数(个)',
      align: 'right',
      width: 150,
      sortable: 'custom'
    }
  ]
}