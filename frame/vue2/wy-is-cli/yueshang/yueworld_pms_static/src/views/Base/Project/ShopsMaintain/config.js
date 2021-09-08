/*
 * @Author: fhj
 * @LastEditors: Please set LastEditors
 * @Description: 配置项
 */
import PUBFN from '@/utils/pubFn'

// 搜索配置
export const searchConfig = function () {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入商铺名称关键字', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'programName', label: '', placeholder: '请选择项目', width: '220px', list: PUBFN.getOptionsList('projectName'), isFirst: true },
    { itemType: 'selectDialog', prop: 'buildingName', label: '', placeholder: '请选择楼栋', width: '220px', list: PUBFN.getOptionsList('allFlo') },
    { itemType: 'selectDialog', prop: 'floorName', label: '', placeholder: '请选择楼层', width: '220px', list: PUBFN.getOptionsList('allFlos') },
    { itemType: 'selectDialog', prop: 'spaceType', label: '', placeholder: '请选择商业类型', width: '220px', list: PUBFN.getOptionsList('spaceType') }

    // { itemType: 'select', prop: 'programName', label: '', placeholder: '全部项目', width: '220px', list: PUBFN.getOptionsList('projectName'), isFirst: true, change: this.inputChange },
    // { itemType: 'select', prop: 'buildingName', label: '', placeholder: '全部楼栋', width: '220px', list: PUBFN.getOptionsList('allFlo'), change: this.inputChange },
    // { itemType: 'select', prop: 'floorName', label: '', placeholder: '全部楼层', width: '220px', list: PUBFN.getOptionsList('allFlos'), change: this.inputChange },
    // { itemType: 'select', prop: 'spaceType', label: '', placeholder: '商业类型', width: '220px', list: PUBFN.getOptionsList('spaceType'), change: this.inputChange },
  ]
}

// 状态筛选
export const statusSearchConfig = function () {
  return [
    {
      name: '产权性质',
      key: 'spaceEquityNature',
      list: [
        // { label: '全部', value: 1, dataKey: 'total' },
        { label: '自持', value: 2, dataKey: 'total' },
        { label: '销售返祖', value: 3, dataKey: 'total' },
        { label: '销售不返租', value: 4, dataKey: 'total' }
      ]
    },
    {
      name: '商铺性质',
      key: 'spaceLocation',
      list: [
        // { label: '全部', value: 1, dataKey: 'total' },
        { label: '主力店', value: 2, dataKey: 'total' },
        { label: '次主力店', value: 3, dataKey: 'total' },
        { label: '一般商铺', value: 4, dataKey: 'total' }
      ]
    },
    {
      name: '状态',
      key: 'spaceStatus',
      list: [
        // { label: '全部', value: 1, dataKey: 'total' },
        { label: '新建', value: 2, dataKey: 'total' },
        { label: '合同', value: 3, dataKey: 'total' },
        { label: '开业', value: 4, dataKey: 'total' },
        { label: '空置', value: 5, dataKey: 'total' },
        { label: '失效', value: 6, dataKey: 'total' }
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
    { spaceName: '铺位号', sortable: true, isShow: true },
    { spaceType: '商业类型', sortable: true, isShow: true },
    { spaceGrossArea: '建筑面积(m²)', sortable: true, isShow: true },
    { leasableArea: '计租面积(m²)', sortable: true, isShow: true },
    { spaceStatus: '状态', sortable: true, isShow: true, width: 60, }
  ]
}

// 表格左侧文案展示 data为列表接口获取后的数据 取data的某字段作为展示
export const tableDescConfig = function (data) {
  return [
    { text: '建筑面积(m²)', value: data.spaceGrossAreaTotal },
    { text: '计租面积(m²)', value: data.spaceLeasableAreaTotal }
  ]
}

const mockData = [{
  'spaceId': '45454',
  'programName': '项目一',
  'floorId': '123445656',
  'buildingName': '楼栋一',
  'floorName': '楼层名称',
  'spaceName': '铺位号',
  'spaceType': '铺位类型',
  'spaceGrossArea': '200',
  'leasableArea': '200',
  'spaceStatus': '审核中',
  'spaceEquityNature': '自持',
  'spaceLocation': '主力店',
  'areaType': '建筑面积',
  'spaceNetArea': 200,
  'effectiveDate': '2021-07-30',
  'remark': '备注',
  'spaceFormatNamePlan': '一级业态',
  'brandFormatName': '签约业务',
  'ownerName': '涨涨',
  'ownerContactsName': '菲菲',
  'ownerContactsTel': '12344545566',
  'vacancyRatio': '1',
  'tableDataLogs': [
    {
      'status': '新建',
      'checkStatus': '审核中',
      'reason': '需要审核',
      'version': 'v1.0.0',
      'commentId': '12344545',
      'commentName': '墨念',
      'changeTime': '2021-07-27'
    },
    {
      'status': '新建',
      'checkStatus': '审核中',
      'reason': '需要审核',
      'version': 'v1.0.0',
      'commentId': '12344545',
      'commentName': '墨念',
      'changeTime': '2021-07-27'
    },
    {
      'status': '新建',
      'checkStatus': '审核中',
      'reason': '需要审核',
      'version': 'v1.0.0',
      'commentId': '12344545',
      'commentName': '墨念',
      'changeTime': '2021-07-27'
    },
    {
      'status': '新建',
      'checkStatus': '审核中',
      'reason': '需要审核',
      'version': 'v1.0.0',
      'commentId': '12344545',
      'commentName': '墨念',
      'changeTime': '2021-07-27'
    }
  ],
  'tableData': [
    {
      'standardYear': '2021',
      'standardDeposit': '200',
      'standardDecorationDeposit': '202',
      'standardRentFreePeriod': '20',
      'feeName1': '名称1',
      'feeName2': '名称2'
    }
  ]
}]

