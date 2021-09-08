/*
 * @Author: fhj
 * @LastEditors: Please set LastEditors
 * @Description: 配置项
 */
import PUBFN from '@/utils/pubFn'

// 状态筛选
export const statusSearchConfig = function() {
  return [
    {
      name: '审批状态',
      key: 'searchStatus1',
      list: [
        { label: '草稿', value: 1, dataKey: 'draftStatistics' },
        { label: '审核中', value: 2, dataKey: 'underReviewStatistics' },
        { label: '审核通过', value: 3, dataKey: 'reviewedStatistics' },
        { label: '已驳回', value: 4, dataKey: 'rejectedStatistics' },
      ]
    }
  ]
}

// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'selectDialog', prop: 'programName', label: '', placeholder: '请选择项目', width: '220px', list: PUBFN.getOptionsList('projectList'), isFirst: true, change: this.inputChange },
  ]
}

// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', width: 65, sortable: true, showFixed: true },
    { programName: '项目名称', sortable: true, isShow: true },
    { standardId: '批次号', sortable: true, isShow: true },
    { checkStatusName: '状态', sortable: true, isShow: true },
    { createUser: '创建人', sortable: true, isShow: true },
    { applyDate: '创建时间', sortable: true, isShow: true }
  ]
}

// 表格左侧文案展示 data为列表接口获取后的数据 取data的某字段作为展示
export const tableDescConfig = function(data) {
  return []
}
