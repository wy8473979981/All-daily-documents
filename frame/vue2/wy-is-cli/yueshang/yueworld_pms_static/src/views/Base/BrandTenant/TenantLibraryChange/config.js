/*
 * @Author: shuyuan
 * @LastEditors: shuyuan
 * @Description: 商家变更列表
 */
import PUBFN from '@/utils/pubFn'

// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入商家名称关键字', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'programName', label: '', placeholder: '请选择项目', width: '200px', list: PUBFN.getOptionsList('projectList'), isFirst: true, multiple: true },
    { itemType: 'selectDialog', prop: 'tenantType', label: '', placeholder: '请选择商家性质', width: '200px', list: PUBFN.getOptionsList('tenantType'), isFirst: false, multiple: true },
    { itemType: 'selectDialog', prop: 'tenantCompanyQuailty', label: '', placeholder: '请选择商家属性', width: '200px', list: PUBFN.getOptionsList('tenantCompanyQuailty'), isFirst: false, multiple: true }
  ]
}

// 状态筛选
export const statusSearchConfig = function() {
  return [
    {
      name: '审核状态',
      key: 'checkStatusName',
      list: [
        { label: '草稿', value: 1, dataKey: 'draftStatistics' },
        { label: '审核中', value: 2, dataKey: 'underReviewStatistics' },
        { label: '审核通过', value: 3, dataKey: 'reviewedStatistics' },
        { label: '已驳回', value: 4, dataKey: 'rejectedStatistics' }
      ]
    }
  ]
}

// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { id: '序号', type: 'index', width: 65, sortable: true, showFixed: true },
    { programName: '所属项目', sortable: true, isShow: true },
    { tenantId: '商家编码', sortable: true, isShow: true },
    { tenantName: '商家名称', sortable: true, isShow: true },
    { tenantType: '商家性质', sortable: true, isShow: true },
    { changes: '变更内容', sortable: true, isShow: true },
    { checkStatusName: '审核状态', sortable: true, isShow: true },
    { applyDate: '发起时间', sortable: true, isShow: true },
    { completeDate: '审核结束时间', sortable: true, isShow: true },
    { tenantCompanyQuailty: '商家属性', sortable: true, isShow: false },
    { tenantTaxpayerType: '纳税人类型', sortable: true, isShow: false }
  ]
}
