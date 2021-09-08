/*
 * @Author: fhj
 * @LastEditors: Please set LastEditors
 * @Description: 配置项
 */
import PUBFN from '@/utils/pubFn'

// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入编码，区域名称', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'select', prop: 'regionStatus', label: '', placeholder: '所有状态', width: '220px', list: PUBFN.getOptionsList('auditStatussec'), isFirst: true, change: this.inputChange }
  ]
}

// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', width: 65, sortable: true, showFixed: true },
    { regionId: '区域编码', sortable: true, isShow: true },
    { regionName: '区域名称', sortable: true, isShow: true },
    { regionStatusName: '状态', sortable: true, isShow: true },
    { regionCreateDate: '创建时间', sortable: true, isShow: true }
  ]
}

