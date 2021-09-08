/*
 * @Author: shuyuan
 * @LastEditors: shuyuan
 * @Description:车流数据填报
*/
import PUBFN from '@/utils/pubFn'

// 搜索配置
export const searchConfig = function() {
  console.log('this', this)
  return [
    {
      itemType: 'selectDialog',
      prop: 'programName',
      multiple: true,
      label: '',
      placeholder: '请选择项目',
      width: '220px',
      list: PUBFN.getOptionsList('projectList'),
      isFirst: true,
      change: this.proName
    }
  ]
}

// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { id: '序号', type: 'index', sortable: true, fixed: true, showFixed: true },
    { programName: '项目名称', sortable: true, isShow: true },
    { trafficFlowEntryTotal: '总入场车流(辆)', sortable: true, isShow: true, type: 'number', decimal: 0 },
    { trafficFlowExitTotal: '总出场车流(辆)', sortable: true, isShow: true, type: 'number', decimal: 0 },
    { lastModificationTime: '最新录入时间', sortable: true, isShow: true }
  ]
}
