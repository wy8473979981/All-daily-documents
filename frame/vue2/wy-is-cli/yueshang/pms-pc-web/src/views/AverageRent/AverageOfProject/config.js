
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
    type: 'date',
    key: 'year',
    props: {
      valueFormat: 'yyyy',
      type: 'year'
    }
  },
]

export const X = new Array(12).fill(1).map((i, idx) => `${idx + 1}月`)

export const TableConfig = [
  {
    key: 'yearMonth',
    label: '月份',
    width: 100
  },
  {
    key: 'rentSquare',
    label: '计租面积(㎡)',
    type: 'area',
    minWidth: 140
  },
  {
    key: 'a1',
    label: '平均租金(全部)',
    align: 'right',
    children: [
      {
        key: 'avgRentFeeForAll',
        label: '平均(元/㎡)',
        type: 'money',
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
    label: '平均租金(主次力店)',
    align: 'right',
    children: [
      {
        key: 'avgRentFeeForMainStore',
        label: '平均(元/㎡)',
        type: 'money',
        minWidth: 100,
      },
      {
        key: 'yearOnYearForMainStore',
        label: '同比',
        type: 'rate',
        minWidth: 100,
      }
    ]
  },
  {
    key: 'a1',
    label: '平均租金(中小商铺)',
    align: 'right',
    children: [
      {
        key: 'avgRentFeeForSmallStore',
        label: '平均(元/㎡)',
        type: 'money',
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
  //   label: '平均租金(主力店)',
  //   children: [
  //     {
  //       key: 'key1',
  //       label: '平均(元/㎡)',
  //       minWidth: 100,
  //     },
  //     {
  //       key: 'key1',
  //       label: '同比',
  //       type: 'rate',
  //       minWidth: 100,
  //     }
  //   ]
  // },
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