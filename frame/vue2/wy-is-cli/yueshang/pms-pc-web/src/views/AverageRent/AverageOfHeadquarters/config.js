
import store from '@/store'

let enumList = store.getters.enumList;

export const RateConfig = [
  {
    key: 'avgRentFeeOfAll',
    label: '平均租金(元/m²)',
    type: 'money'
  },
  {
    key: 'avgRentFeeOfClothes',
    label: '服装(元/m²)'
  },
  {
    key: 'avgRentFeeOfMatching',
    label: '配套(元/m²)'
  },
  {
    key: 'avgRentFeeOfFood',
    label: '餐饮(元/m²)'
  },
  {
    key: 'avgRentFeeOfChildren',
    label: '儿童(元/m²)'
  },
  {
    key: 'avgRentFeeOfSuperMarket',
    label: '超市(元/m²)'
  },
  {
    key: 'avgRentFeeOfDepartment',
    label: '百货(元/m²)'
  },
  {
    key: 'avgRentFeeOfCinema',
    label: '影院(元/m²)'
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
    key: 'stage',
    label: '',
    type: 'select',
    props: {
      options: () => enumList.stageAllDict,
      placeholder: '项目阶段'
    }
  },
  {
    label: '',
    type: 'dateRange',
    startKey: 'startDate',
    endKey: 'endDate',
    props: {
      valueFormat: 'yyyy-MM',
      type: 'month'
    }
  },
  {
    key: 'operStatus',
    label: '',
    type: 'select',
    props: {
      options: () => enumList.operStatusDict,
      placeholder: '项目状态'
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
      key: 'projectName',
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
      key: 'rentSquare',
      label: '计租面积(㎡)',
      type: 'area',
      minWidth: 140,
      sortable: 'custom'
    },
    {
      key: 'a1',
      label: '平均租金(全部)',
      align: 'right',
      children: [
        {
          key: 'avgRentFeeForAll',
          label: '平均(元/㎡)',
          align: 'right',
          minWidth: 100,
        },
        {
          key: 'yearOnYearForAll',
          label: '同比',
          type: 'rate',
          minWidth: 100,
        }
      ]
    },
    {
      key: 'a1',
      label: '平均租金(主力店)',
      align: 'right',
      children: [
        {
          key: 'avgRentFeeForMainStore',
          label: '平均(元/㎡)',
          align: 'right',
          minWidth: 100,
        },
        {
          key: 'avgRentFeeForSmallStore',
          label: '同比',
          type: 'rate',
          minWidth: 100,
        }
      ]
    },
    {
      key: 'a1',
      label: '平均租金(小商铺)',
      align: 'right',
      children: [
        {
          key: 'yearOnYearForMainStore',
          label: '平均(元/㎡)',
          align: 'right',
          minWidth: 100,
        },
        {
          key: 'yearOnYearForSmallStore',
          label: '同比',
          type: 'rate',
          minWidth: 100,
        }
      ]
    },
    // {
    //   key: 'a1',
    //   label: '租金达成率(按预算)',
    //   children: [
    //     {
    //       key: 'key1',
    //       label: '当前周期',
    //       type: 'rate',
    //       minWidth: 100,
    //     },
    //     {
    //       key: 'key1',
    //       label: '年累计',
    //       type: 'rate',
    //       minWidth: 100,
    //     }
    //   ]
    // },
    // {
    //   key: 'a1',
    //   label: '租金达成率(按一铺一价)',
    //   children: [
    //     {
    //       key: 'key1',
    //       label: '当前周期',
    //       type: 'rate',
    //       minWidth: 100,
    //     },
    //     {
    //       key: 'key1',
    //       label: '年累计',
    //       type: 'rate',
    //       minWidth: 100,
    //     }
    //   ]
    // },
  ]
}