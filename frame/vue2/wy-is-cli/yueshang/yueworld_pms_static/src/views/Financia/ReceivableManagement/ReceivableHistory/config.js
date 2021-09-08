/*
 * @Author: xza
 * @LastEditors: xueyx
 * @Description: 费用项配置
 */
import PUBFN from '@/utils/pubFn'
// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', multiple: true, label: '', placeholder: '请输入合同编号/商家/企业/品牌', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'programName', multiple: true, label: '', placeholder: '请选择项目', width: '200px', list: PUBFN.getOptionsList('allProject'), isFirst: true },
    { itemType: 'datePicker', prop: 'receivableTime', label: '', type: 'daterange', width: '246px', startPlaceholder: '生成时间起', endPlaceholder: '生成时间止', rangeSeparator: '~', isFirst: true }
  ]
}
// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
    { billNo: '账单编号', isShow: true, sortable: true, label: '' },
    { programName: '项目名称', isShow: true, sortable: true, label: '' },
    { tenantName: '商家/企业', isShow: true, sortable: true, label: '' },
    { operationPersonnel: '操作人员', isShow: true, sortable: true, label: '' },
    { printTime: '打印时间', isShow: true, sortable: true, label: '' },
    { caozuo: '操作', isShow: true, sortable: true }
  ]
}

