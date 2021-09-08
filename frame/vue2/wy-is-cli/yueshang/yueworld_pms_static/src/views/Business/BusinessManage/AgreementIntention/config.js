/*
 * @Author: zsj
 * @LastEditors: fhj
 * @Description: 意向协议列表配置项
 */
import PUBFN from '@/utils/pubFn'

// 状态筛选
export const statusSearchConfig = function() {
  return [
    {
      name: '审核状态',
      key: 'auditStatus',
      list: [
        { label: '草稿', value: 1, dataKey: 'draftStatistics' },
        { label: '审核中', value: 2, dataKey: 'underReviewStatistics' },
        { label: '审核通过', value: 3, dataKey: 'reviewedStatistics' },
        { label: '已驳回', value: 4, dataKey: 'rejectedStatistics' }
      ]
    },
    {
      name: '铺位类型',
      key: 'storeTypes',
      list: [
        { label: '商铺', value: 1, dataKey: 'shopstores' },
        { label: '多经', value: 2, dataKey: 'multiples' },
        { label: '写字楼', value: 3, dataKey: 'writeF' }
      ]
    }
  ]
}

// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', multiple: true, label: '', placeholder: '请输入意向编号/名称/商家名称/铺位关键字', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'programName', multiple: true, label: '', placeholder: '请选择项目', width: '220px', list: PUBFN.getOptionsList('projectList'), isFirst: true, change: this.proName },
    { itemType: 'select', prop: 'brandFormatName', label: '', placeholder: '请选择签约业态', width: '220px', list: PUBFN.getOptionsList('brandFormatName'), isFirst: true },
    { itemType: 'select', prop: 'buildingId', label: '', placeholder: '请选择楼栋', width: '220px', list: PUBFN.getOptionsList('floor2'), change: this.build },
    { itemType: 'select', prop: 'floorId', label: '', placeholder: '请选择楼层', width: '200px', list: PUBFN.getOptionsList('floor1'), change: this.floor },
    // { itemType: 'select', prop: 'LeaseArea', label: '', placeholder: '请选择铺位', width: '200px', list: PUBFN.getOptionsList('allStore') },
    { itemType: 'select', prop: 'deleteStates', label: '', placeholder: '请选择删除状态', width: '220px', list: PUBFN.getOptionsList('deleteStatus') },
    { itemType: 'datePicker', prop: 'decorateEndDates', label: '', type: 'daterange', width: '246px', span: 2, startPlaceholder: '合同开始日起', endPlaceholder: '合同结束日起' }
  ]
}

// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
    { contNoIntent: '意向编号', sortable: true, isShow: true },
    { programName: '项目名称', sortable: true, isShow: true },
    { intentProtocolName: '意向名称', sortable: true, isShow: true },
    { tenantName: '商家名称', isShow: true, sortable: true },
    { createdDate: '创建时间', isShow: true, sortable: true },
    { rentYears: '租期', isShow: true, sortable: true },
    { auditStatus: '审核状态', isShow: true, sortable: true },
    { contEndDate: '合同结束时间', isShow: true, sortable: true },
    { ruleName: '方案名称', isShow: false, sortable: true },
    { brandName: '品牌名', isShow: false, sortable: true },
    { updater: '最后修改人', isShow: false, sortable: true },
    { creator: '创建人', isShow: false, sortable: true },
    { updatedDate: '最后修改时间', isShow: false, sortable: true },
    { contBeginDate: '合同开始日', isShow: false, sortable: true },
    { brandFormatName: '签约业态', isShow: false, sortable: true }
  ]
}

// 表格左侧文案展示 data为列表接口获取后的数据 取data的某字段作为展示
export const tableDescConfig = function(data) {
  return [
    { text: '总计租面积(m²)', value: data.area },
    { text: '当前页固定租金总金额(万元)', value: data.area },
    { text: '全部页固定租金总金额(万元)', value: data.area }
  ]
}
