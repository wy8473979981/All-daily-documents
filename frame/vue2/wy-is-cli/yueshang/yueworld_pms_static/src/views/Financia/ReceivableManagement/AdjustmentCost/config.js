/*
 * @Author: fzx
 * @LastEditors: fzx
 * @Description: 费用调整单
 */
import PUBFN from '@/utils/pubFn'
// 状态筛选
export const statusSearchConfig = function() {
  return [{
    name: '审核状态',
    key: 'checkStatus',
    list: [
      { label: '草稿', value: 1, dataKey: 'draftStatistics' },
      { label: '审核中', value: 2, dataKey: 'underReviewStatistics' },
      { label: '审核通过', value: 3, dataKey: 'reviewedStatistics' },
      { label: '已驳回', value: 4, dataKey: 'rejectedStatistics' }
    ]
  }]
}
// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEequiry', multiple: true, label: '', placeholder: '请输入调整编号/合同编号/商家/企业/品牌/租赁区域', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'programName', multiple: true, label: '', placeholder: '所有项目', width: '200px', list: PUBFN.getOptionsList('allProject'), isFirst: true },
    { itemType: 'datePicker', prop: 'creatDate', label: '', type: 'daterange', width: '246px', startPlaceholder: '创建时间起', endPlaceholder: '创建时间止', rangeSeparator: '~', isFirst: true },
    { itemType: 'select', prop: 'buildingName', label: '', type: 'daterange', width: '200px', placeholder: '请选择楼栋', list: [] },
    { itemType: 'select', prop: 'floorName', label: '', type: 'daterange', width: '200px', placeholder: '请选择楼层', list: [] }
  ]
}
// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
    { adjustId: '调整编号', sortable: true, isShow: true },
    { programName: '项目名称', sortable: true, isShow: true },
    { tenantName: '商家/企业', isShow: true, sortable: true },
    { contNo: '合同编号', isShow: true, sortable: true },
    { adjustAmount: '调整金额(元)', isShow: true, sortable: true, type: 'money' },
    { brandName: '品牌名', isShow: false, sortable: true },
    { leaseArea: '租赁区域', sortable: true, isShow: false },
    { creatDate: '创建时间', sortable: true, isShow: true, width: '150px' },
    { auditStatus: '审核状态', sortable: true, isShow: true },
    { creator: '创建人', sortable: true, isShow: true },
    { buildingName: '楼栋', sortable: true, isShow: false },
    { floorName: '楼层', sortable: true, isShow: false }
  ]
}
// 表格左侧文案展示 data为列表接口获取后的数据 取data的某字段作为展示
export const tableDescConfig = function() {
  return [
    { text: '调整金额汇总(万元)', value: 0.61 }
  ]
}
