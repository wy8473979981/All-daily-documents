/*
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
 */
import PUBFN from '@/utils/pubFn'

// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'select', prop: 'programName', label: '', placeholder: '全部项目', width: '220px', list: PUBFN.getOptionsList('globalSearchList'), isFirst: true, change: this.inputChange }
  ]
}

// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { id: '序号', type: 'index', showFixed: true },
    { programName: '项目名称', sortable: true, isShow: true, width: 300 },
    { customerFlowEntryTotal: '总入场客流(万人)', sortable: true, width: 300, isShow: true },
    { customerFlowExitTotal: '总出场客流(万人)', sortable: true, width: 300, isShow: true },
    { lastModificationTime: '最新录入时间', sortable: true, isShow: true }
  ]
}
