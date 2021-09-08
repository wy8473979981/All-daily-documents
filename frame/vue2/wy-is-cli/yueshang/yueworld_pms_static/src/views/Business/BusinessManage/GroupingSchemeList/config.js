/*
 * @Author: xiaoxie
 * @LastEditors: xza
 * @Description: xiaoxie
 */
import PUBFN from '@/utils/pubFn'
// 审批状态
export const statusSearchConfig = function() {
  return [
    {
      name: '方案状态',
      key: 'ruleType',
      list: [
        { label: '正常', value: 1, dataKey: 'ruleType01' },
        { label: '失效', value: 2, dataKey: 'ruleType02' }
      ]
    },
    {
      name: '铺位类型',
      key: 'storeTypes',
      list: [
        { label: '商铺', value: 1, dataKey: 'storeTypes01' },
        { label: '多经', value: 2, dataKey: 'storeTypes02' },
        { label: '写字楼', value: 3, dataKey: 'storeTypes03' }
      ]
    }
  ]
}
// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入方案编号/名称', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'programName', label: '', placeholder: '请选择项目', width: '220px', list: PUBFN.getOptionsList('projectList'), isFirst: true }
  ]
}

// 列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
    { ruleId: '方案编号', sortable: true, isShow: true },
    { programName: '适用项目', sortable: true, isShow: true },
    { ruleName: '方案名称', sortable: true, isShow: true },
    { feeNumber: '费项数', sortable: true, isShow: true },
    { storeTypes: '铺位类型', sortable: true, isShow: true },
    { ruleType: '方案状态', sortable: true, isShow: true },
    { createdDate: '创建时间', sortable: true, isShow: true }
  ]
}
