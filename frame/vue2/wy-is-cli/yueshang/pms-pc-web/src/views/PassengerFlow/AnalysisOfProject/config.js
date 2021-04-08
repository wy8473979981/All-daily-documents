// import store from '@/store'

// let enumList = store.getters.enumList;

export const FormConfig = [
  // {
  //   key: 'chargeType',
  //   label: '',
  //   type: 'select',
  //   props: {
  //     options: () => enumList.chargeTypeDict,
  //     placeholder: '物业类型'
  //   }
  // },
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



export function TableConfig(method) {
  return [
    {
      key: 'projectName',
      label: '项目',
      type: 'link',
      props: {
        click(scope) {
          method(scope)
        }
      },
      minWidth: 120,
      fixed: true
    },
    {
      key: 'passengerDensity',
      label: '客流密度',
      minWidth: 90,
      type: 'money',
      sortable: 'custom'
    },
    {
      key: 'actualFlow',
      label: '累计客流(万人)',
      type: 'ten-thousand',
      minWidth: 130,
      sortable: 'custom'
    },
    {
      key: 'lastYearActualFlow',
      label: '去年累计',
      type: 'money',
      minWidth: 100,
      sortable: 'custom'
    },
    {
      key: 'growth',
      label: '同比去年',
      type: 'rate',
      minWidth: 90,
      sortable: 'custom'
    },
    {
      key: 'daliyAverageActualFlow',
      label: '日均(万人)',
      type: 'ten-thousand',
      minWidth: 100,
      sortable: 'custom'
    },
    {
      key: 'daliyAverageBudgetFlow',
      label: '日均指标',
      type: 'money',
      minWidth: 90,
      sortable: 'custom'
    },
    {
      key: 'achievementRate',
      label: '达成率',
      type: 'rate',
      minWidth: 90,
      sortable: 'custom'
    },
    {
      key: 'workdayAverageActualFlow',
      label: '工作日日均',
      type: 'money',
      minWidth: 100,
      sortable: 'custom'
    },
    {
      key: 'holidayAverageActualFlow',
      label: '周末日均',
      type: 'money',
      minWidth: 100,
      sortable: 'custom'
    }
  ]
}