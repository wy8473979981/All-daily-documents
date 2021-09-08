/*
 * @Author: fhj
 * @LastEditors: Please set LastEditors
 * @Description: 配置项
 */
import PUBFN from '@/utils/pubFn'

// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入楼层名称关键字', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'programName', label: '', placeholder: '请选择项目', width: '220px', list: PUBFN.getOptionsList('projectName'), isFirst: true },
    { itemType: 'selectDialog', prop: 'buildingName', label: '', placeholder: '请选择楼栋', width: '220px', list: PUBFN.getOptionsList('allFlo'), isFirst: true }
    // { itemType: 'select', prop: 'programName', label: '', placeholder: '全部项目', width: '220px', list: PUBFN.getOptionsList('projectName'), isFirst: true, change: this.inputChange },
    // { itemType: 'select', prop: 'buildingName', label: '', placeholder: '全部楼栋', width: '220px', list: PUBFN.getOptionsList('allFlo'), isFirst: true, change: this.inputChange },
  ]
}

// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', width: 65, sortable: true, showFixed: true },
    { programName: '所属项目', sortable: true, isShow: true },
    { buildingName: '楼栋名称', sortable: true, isShow: true },
    { floorId: '楼层编码', sortable: true, isShow: true },
    { floorName: '楼层名称', sortable: true, isShow: true },
    { floorGrossArea: '建筑面积(m²)', sortable: true, isShow: true },
    { floorLeasableArea: '计租面积(m²)', sortable: true, isShow: true },
    { floorStatus: '楼层状态', sortable: true, isShow: true }
  ]
}

// 表格左侧文案展示 data为列表接口获取后的数据 取data的某字段作为展示
export const tableDescConfig = function(data) {
  return [
    { text: '建筑面积(m²)', value: data.floorGrossAreaTotal },
    { text: '计租面积(m²)', value: data.floorLeasableAreaTotal }
  ]
}

const mockData = {
  'programName': '项目一',
  'floorId': '123445656',
  'buildingName': '第一楼栋',
  'floorName': '楼层名称',
  'floorStatus': '可租',
  'floorGrossArea': '200',
  'floorLeasableArea': '200',
  'remark': '这是备注',
  'floorPic': [{ 'name': '楼栋图', 'url': 'url' }]
}
