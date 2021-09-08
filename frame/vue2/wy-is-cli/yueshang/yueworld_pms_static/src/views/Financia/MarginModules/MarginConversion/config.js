/*
 * @Author: xza
 * @LastEditors: xza
 * @Description: 保证金转换单配置
 */
import PUBFN from '@/utils/pubFn'
import { marginConversionApi } from '@/api/marginConversion'

// 状态筛选
export const statusSearchConfig = function() {
  return [
    {
      name: '审核状态',
      key: 'checkStatus',
      list: [
        { label: '草稿', value: 1, dataKey: 'checkStatus01' },
        { label: '审核中', value: 2, dataKey: 'checkStatus02' },
        { label: '审核通过', value: 3, dataKey: 'checkStatus03' },
        { label: '已驳回', value: 4, dataKey: 'checkStatus04' }
      ]
    }
  ]
}
// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入转换单号/转入合同编号/转出商家/转入商家', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'programName', label: '', placeholder: '全部项目', width: '200px', list: PUBFN.getOptionsList('allProject'), isFirst: true },
    { itemType: 'datePicker', prop: 'conversionDate', label: '', type: 'daterange', width: '236px', startPlaceholder: '转换日期起', endPlaceholder: '转换日期止', rangeSeparator: '~' },
    { itemType: 'input', prop: 'creator', label: '', placeholder: '请输入创建人', width: '200px' }
  ]
}
// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
    { conversionNo: '转换单号', sortable: true, isShow: true, showFixed: true, width: 140 },
    { programName: '项目', sortable: true, isShow: true },
    { outTenantName: '转出商家', sortable: true, isShow: true },
    { inTenantName: '转入商家', sortable: true, isShow: true },
    { inContNo: '转入合同编号', isShow: true, sortable: true },
    { amount: '转换金额(元)', isShow: true, sortable: true, type: 'money' },
    { checkStatus: '审核状态', isShow: true, sortable: true },
    { creator: '创建人', isShow: true, sortable: true },
    { ConversionDate: '转换日期', isShow: true, sortable: true },
    { createTime: '创建时间', isShow: false, sortable: true },
    { Modifier: '修改人', isShow: false, sortable: true },
    { updateTime: '修改时间', isShow: false, sortable: true }
  ]
}
// 表格左侧文案展示 data为列表接口获取后的数据 取data的某字段作为展示
export const tableDescConfig = function() {
  return [
    { text: '当前页转换金额(万元)', value: 24.3 },
    { text: '全部页转换金额(万元)', value: 24.3 }
  ]
}

// 搜索配置
export const searchForm = function() {
  return {
    fuzzyEnquiry: '', // 模糊搜索
    programName: [], // 全部项目
    ConversionDate: [], // 转换日期
    creator: '' // 创建人
  }
}

// 请求接口配置
export const queryConfig = function() {
  return {
    api: marginConversionApi.marginConversionList, // 接口请求方式
    dataKey: 'list', // 取请求接口后返回的某个字段作为表单数据 默认data
    deleteApi: marginConversionApi.marginConversionDelete // 批量删除
  }
}

// ysn-table额外配置 用于打开checkbox等
export const tableOrderConfig = function() {
  return {
    checkbox: true // 继承el-table所有属性,ysn-table的属性
  }
}
