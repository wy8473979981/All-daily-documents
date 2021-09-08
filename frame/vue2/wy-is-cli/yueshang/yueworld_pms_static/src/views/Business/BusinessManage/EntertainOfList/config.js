/*
 * @Author: zsj
 * @Date: 2021-07-03 13:32:10
 * @LastEditTime: 2021-08-07 11:28:54
 * @LastEditors: xueyx
 */
import PUBFN from '@/utils/pubFn'

// 状态筛选
export const statusSearchConfig = function() {
  return [
    {
      name: '招商进度',
      key: 'spaceStatus',
      list: [
        { label: '空铺', value: 1, dataKey: 'emptyStatus' },
        { label: '洽谈', value: 2, dataKey: 'talksStatus' },
        { label: '意向', value: 3, dataKey: 'intentionStatus' },
        { label: '合同', value: 4, dataKey: 'contStatus' },
        { label: '双签', value: 5, dataKey: 'doubleStatus' },
        { label: '进场', value: 6, dataKey: 'enterStatus' },
        { label: '开业', value: 7, dataKey: 'openStatus' }
      ]
    }
  ]
}

// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fileName', label: '', placeholder: '请选择铺位号/品牌名称', width: '220px', isSearch: true, isFirst: true, change: this.store, maxlength: 20 },
    { itemType: 'selectDialog', prop: 'programName', multiple: true, label: '', placeholder: '请选择项目', width: '220px', list: PUBFN.getOptionsList('allProject'), isFirst: true },
    { itemType: 'select', prop: 'buildingName', label: '', placeholder: '请选择楼栋', width: '200px', list: PUBFN.getOptionsList('floor2'), change: this.build },
    { itemType: 'select', prop: 'floorName', label: '', placeholder: '请选择楼层', width: '200px', list: PUBFN.getOptionsList('floor1'), change: this.floor }
  ]
}

// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
    { programName: '项目', sortable: true, isShow: true },
    { buildingName: '楼栋', sortable: true, isShow: true },
    { floorName: '楼层', sortable: true, isShow: true },
    { spaceName: '铺位号', sortable: true, isShow: true },
    { spaceGrossArea: '建筑面积(m²)', isShow: true, sortable: true, width: 140 },
    { leasableArea: '计租面积(m²)', isShow: true, sortable: true, width: 140 },
    { spaceStatus: '招商进度', isShow: true, sortable: true, width: 140 },
    { creator: '创建人', isShow: false, sortable: true, width: 140 },
    { createTime: '创建时间', isShow: false, sortable: true, width: 140 },
    { Modifier: '修改人', sortable: true, isShow: false },
    { updateTime: '修改时间', sortable: true, isShow: false }
  ]
}

// 表格左侧文案展示 data为列表接口获取后的数据 取data的某字段作为展示
// export const tableDescConfig = function(data) {
//   return [
//     { text: '总计租面积(m²)', value: data.total },
//     { text: '当前页固定租金总金额(万元)', value: data.total },
//     { text: '全部页固定租金总金额(万元)', value: data.total }
//   ]
// }
