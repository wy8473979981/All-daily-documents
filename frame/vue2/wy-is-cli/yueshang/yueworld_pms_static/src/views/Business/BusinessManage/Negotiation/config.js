/*
 * @Author: xiaxiaona
 * @LastEditors: fhj
 * @Description: 深入洽谈 - 配置项
 */
import PUBFN from '@/utils/pubFn'

export const statusSearchConfig = function() {
  return [
    {
      name: '洽谈方式',
      key: 'negotiationMethod',
      list: [
        { label: '当面洽谈', value: 1, dataKey: 'total' },
        { label: '电话洽谈', value: 2, dataKey: 'total' },
        { label: '网络洽谈', value: 3, dataKey: 'total' }
      ]
    }
  ]
}
// 搜索配置
export const searchConfig = function() {
  return [
    {
      itemType: 'input',
      prop: 'fuzzyEnquiry',
      label: '',
      placeholder: '请输入品牌名/手机号/租赁区域',
      width: '200px',
      isSearch: true,
      isFirst: true
    },
    {
      itemType: 'selectDialog',
      prop: 'programName',
      label: '',
      placeholder: '请选择项目',
      width: '200px',
      isFirst: true,
      list: PUBFN.getOptionsList('projectList')
    },
    {
      itemType: 'selectDialog',
      prop: 'spaceEquityNature',
      label: '',
      placeholder: '请选择规划业态',
      width: '200px',
      isFirst: true,
      list: PUBFN.getOptionsList('brandFormatName')
    }
  ]
}

// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { idx: '序号', type: 'index', sortable: true, width: 100, showFixed: true },
    { programName: '项目名称', sortable: true, isShow: true },
    { discussId: '深入洽谈编码', sortable: true, isShow: true },
    { leaseArea: '租赁区域', sortable: true, isShow: true },
    { spaceFormatNamePlan: '规划业态', sortable: true, isShow: true },
    { tenantName: '商家名称', sortable: true, isShow: true },
    { updatedDate: '最后修改时间', sortable: true, isShow: true }
  ]
}
