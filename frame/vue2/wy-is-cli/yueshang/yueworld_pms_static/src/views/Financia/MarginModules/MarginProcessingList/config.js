/*
 * @Author: xiaoxie
 * @Date: 2021-07-19 11:29:01
 * @Last Modified by: xiaoxie
 * @Last Modified time: 2021-08-27 11:24:54
 */
import PUBFN from '@/utils/pubFn'
// 审批状态
export const statusSearchConfig = function() {
  return [
    {
      name: '审批状态',
      key: 'checkStatus',
      list: [
        { label: '草稿', value: 1, dataKey: 'checkStatus01' },
        { label: '审核中', value: 2, dataKey: 'checkStatus02' },
        { label: '审核通过', value: 3, dataKey: 'checkStatus03' },
        { label: '已驳回', value: 4, dataKey: 'checkStatus04' }
      ]
    },
    {
      name: '处理类型',
      key: 'handleType',
      list: [
        { label: '退款', value: 1, dataKey: 'handleType01' },
        { label: '罚没', value: 2, dataKey: 'handleType02' },
        { label: '申请冲抵', value: 3, dataKey: 'handleType03' }
      ]
    }
  ]
}
// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入处理单号/意向/合同编号/商家名称/品牌名称', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'programName', multiple: true, label: '', placeholder: '请选择项目', width: '220px', list: PUBFN.getOptionsList('allProject'), isFirst: true },
    { itemType: 'datePicker', prop: 'createTime', label: '', startPlaceholder: '创建时间起', endPlaceholder: '创建时间止', rangeSeparator: '~', type: 'daterange', width: '220px', valueFormat: 'yyyy-MM-dd' },
    { itemType: 'input', prop: 'creator', label: '', placeholder: '请输入创建人', width: '220px' }
  ]
}
// 列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', sortable: true, showFixed: true },
    { marginNo: '处理单号', sortable: true, isShow: true, showFixed: true },
    { programName: '项目', sortable: true, isShow: true },
    { contNo: '意向/合同编号', sortable: true, isShow: true },
    { tenantName: '商家', sortable: true, isShow: true },
    { brandName: '品牌', isShow: true, sortable: true },
    { amount: '处理金额(元)', sortable: true, isShow: true, type: 'money' },
    { handleTypeText: '处理类型', sortable: true, isShow: true },
    { checkStatusText: '审核状态', sortable: true, isShow: true },
    { creator: '创建人', sortable: true, isShow: true },
    { createTime: '创建时间', sortable: true, isShow: true },
    { Modifier: '修改人', sortable: true, isShow: false },
    { updateTime: '修改时间', sortable: true, isShow: false }
  ]
}
// 表格左侧文案展示 data为列表接口获取后的数据 取data的某字段作为展示
export const tableDescConfig = function(data) {
  return [
    { text: '当前页处理金额(元)', value: data.pageTotal },
    { text: '全部页处理金额(元)', value: data.allTotal }
  ]
}
