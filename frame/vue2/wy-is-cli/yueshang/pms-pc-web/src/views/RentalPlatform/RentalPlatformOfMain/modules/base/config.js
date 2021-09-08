
import { formatNumber } from 'utils/utils'

/* 铺位概览 */
// 基础信息
export function getBaseInfoConfig() {
  return [
    { key: 'storeNo', label: '铺位号', type: 'custom' },
    { key: 'storeRentSquare', label: '计租面积(㎡)' },
    { key: 'issuingLayoutCdName', label: '业态', type: 'custom' },
    { key: 'storeEquityNatureName', label: '产权属性', type: 'custom' },
    { key: 'salesMoney', label: '本年累计销售额(万元)', type: 'ten-thousand', isLink: true, click: (...props) => { this.handleBaseInfoSale(...props) } },
  ]
}

// 本年租金(万元)
export function getRentThisYearConfig() {
  return [
    { key: 'zjStandard', label: '一铺一价/达成率', type: 'ten-thousand', separator: '/', tipKey: 'zjStandardCompletionRate', autoChangeTipsColor: true, tipType: 'rate' },
    { key: 'zjBudget', label: '财务预算/达成率', type: 'ten-thousand', separator: '/', tipKey: 'zjBudgetCompletionRate', autoChangeTipsColor: true, tipType: 'rate' },
    { key: 'zjCont', label: '实际合同', type: 'ten-thousand' },
  ]
}

// 本年物管费(万元)
export function getPropertyManagementFeeThisYearConfig() {
  return [
    { key: 'wgStandard', label: '一铺一价/达成率', type: 'ten-thousand', separator: '/', tipKey: 'wgStandardCompletionRate', autoChangeTipsColor: true, tipType: 'rate' },
    { key: 'wgBudget', label: '财务预算/达成率', type: 'ten-thousand', separator: '/', tipKey: 'wgBudgetCompletionRate', autoChangeTipsColor: true, tipType: 'rate' },
    { key: 'wgCont', label: '实际合同', type: 'ten-thousand' },
  ]
}

// 基础信息  年销售额

const formatTableCell = (h, scope) => {
  const curYear = new Date().getFullYear()
  if (curYear == scope.row.year && scope.row[scope.column.property] === null) {
    return ''
  } else {
    return formatNumber(scope.row[scope.column.property], 'ten-thousand')
  }
}

export const TableConfig = [
  {
    key: 'year',
    label: '年份',
    width: '60px'
  },
  {
    key: 'total',
    label: '合计',
    type: 'ten-thousand',
    props: {
      style: {
        fontWeight: 'bold'
      }
    }
  },
  {
    key: 'january',
    label: '1月',
    type: 'custom',
    render: formatTableCell
  },
  {
    key: 'february',
    label: '2月',
    type: 'custom',
    render: formatTableCell
  },
  {
    key: 'march',
    label: '3月',
    type: 'custom',
    render: formatTableCell
  },
  {
    key: 'april',
    label: '4月',
    type: 'custom',
    render: formatTableCell
  },
  {
    key: 'may',
    label: '5月',
    type: 'custom',
    render: formatTableCell
  },
  {
    key: 'june',
    label: '6月',
    type: 'custom',
    render: formatTableCell
  },
  {
    key: 'july',
    label: '7月',
    type: 'custom',
    render: formatTableCell
  },
  {
    key: 'august',
    label: '8月',
    type: 'custom',
    render: formatTableCell
  },
  {
    key: 'september',
    label: '9月',
    type: 'custom',
    render: formatTableCell
  },
  {
    key: 'october',
    label: '10月',
    type: 'custom',
    render: formatTableCell
  },
  {
    key: 'november',
    label: '11月',
    type: 'custom',
    render: formatTableCell
  },
  {
    key: 'december',
    label: '12月',
    type: 'custom',
    render: formatTableCell
  }
]