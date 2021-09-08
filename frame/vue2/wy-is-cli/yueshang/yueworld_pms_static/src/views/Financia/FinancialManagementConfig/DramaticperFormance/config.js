/*
 * @Author: xza
 * @Date: 2021-08-10 14:15:36
 * @LastEditTime: 2021-08-23 16:18:23
 * @LastEditors: xza
 * @Description: 滞纳金配置
 * @FilePath: /baolong/src/views/Financia/FinancialManagementConfig/DramaticperFormance/config.js
 */

import { dramaticperFormanceApi } from '@/api'

// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入费项名称关键字', width: '220px', isSearch: true, isFirst: true }
  ]
}

// 表格配置
export const formTableConfig = function() {
  return [
    { t0: '序号', type: 'index', required: false, showFixed: true },
    { feeName: '费项名称', itemType: 'text', required: false, width: 300, isShow: true },
    { ratios: '比例（%）', itemType: 'input', inputType: 'Number', required: false, width: 200, isShow: true, type: 'number', align: 'right', listeners: { input: this.rat }},
    { delayDayss: '宽限天数', itemType: 'input', inputType: 'Number', type: 'number', required: false, width: 300, isShow: true, listeners: { input: this.rat }}
  ]
}

// 左侧列表配置
// 表格配置
export const leftConfig = function() {
  return {
    title: '项目', // 大标题
    subTitle: '', // 副标题
    topBtn: false, // 进阶配置
    dataList: this.$PUBFN.getOptionsList('freeRelationship')
  }
}

// 接口请求配置
export const queryConfig = function() {
  return {
    api: dramaticperFormanceApi.dramaticperFormanceList, // 接口请求方式
    dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
  }
}

// 搜索请求参数
export const searchForm = function() {
  return {
    fuzzyEnquiry: '', // 模糊查询
    programName: '' // 项目
  }
}
