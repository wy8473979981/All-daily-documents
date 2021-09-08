/*
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
 */
import PUBFN from '@/utils/pubFn'

// 状态筛选
export const statusSearchConfig = function() {
  return [
    {
      name: '录入状态',
      key: 'recordStatus',
      list: [
        { label: '已录入', value: 1, dataKey: 'recorded' },
        { label: '部分录入', value: 2, dataKey: 'recording' },
        { label: '未录入', value: 3, dataKey: 'unrecord' }
      ]
    }
  ]
}

// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '输入品牌/合同/商铺/商家关键字', width: '270px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'programName', label: '', multiple: true, placeholder: '全部项目', width: '220px', list: PUBFN.getOptionsList('allProject'), isFirst: true },
    { itemType: 'monthPicker', prop: 'month', label: '', placeholder: '', width: '220px', isFirst: true },
    { itemType: 'select', prop: 'contType', label: '', placeholder: '合同类型', width: '200px', list: PUBFN.getOptionsList('contType'), isFirst: true }
  ]
}

// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { id: '序号', type: 'index', showFixed: true, fixed: true },
    { contNo: '合同编号', sortable: true, isShow: true },
    { spaceName: '铺位号/多经名称', sortable: true, width: 140, isShow: true },
    { tenantName: '商家名称', sortable: true, isShow: true },
    { brandName: '品牌名', sortable: true, isShow: true },
    { statPeriod: '统计周期', isShow: false },
    { confirmSalesVolumeTotal: '确认销售额(元)', sortable: true, width: 140, isShow: true, type: 'money' },
    { lastModificationTime: '最后修改时间', sortable: true, isShow: true, width: 140 },
    { recordStatus: '录入状态', isShow: true, width: 100 },
    { recordLost: '未录入天数', isShow: true, width: 140, sortable: true }
  ]
}
