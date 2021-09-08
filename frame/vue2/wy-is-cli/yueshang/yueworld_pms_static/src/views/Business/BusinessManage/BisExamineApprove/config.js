/*
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description: 配置项
 */
import PUBFN from '@/utils/pubFn'
import { getOptionsLabel } from '@/filters/index'

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
const list = [
  { label: '草稿', value: 1 },
  { label: '审核中', value: 2 },
  { label: '审核通过', value: 3 },
  { label: '已驳回', value: 4 }
]
// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入租赁区域/品牌名称/商家名称/合同编号', width: '220px', isSearch: true, isFirst: true }, { itemType: 'selectDialog', prop: 'programName', multiple: true, label: '', placeholder: '请选择项目', width: '200px', list: PUBFN.getOptionsList('allProject'), isFirst: true }
  ]
}
// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
    { renterOpenNo: '开业审批编号', sortable: true, isShow: true },
    { programName: '项目', sortable: true, isShow: true },
    { tenantName: '商家', sortable: true, isShow: true },
    { brandName: '品牌', sortable: true, isShow: true, width: 70 },
    { contractNo: '合同', isShow: true, sortable: true },
    { leaseArea: '租赁区域', sortable: true, isShow: true, width: 80 },
    { openDate: '开业时间', sortable: true, isShow: true, width: 120 },
    { creator: '创建人', sortable: true, isShow: false },
    { createTime: '创建时间', sortable: true, isShow: false },
    { Modifier: '修改人', sortable: true, isShow: false },
    { updateTime: '修改时间', sortable: true, isShow: false },
    { checkStatus: '审核状态', sortable: true, isShow: true, formatter: row => getOptionsLabel(row.checkStatus, list) }
  ]
}
