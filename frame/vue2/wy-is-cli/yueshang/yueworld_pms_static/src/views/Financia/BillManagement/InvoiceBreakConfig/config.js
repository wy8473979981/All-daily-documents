
import PUBFN from '@/utils/pubFn'
import { getOptionsLabel } from '@/filters/index'

// 状态筛选
export const statusSearchConfig = function() {
  return [
    {
      name: '级别',
      key: 'levelId',
      dataKey: 'statusCount',
      list: PUBFN.getOptionsList('levelId')
    }
  ]
}

// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '规则编号/名称', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'programName', multiple: true, label: '', placeholder: '所有项目', width: '200px', list: PUBFN.getOptionsList('projectName'), isFirst: true },
    { itemType: 'selectDialog', prop: 'accountName', multiple: true, label: '', placeholder: '所有账套', width: '200px', list: PUBFN.getOptionsList('subjectRelationFee'), isFirst: true }
  ]
}

// 列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
    { ruleId: '规则编号', sortable: true, isShow: true },
    { ruleName: '名称', sortable: true, isShow: true },
    { levelId: '级别', sortable: true, isShow: true, formatter: row => getOptionsLabel(row.levelId, PUBFN.getOptionsList('levelId')) },
    { accountName: '账套', sortable: true, isShow: true, formatter: row => getOptionsLabel(row.accountName, PUBFN.getOptionsList('subjectRelationFee')) },
    { programName: '项目', isShow: true, sortable: true, formatter: row => getOptionsLabel(row.programName, PUBFN.getOptionsList('projectName')) },
    { creator: '创建人', sortable: true, isShow: true, width: '110px' },
    { createdDate: '创建时间', sortable: true, isShow: true, width: '110px' },
    { updater: '更新人', isShow: true, sortable: true, width: '110px' },
    { updated: '更新时间', isShow: true, sortable: true, width: '110px' }
  ]
}
