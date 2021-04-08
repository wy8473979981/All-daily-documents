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
      valueFormat: 'yyyy-MM-dd',
      type: 'date'
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
  {
    key: 'primaryForms',
    label: '', // 业态
    type: 'select',
    props: {
      options: () => enumList.layoutDict,
      placeholder: '业态'
    }
  },
]

export function TableConfig(method) {
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
        click(scope) {
          method(scope)
        }
      },
      minWidth: 120,
      fixed: true
    },
    {
      key: 'daliyBenefitsPerSquareMeter',
      label: '日均坪效',
      width: 80,
      type: 'number',
      sortable: 'custom'
    },
    {
      key: 'rentalSalesRatio',
      label: '租售比',
      type: 'rate',
      minWidth: 90,
      sortable: 'custom'
    },
    {
      key: 'sales',
      label: '销售额(万元)',
      type: 'ten-thousand',
      minWidth: 120,
      sortable: 'custom'
    },
    {
      key: 'lastSales',
      label: '去年累计(万元)',
      type: 'ten-thousand',
      minWidth: 130,
      sortable: 'custom'
    },
    {
      key: 'yearOnYear',
      label: '同比去年',
      type: 'rate',
      minWidth: 110,
      sortable: 'custom'
    },
    {
      key: 'daliySales',
      label: '日均销售(万元)',
      type: 'ten-thousand',
      minWidth: 140,
      sortable: 'custom'
    },
    {
      key: 'daliyTarget',
      label: '日均指标',
      type: 'number',
      width: 80,
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
      key: 'workdayDaliySales	',
      label: '工作日日均(万元)',
      type: 'ten-thousand',
      minWidth: 160,
      sortable: 'custom'
    },
    {
      key: 'holidayDaliySales',
      label: '周末日均(万元)',
      type: 'ten-thousand',
      minWidth: 120,
      sortable: 'custom'
    }
  ]
}