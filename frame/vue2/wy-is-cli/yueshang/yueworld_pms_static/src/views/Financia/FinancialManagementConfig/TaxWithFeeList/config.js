/*
 * @Author: xza
 * @Date: 2021-07-28 11:17:42
 * @LastEditTime: 2021-08-23 16:17:07
 * @LastEditors: xza
 * @Description: 税率-费项关系配置
 * @FilePath: /baolong/src/views/Financia/FinancialManagementConfig/TaxWithFeeList/config.js
 */

import { taxModuleListApi } from '@/api'

// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', multiple: true, label: '', placeholder: '请输入费项名称', width: '220px', isSearch: true, isFirst: true }
  ]
}

// 表格配置
export const formTableConfig = function() {
  return [
    { t0: '序号', type: 'index', required: false, showFixed: true },
    { feeName: '费项名称', itemType: 'text', required: false, width: 500, isShow: true },
    { taxInfo: '税率类型', itemType: 'select', required: false, width: 300, isShow: true, list: this.$PUBFN.getOptionsList('FeeSubject'), change: this.rat }
  ]
}

// 左侧列表配置
export const leftConfig = function() {
  return {
    title: '项目', // 大标题
    subTitle: '', // 副标题
    topBtn: true, // 进阶配置
    dataList: this.$PUBFN.getOptionsList('freeRelationship')
  }
}

// 搜索form
export const searchForm = function() {
  return {
    fuzzyEnquiry: '', // 模糊搜索
    programName: '' // 项目
  }
}

// 接口请求配置
export const queryConfig = function() {
  return {
    api: taxModuleListApi.taxModuleFee, // 接口请求方式
    dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
  }
}
