/*
 * @Author: xza
 * @LastEditors: xza
 * @Description: 会计科目配置
 */
import PUBFN from '@/utils/pubFn'
import { accountingSubjectApi } from '@/api'

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
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', isSearch: true, placeholder: '请输入科目编码/科目名称关键字', width: '220px', list: PUBFN.getOptionsList('globalSearchList'), isFirst: true },
    { itemType: 'selectDialog', prop: 'accountName', label: '', placeholder: '请选择账套', width: '200px', list: PUBFN.getOptionsList('subjectType'), isFirst: true },
    { itemType: 'selectDialog', prop: 'subjectType', label: '', placeholder: '请选择类别', width: '200px', list: PUBFN.getOptionsList('subjectType'), isFirst: true }
  ]
}

// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
    { subjectId: '科目编码', sortable: true, isShow: true },
    { subjectName: '科目名称', sortable: true, isShow: true },
    { direction: '余额方向', sortable: true, isShow: true },
    { status: '状态', sortable: true, isShow: true },
    { creatDate: '创建时间', isShow: true, sortable: true },
    { accountName: '账套', isShow: false, sortable: true },
    { thirdPartyId: '三方编码', isShow: false, sortable: true },
    { subjectType: '类别', isShow: false, sortable: true }
  ]
}

// 请求参数
export const searchForm = function() {
  return {
    fuzzyEnquiry: '', // 模糊搜索
    accountName: [], // 套账
    subjectType: [] // 类别
  }
}

// ysn-table额外配置 用于打开checkbox等
export const tableOrderConfig = function() {
  return {
    treeProps: { children: 'children' },
    rowKey: 'id',
    hasChildren: true
  }
}

// 接口请求配置
export const queryConfig = function() {
  return {
    api: accountingSubjectApi.accountingList, // 接口请求方式
    dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
  }
}
