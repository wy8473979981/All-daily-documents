/*
 * @Author: fzx
 * @LastEditors: fzx
 * @Description: 配置项
 */
import PUBFN from '@/utils/pubFn'

export const statusSearchConfig = function() {
  return [
    {
      name: '方案状态',
      key: 'searchStatus',
      list: [
        { label: '正常', value: 1, dataKey: 'normal' },
        { label: '失效', value: 2, dataKey: 'invalid' }
      ]
    }
  ]
}
// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', placeholder: '请输入方案编号/名称', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'select', prop: 'programName', placeholder: '请选择项目', width: '200px', list: PUBFN.getOptionsList('projectName'), isFirst: true }
  ]
}

// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { idx: '序号', type: 'index', sortable: true, showFixed: true },
    { ruleId: '方案编号', sortable: true, isShow: true },
    { programName: '适用项目', sortable: true, isShow: true },
    { ruleName: '方案名称', sortable: true, isShow: true },
    { verificationTypes: '核销类型', sortable: true, isShow: true },
    { ruleType: '方案状态', isShow: true, sortable: true },
    { createdDate: '创建时间', sortable: true, isShow: true },
    { updatedDate: '修改时间', sortable: true, isShow: false },
    { creator: '创建人', sortable: true, isShow: false },
    { updater: '修改人', sortable: true, isShow: false }
  ]
}
