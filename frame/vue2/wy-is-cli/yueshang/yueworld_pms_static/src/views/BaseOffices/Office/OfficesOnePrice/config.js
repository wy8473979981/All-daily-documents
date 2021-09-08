/*
 * @Author: fhj
 * @LastEditors: Please set LastEditors
 * @Description: 配置项
 */
import PUBFN from '@/utils/pubFn'

// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入楼栋/楼层/商铺', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'programName', label: '', placeholder: '请选择项目', width: '220px', list: PUBFN.getOptionsList('projectList'), isFirst: true, change: this.inputChange },
    { itemType: 'select', prop: 'buildingName', label: '', placeholder: '请选择楼栋', width: '200px', list: PUBFN.getOptionsList('floor2'), change: this.inputChange },
    { itemType: 'select', prop: 'floorName', label: '', placeholder: '请选择楼层', width: '200px', list: PUBFN.getOptionsList('floor1'), change: this.inputChange },
    { itemType: 'select', prop: 'decorateStartDates', label: '', width: '200px', placeholder: '请选择开始年度', list: PUBFN.getOptionsList('yearSelectList') },
    { itemType: 'select', prop: 'decorateEndDates', label: '', width: '200px', placeholder: '请选择结束年度', list: PUBFN.getOptionsList('yearSelectList') },
    { itemType: 'select', prop: 'officeName', label: '', placeholder: '单元名称', width: '200px', list: PUBFN.getOptionsList('projectList'), change: this.inputChange },
    // { itemType: 'datePicker', prop: 'decorateEndDates', label: '', type: 'daterange', width: '323px', span: 12, placeholder: '开始年度~结束年度' }
  ]
}

// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', width: 65, sortable: true, showFixed: true },
    { standardYear: '标准年度', sortable: true, isShow: true },
    { programName: '项目', sortable: true, isShow: true },
    { buildingName: '楼栋', sortable: true, isShow: true },
    { floorName: '楼层', sortable: true, isShow: true },
    { officeName: '单元号', sortable: true, isShow: true }, // todo:待确定
    { detail: '详情', sortable: true, isShow: true, width: 300 }
  ]
}

// 表格左侧文案展示 data为列表接口获取后的数据 取data的某字段作为展示
export const tableDescConfig = function(data) {
  return []
}
