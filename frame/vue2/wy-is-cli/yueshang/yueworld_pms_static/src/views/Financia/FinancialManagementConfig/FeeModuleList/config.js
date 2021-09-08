/*
 * @Author: xza
 * @LastEditors: xza
 * @Description: 费用项配置
 */
import PUBFN from '@/utils/pubFn'
import { feeApi } from '@/api'

// 状态筛选
export const statusSearchConfig = function() {
  return [
    {
      name: '状态',
      key: 'status',
      list: [
        { label: '正常', value: 1, dataKey: 'status01' },
        { label: '已失效', value: 2, dataKey: 'status02' }
      ]
    }
  ]
}
// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', multiple: true, label: '', placeholder: '请输入费项编码/费项名称关键字', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'feeType', multiple: true, label: '', placeholder: '请选择类别', width: '200px', list: PUBFN.getOptionsList('feeType'), isFirst: true },
    { itemType: 'selectDialog', prop: 'feeNature', multiple: true, label: '', placeholder: '请选择性质', width: '200px', list: PUBFN.getOptionsList('allDiscriminator'), isFirst: true }
  ]
}
// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
    { feeId: '费项编码', sortable: true, isShow: true },
    { feeName: '费项名称', sortable: true, isShow: true },
    { feeType: '类别', sortable: true, isShow: true },
    { feeNature: '性质', sortable: true, isShow: true },
    { status: '状态', isShow: true, sortable: true },
    { creatDate: '创建时间', isShow: true, sortable: true },
    { thirdPartyId: '三方编码', isShow: false, sortable: true }
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
    api: feeApi.feeList, // 接口请求方式
    dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
  }
}

// 搜索请求参数
export const searchForm = function() {
  return {
    fuzzyEnquiry: '', // 模糊搜索
    feeType: [], // 类别
    feeNature: [] // 性质
  }
}
