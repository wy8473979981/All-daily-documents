/*
 * @Author: xza
 * @LastEditors: Please set LastEditors
 * @Description: 关账配置
 */
import PUBFN from '@/utils/pubFn'
import { closingConfigurationApi } from '@/api'

// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'selectDialog', prop: 'programName', label: '', placeholder: '请选择项目', width: '220px', isSearch: true, isFirst: true, list: PUBFN.getOptionsList('allProject') }
  ]
}

// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
    { programNameShort: '项目', sortable: true, isShow: true },
    { programName: '项目全称', sortable: true, isShow: true }
  ]
}

// ysn-table额外配置 用于打开checkbox等
export const tableOrderConfig = function() {
  return {
    checkbox: false // 继承el-table所有属性,ysn-table的属性
  }
}

// 接口请求配置
export const queryConfig = function() {
  return {
    api: closingConfigurationApi.closingConfigurationList, // 接口请求方式
    dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
  }
}

// 搜索请求参数
export const searchForm = function() {
  return {
    programName: [] // 项目
  }
}
