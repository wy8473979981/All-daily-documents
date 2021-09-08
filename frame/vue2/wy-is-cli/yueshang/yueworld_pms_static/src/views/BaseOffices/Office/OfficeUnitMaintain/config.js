/*
 * @Author: fhj
 * @LastEditors: Please set LastEditors
 * @Description: 配置项
 */
import PUBFN from '@/utils/pubFn'


// 搜索配置
export const searchConfig = function () {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入单元号关键字', width: '220px', isSearch: true, isFirst: true },
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
      name: '状态',
      key: 'spaceStatus',
      list: [
        // { label: '全部', value: 1, dataKey: 'total' },
        { label: '新建', value: 2, dataKey: 'total' },
        { label: '合同', value: 3, dataKey: 'total' },
        { label: '空置', value: 4, dataKey: 'total' },
        { label: '失效', value: 5, dataKey: 'total' }
      ]
    }
  ]
}
// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function () {
  return [
    { t0: '序号', type: 'index', width: 65, sortable: true, showFixed: true },
    { programName: '项目', sortable: true, isShow: true },
    { buildingName: '楼栋', sortable: true, isShow: true },
    { floorName: '楼层', sortable: true, isShow: true },
    { officeName: '单元号', sortable: true, isShow: true },
    { officeType: '营运类型', sortable: true, isShow: true },
    { officeGrossArea: '建筑面积(m²)', sortable: true, isShow: true },
    { leasableArea: '计租面积(m²)', sortable: true, isShow: true },
    { officeStatus: '状态', sortable: true, isShow: true, width: 60 },
  ]
}

// 表格左侧文案展示 data为列表接口获取后的数据 取data的某字段作为展示
export const tableDescConfig = function (data) {
  return [
    { text: '建筑面积(m²)', value: data.officeGrossAreaTotal },
    { text: '计租面积(m²)', value: data.officeLeasableAreaTotal }
  ]
}

let mockData = [{
  "spaceId": "45454",
  "programName": "项目一",
  "floorId": "123445656",
  "buildingName": "楼栋一",
  "floorName": "楼层名称",
  "spaceName": "铺位号",
  "spaceType": "铺位类型",
  "officeGrossArea": "200",
  "officeGrossAreaNew": "200",
  "spaceGrossArea": "200",
  "leasableArea": "200",
  "spaceStatus": "审核中",
  "officeEquityNature": "自持",
  "spaceLocation": "主力店",
  "areaType": "建筑面积",
  "spaceNetArea": 200,
  "effectiveDate": "2021-07-30",
  "remark": "备注",
  "spaceFormatNamePlan": "一级业态",
  "brandFormatName": "签约业务",
  "ownerName": "涨涨",
  "ownerContactsName": "菲菲",
  "ownerContactsTel": "12344545566",
  "officeStatus": "合同",
  "officeName": "20202923892839",
  "officeType": "办公",
  "vacancyRatio": "1",
  "officeId": "weuwiei0929",
  "officeNetArea": "200",
  "officeNetAreaNew": "200",
  "officeStatus": "洽谈",
  "tableDataLogs": [
    {
      "status": "新建",
      "checkStatus": "审核中",
      "reason": "需要审核",
      "version": "v1.0.0",
      "commentId": "12344545",
      "commentName": "墨念",
      "changeTime": "2021-07-27"
    },
    {
      "status": "新建",
      "checkStatus": "审核中",
      "reason": "需要审核",
      "version": "v1.0.0",
      "commentId": "12344545",
      "commentName": "墨念",
      "changeTime": "2021-07-27"
    },
    {
      "status": "新建",
      "checkStatus": "审核中",
      "reason": "需要审核",
      "version": "v1.0.0",
      "commentId": "12344545",
      "commentName": "墨念",
      "changeTime": "2021-07-27"
    },
    {
      "status": "新建",
      "checkStatus": "审核中",
      "reason": "需要审核",
      "version": "v1.0.0",
      "commentId": "12344545",
      "commentName": "墨念",
      "changeTime": "2021-07-27"
    }
  ],
  "tableData": [
    {
      "standardYear": "2021",
      "standardDeposit": "200",
      "standardDecorationDeposit": "202",
      "standardRentFreePeriod": "20",
      "feeName1": "名称1",
      "feeName2": "名称2"
    }
  ]
},]