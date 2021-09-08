/*
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description: 应收减免配置
 */
import PUBFN from '@/utils/pubFn'
import { getOptionsLabel } from '@/filters/index'

// 状态筛选
export const statusSearchConfig = function() {
  return [
    {
      name: '审核状态',
      key: 'auditStatus',
      list: [
        { label: '草稿', value: 1, dataKey: 'draftStatistics' },
        { label: '审核中', value: 2, dataKey: 'underReviewStatistics' },
        { label: '审核通过', value: 4, dataKey: 'reviewedStatistics' },
        { label: '已驳回', value: 5, dataKey: 'rejectedStatistics' }
      ]
    }
  ]
}
// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', multiple: true, label: '', placeholder: '请输入减免编号/合同编号/商家/企业/品牌/租赁区域', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'programName', multiple: true, label: '', placeholder: '所有项目', width: '200px', list: PUBFN.getOptionsList('allProject'), isFirst: true },
    { itemType: 'datePicker', prop: 'creatDate', label: '', type: 'daterange', width: '246px', startPlaceholder: '创建时间起', endPlaceholder: '创建时间止', rangeSeparator: '~', isFirst: true },
    { itemType: 'select', prop: 'buildingName', label: '', type: 'daterange', width: '200px', placeholder: '请选择楼栋', multiple: true, list: [] },
    { itemType: 'select', prop: 'floorName', label: '', type: 'daterange', width: '200px', placeholder: '请选择楼层', list: [] }
  ]
}
// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
    { derateId: '减免编号', sortable: true, isShow: true },
    { programName: '项目名称', sortable: true, isShow: true },
    { tenantName: '商家/企业', isShow: true, sortable: true },
    { contNo: '合同编号', isShow: true, sortable: true },
    { derateAmount: '减免金额(元)', isShow: true, sortable: true, type: 'money' },
    { creatDate: '创建时间', sortable: true, isShow: true },
    { auditStatus: '审核状态', sortable: true, isShow: true },
    { creator: '创建人', sortable: true, isShow: true },
    { brandName: '品牌名', sortable: true, isShow: false },
    { leaseArea: '租赁区域', sortable: true, isShow: false },
    { buildingName: '楼栋', sortable: true, isShow: false, formatter: row => getOptionsLabel(row.buildingName, 'allFlo') },
    { floorName: '楼层', sortable: true, isShow: false, formatter: row => getOptionsLabel(row.floorName, 'allFlos') }
  ]
}
// 表格左侧文案展示 data为列表接口获取后的数据 取data的某字段作为展示
export const tableDescConfig = function(data) {
  return [
    { text: '减免金额汇总(万元)', value: 0.78 }
  ]
}
