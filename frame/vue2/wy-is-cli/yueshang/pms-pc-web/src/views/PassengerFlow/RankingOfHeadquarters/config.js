
import store from '@/store'

let enumList = store.getters.enumList;

export const FormConfig = [
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
    key: 'province',
    label: '',
    type: 'select',
    props: {
      options: () => enumList.provinceDict,
      placeholder: '省份'
    }
  },
]

export function TableConfig() {
  return [
    {
      key: 'sortIndex',
      label: '排名',
      width: 60,
      fixed: true
    },
    {
      key: 'projectName',
      label: '项目',
      type: 'link',
      props: {
        click: (data) => {
          this.handleLinkClick(data)
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
      label: '去年累计(万人)',
      type: 'ten-thousand',
      minWidth: 130,
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
      minWidth: 110,
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
      label: '工作日日均(万人)',
      type: 'ten-thousand',
      minWidth: 150,
      sortable: 'custom'
    },
    {
      key: 'holidayAverageActualFlow',
      label: '周末日均(万人)',
      type: 'ten-thousand',
      minWidth: 130,
      sortable: 'custom'
    }
  ]
}