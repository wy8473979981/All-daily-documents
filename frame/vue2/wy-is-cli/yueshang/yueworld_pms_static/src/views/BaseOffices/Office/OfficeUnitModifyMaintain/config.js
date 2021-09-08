/*
 * @Author: fhj
 * @LastEditors: Please set LastEditors
 * @Description: 配置项
 */
import PUBFN from '@/utils/pubFn'


// 搜索配置
export const searchConfig = function () {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入楼栋/楼层/单元关键字', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'programName', label: '', placeholder: '全部项目', width: '220px', list: PUBFN.getOptionsList('projectName'), isFirst: true, },
    { itemType: 'selectDialog', prop: 'buildingName', label: '', placeholder: '全部楼栋', width: '220px', list: PUBFN.getOptionsList('allFlo') },
    { itemType: 'selectDialog', prop: 'floorName', label: '', placeholder: '全部楼层', width: '220px', list: PUBFN.getOptionsList('allFlos') },
    // { itemType: 'selectDialog', prop: 'officeName', label: '', placeholder: '单元号', width: '220px', list: PUBFN.getOptionsList('spaceType') },

    // { itemType: 'select', prop: 'programName', label: '', placeholder: '全部项目', width: '220px', list: PUBFN.getOptionsList('projectName'), isFirst: true, change: this.inputChange },
    // { itemType: 'select', prop: 'buildingName', label: '', placeholder: '全部楼栋', width: '220px', list: PUBFN.getOptionsList('allFlo'), change: this.inputChange },
    // { itemType: 'select', prop: 'floorName', label: '', placeholder: '全部楼层', width: '220px', list: PUBFN.getOptionsList('allFlos'), change: this.inputChange },
    // { itemType: 'select', prop: 'officeName', label: '', placeholder: '单元号', width: '220px', list: PUBFN.getOptionsList('spaceType'), change: this.inputChange },
  ]
}

// 状态筛选
export const statusSearchConfig = function () {
  return [
    {
      name: '审核状态',
      key: 'checkStatus',
      list: [
        { label: '草稿', value: 2, dataKey: 'total' },
        { label: '审核中', value: 3, dataKey: 'total' },
        { label: '审核通过', value: 4, dataKey: 'total' },
        { label: '已驳回', value: 5, dataKey: 'total' },
      ]
    }
  ]
}
// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function () {
  return [
    // { t0: '序号', type: 'index', width: 65, sortable: true, showFixed: true },
    { programName: '项目', sortable: true, isShow: true },
    { buildingName: '楼栋', sortable: true, isShow: true },
    { floorName: '楼层', sortable: true, isShow: true },
    { officeName: '单元号', sortable: true, isShow: true },
    { officeId: '单元编码', sortable: true, isShow: true },
    { officeGrossArea: '原建筑面积(m²)', sortable: true, isShow: true, width: 128 },
    { officeGrossAreaNew: '新建筑面积(m²)', sortable: true, isShow: true, width: 128 },
    { officeNetArea: '原套内面积(m²)', sortable: true, isShow: true, width: 128 },
    { officeNetAreaNew: '新套内面积(m²)', sortable: true, isShow: true, width: 128 },
    { checkStatusName: '审核状态', sortable: true, isShow: true },
    { applyDate: '发起时间', sortable: true, isShow: true, width: 100 },
    { completeDate: '审核结束时间', sortable: true, isShow: true, width: 110 },
  ]
}


let mockData = [{
  "officeId": "45454",
  "programName": "项目一",
  "floorId": "123445656",
  "buildingName": "楼栋一",
  "floorName": "楼层名称",
  "spaceName": "铺位号",
  "spaceType": "铺位类型",
  "officeGrossArea": 200,
  "officeGrossAreaNew": 300,
  "leasableArea": "200",
  "spaceStatus": "审核中",
  "spaceEquityNature": "自持",
  "spaceLocation": "主力店",
  "areaType": "建筑面积",
  "officeNetArea": 200,
  "officeNetAreaNew": 300,
  "effectiveDate": "2021-07-30",
  "remark": "备注",
  "checkStatus": "审核中",
  "spaceFormatNamePlan": "一级业态",
  "brandFormatName": "签约业务",
  "ownerName": "涨涨",
  "ownerContactsName": "菲菲",
  "ownerContactsTel": "12344545566",
  "vacancyRatio": "1",
  "applyDate": "2021-07-28",
  "completeDate": "2021-07-28",
  "officeName": "sdsdsdo39839",
  "officeType": "办公",
  "officeEquityNature": "自持",
  "officeStatus": "合同",
},]