/*
 * @Author: xiaoxie
 * @LastEditors: xueyx
 * @Description: 品牌落位列表配置
 */
import PUBFN from '@/utils/pubFn'
import { getOptionsLabel } from '@/filters/index'

// 审批状态
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
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入铺位号/品牌名称', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'programName', label: '', placeholder: '请选择项目', width: '220px', list: PUBFN.getOptionsList('allProject'), isFirst: true }
  ]
}

// 列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
    { brandPlacementNo: '编号', sortable: true, isShow: true },
    { programName: '项目', sortable: true, isShow: true },
    { checkStatus: '审核状态', sortable: true, isShow: true, formatter: row => getOptionsLabel(row.checkStatus, list) },
    { creator: '创建人', sortable: true, isShow: true },
    { createTime: '创建时间', sortable: true, isShow: true },
    { Modifier: '修改人', sortable: true, isShow: false },
    { updateTime: '修改时间', sortable: true, isShow: false }
  ]
}
