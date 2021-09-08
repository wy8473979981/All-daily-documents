/*
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 配置项
 */
import PUBFN from '@/utils/pubFn'
import { getOptionsLabel } from '@/filters/index'

// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入商铺名称关键字', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'programName', label: '', placeholder: '请选择项目', width: '220px', list: PUBFN.getOptionsList('projectName'), isFirst: true },
    { itemType: 'selectDialog', prop: 'buildingName', label: '', placeholder: '请选择楼栋', width: '220px', list: PUBFN.getOptionsList('allFlo') },
    { itemType: 'selectDialog', prop: 'floorName', label: '', placeholder: '请选择楼层', width: '220px', list: PUBFN.getOptionsList('allFlos') }
  ]
}

// 状态筛选
export const statusSearchConfig = function() {
  return [
    {
      name: '多经状态',
      key: 'diverseStatus',
      list: [
        { label: '新建', value: 1, dataKey: 'diverseStatus01' },
        { label: '合同', value: 2, dataKey: 'diverseStatus02' },
        { label: '空置', value: 3, dataKey: 'diverseStatus03' },
        { label: '失效', value: 4, dataKey: 'diverseStatus04' }
      ]
    },
    {
      name: '多经类型',
      key: 'diverseType',
      list: [
        { label: '固定点位', value: 1, dataKey: 'diverseType01' },
        { label: '临时点位', value: 2, dataKey: 'diverseType02' },
        { label: '营销点位', value: 3, dataKey: 'diverseType03' },
        { label: '宣传点位', value: 4, dataKey: 'diverseType04' },
        { label: '仓库点位', value: 5, dataKey: 'diverseType05' },
        { label: '其他点位', value: 6, dataKey: 'diverseType06' }
      ]
    }
  ]
}
// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置

export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', width: 65, sortable: true, showFixed: true },
    { programName: '项目名称', sortable: true, isShow: true, showFixed: true, formatter: row => getOptionsLabel(row.programName, 'projectName') },
    { buildingName: '楼栋', sortable: true, isShow: true, showFixed: true, formatter: row => getOptionsLabel(row.buildingName, 'allFlo') },
    { floorName: '楼层', sortable: true, isShow: true, showFixed: true, formatter: row => getOptionsLabel(row.floorName, 'allFlos') },
    { diverseName: '多经名称', sortable: true, isShow: true, showFixed: true },
    { diverseType: '多经类型', sortable: true, isShow: true, formatter: row => getOptionsLabel(row.diverseType, 'diverseType') },
    { leasableArea: '计租面积(m²)', sortable: true, isShow: true, showFixed: true, type: 'number' },
    { diverseStatus: '状态', sortable: true, isShow: true, showFixed: true, formatter: row => getOptionsLabel(row.diverseStatus, 'diverseStatus') },
    { diverseId: '多经编码', sortable: true }
  ]
}

// 表格左侧文案展示 data为列表接口获取后的数据 取data的某字段作为展示
export const tableDescConfig = function(data) {
  return [
    { text: '计租面积(m²)', value: data.leasableAreaTotal }
  ]
}
