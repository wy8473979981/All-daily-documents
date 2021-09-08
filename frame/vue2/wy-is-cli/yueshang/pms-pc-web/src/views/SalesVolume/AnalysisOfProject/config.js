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
    key: 'primaryForms',
    label: '', // 业态
    type: 'select',
    props: {
      options: () => enumList.layoutDict,
      placeholder: '业态'
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
    key: 'isAssess',
    label: '', // 业态
    type: 'select',
    props: {
      options: () => enumList.squareFlagAllDict,
      placeholder: '面积类型'
    }
  },
]

export const TableConfig = [
  {
    key: 'shopName',
    label: '品牌',
    width: 120,
    fixed: true
  },
  {
    key: 'storeNo',
    label: '铺位号',
    width: 120,
    sortable: 'custom'
  },
  {
    key: 'rentSquare',
    label: '计租面积(㎡)',
    type: 'area',
    minWidth: 110,
    sortable: 'custom'
  },
  {
    key: 'floorNum',
    label: '楼层',
    minWidth: 80,
    sortable: 'custom'
  },
  {
    key: 'primaryForms',
    label: '业态',
    minWidth: 80,
    sortable: 'custom'
  },
  {
    key: 'daliyMoney',
    label: '平均租金(元/㎡/天)',
    type: 'money',
    minWidth: 150,
    sortable: 'custom'
  },
  {
    key: 'daliyBenefitsPerSquareMeter',
    label: '日均坪效',
    type: 'number',
    minWidth: 80,
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
    minWidth: 110,
    sortable: 'custom'
  },
  {
    key: 'lastYearSales',
    label: '去年累计(万元)',
    type: 'ten-thousand',
    minWidth: 130,
    sortable: 'custom'
  },
  {
    key: 'yearOnYear',
    label: '去年同比',
    type: 'rate',
    minWidth: 90,
    sortable: 'custom'
  },
  {
    key: 'daliySales',
    label: '日均销售(万元)',
    type: 'ten-thousand',
    minWidth: 130,
    sortable: 'custom'
  },
  {
    key: 'workdayDaliySales',
    label: '工作日日均(万元)',
    type: 'ten-thousand',
    minWidth: 135,
    sortable: 'custom'
  },
  {
    key: 'holidayDaliySales',
    label: '周末日均(万元)',
    type: 'ten-thousand',
    minWidth: 135,
    sortable: 'custom'
  }
]
