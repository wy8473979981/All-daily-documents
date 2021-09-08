import store from '@/store'

let enumList = store.getters.enumList;

// 项目
export const ProjectOptions = enumList.areaAndProject
export const TopListConfig = [
  { key: 'openDate', label: '开业时间', type: 'custom'  },
  { key: 'squareEquity', label: '总建筑面积(㎡)' },
  { key: 'updateDate', label: '更新时间', type: 'custom'  }
]

/* 项目概览 */
// 铺位信息
export const ShopInfoConfig = [
  { key: 'storeRentSquare', label: '计租面积(㎡)' },
  { key: 'storeNum', label: '总铺位(个)', type: 'custom' },
  { key: 'rentedRentSquare', label: '在营面积(㎡)', hasPreLine: true },
  { key: 'rentedStoreNum', label: '在营铺位(个)', type: 'custom' },
  { key: 'rentedNoOpenRentSquare', label: '已租未开业面积(m²)', hasPreLine: true },
  { key: 'rentedNoOpenStoreNum', label: '已租未开业铺位(个)', type: 'custom' },
  { key: 'emptyRentSquare', label: '空铺面积(m²)', hasPreLine: true },
  { key: 'emptyStoreNum', label: '空铺铺位(个)', type: 'custom' }
]

// 本年租金(万元)
export const RentThisYearConfig = [
  { key: 'zjStandard', label: '一铺一价', type: 'ten-thousand' },
  { key: 'zjBudget', label: '财务预算', type: 'ten-thousand' },
  { key: 'zjCont', label: '实际合同', type: 'ten-thousand' }
]

// 本年物管费(万元)
export const PropertyManagementFeeThisYearConfig = [
  { key: 'wgStandard', label: '一铺一价', type: 'ten-thousand' },
  { key: 'wgBudget', label: '财务预算', type: 'ten-thousand' },
  { key: 'wgCont', label: '实际合同', type: 'ten-thousand' }
]
