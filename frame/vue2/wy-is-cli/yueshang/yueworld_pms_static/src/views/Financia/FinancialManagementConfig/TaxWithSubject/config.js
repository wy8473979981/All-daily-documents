/*
 * @Author: xza
 * @Date: 2021-07-21 14:22:13
 * @LastEditTime: 2021-08-23 16:16:44
 * @LastEditors: xza
 * @Description: 税率科目关系配置
 * @FilePath: /baolong/src/views/Financia/FinancialManagementConfig/TaxWithSubject/config.js
 */

import { taxModuleListApi } from '@/api'

// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', multiple: true, label: '', placeholder: '请输入税率名称/科目名称关键字', width: '220px', isSearch: true, isFirst: true }
  ]
}
// 表格配置
export const formTableConfig = function() {
  return [
    { t0: '序号', type: 'index', required: false, showFixed: true },
    { taxInfo: '税率', itemType: 'text', required: false, width: 500, isShow: true },
    { subjectInfo: '科目类型', itemType: 'select', required: false, width: 300, isShow: true, list: this.$PUBFN.getOptionsList('subjectKind'), change: this.rat }
  ]
}

// 左侧列表配置
export const leftConfig = function() {
  return {
    title: '账套', // 大标题
    subTitle: '', // 副标题
    topBtn: false, // 进阶配置
    dataList: this.$PUBFN.getOptionsList('subjectZang')
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
    api: taxModuleListApi.taxModuleSubject, // 接口请求方式
    dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
  }
}
