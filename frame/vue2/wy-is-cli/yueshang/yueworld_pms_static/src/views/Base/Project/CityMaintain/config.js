/*
 * @Author: fhj
 * @LastEditors: Please set LastEditors
 * @Description: 配置项
 */
import PUBFN from '@/utils/pubFn'

// 搜索配置
export const searchConfig = function () {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入城市名称', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'regionName', label: '', placeholder: '请选择区域', width: '220px', list: PUBFN.getOptionsList('areaList'), isFirst: true, },
    // { itemType: 'select', prop: 'regionName', label: '', placeholder: '请选择区域', width: '220px', list: PUBFN.getOptionsList('areaList'), isFirst: true, change: this.inputChange }
  ]
}

// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function () {
  return [
    { t0: '序号', type: 'index', width: 65, sortable: true, showFixed: true },
    { cityId: '城市编码', sortable: true, isShow: true },
    { regionName: '所属区域', sortable: true, isShow: true },
    { cityName: '城市名称', sortable: true, isShow: true },
    { cityStatusName: '状态', sortable: true, isShow: true },
    { cityCreateDate: '创建时间', sortable: true, isShow: true }
  ]
}

