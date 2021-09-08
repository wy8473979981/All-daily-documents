/*
 * @Author: fhj
 * @LastEditors: Please set LastEditors
 * @Description: 配置项
 */
import PUBFN from '@/utils/pubFn'


// 搜索配置
export const searchConfig = function () {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入楼栋关键字', width: '220px', isSearch: true, isFirst: true },
    // { itemType: 'select', prop: 'programName', label: '', placeholder: '全部项目', width: '220px', list: PUBFN.getOptionsList('projectName'), isFirst: true, change: this.inputChange },
    { itemType: 'selectDialog', prop: 'programName', label: '', placeholder: '全部项目', width: '220px', list: PUBFN.getOptionsList('projectName'), isFirst: true, },
  ]
}

// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function () {
  return [
    { t0: '序号', type: 'index', width: 65, sortable: true, showFixed: true },
    { programName: '所属项目', sortable: true, isShow: true },
    { buildingId: '楼栋编码', sortable: true, isShow: true },
    { buildingName: '楼栋名称', sortable: true, isShow: true },
    { buildingGrossArea: '建筑面积(m²)', sortable: true, isShow: true },
    { buildingLeasableArea: '计租面积(m²)', sortable: true, isShow: true },
    { buildingStatus: '楼栋状态', sortable: true, isShow: true },
  ]
}

// 表格左侧文案展示 data为列表接口获取后的数据 取data的某字段作为展示
export const tableDescConfig = function (data) {
  return [
    { text: '建筑面积(m²)', value: data.buildingGrossAreaTotal },
    { text: '计租面积(m²)', value: data.buildingLeasableAreaTotal }
  ]
}

let mockData = {
  "programName": "项目一",
  "buildingId": "123445656",
  "buildingName": "第一楼栋",
  "buildingStatus": "可租",
  "buildingGrossArea": 200,
  "buildingLeasableArea": 200,
  "buildingFloorAboveGround": 10,
  "buildingFloorUnderground": 10,
  "remark": "这是备注",
  "buildingPic": [{ name: "楼栋图", url: "url" }],
  "buildingGrossAreaTotal": 400,
  "buildingLeasableAreaTotal": 400
}