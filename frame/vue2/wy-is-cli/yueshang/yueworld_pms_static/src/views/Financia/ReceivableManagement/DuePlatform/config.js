/*
 * @Author: xza
 * @LastEditors: xueyx
 * @Description: 费用项配置
 */
import PUBFN from '@/utils/pubFn'
import { getOptionsLabel } from '@/filters/index'

// 状态筛选
export const statusSearchConfig = function() {
  return [
    {
      name: '合同类型',
      key: 'contType',
      list: [
        { label: '招商合同', value: 1, dataKey: 'contType01' },
        { label: '多经合同', value: 2, dataKey: 'contType02' }
      ]
    }
  ]
}
const selectList = [
  { label: '按应收日期统计欠费', value: 1 },
  { label: '按权责月统计欠费', value: 2 }
]
// 搜索配置
export const searchConfig = function(subStatusId) {
  let subStatusIdList = [
    { itemType: 'datePicker', prop: 'receivableTime', label: '', type: 'daterange', width: '246px', startPlaceholder: '应收日期起', endPlaceholder: '应收日期止', rangeSeparator: '~' }
  ]
  if (subStatusId === 2) {
    subStatusIdList = [
      { itemType: 'monthPicker', prop: 'financialDate', label: '', type: 'monthrange', width: '246px', startPlaceholder: '权责月起', endPlaceholder: '权责月止', rangeSeparator: '~' }
    ]
  }
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', multiple: true, label: '', placeholder: '请输入合同编号/商家/企业/品牌/租赁区域', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'programName', multiple: true, label: '', placeholder: '请选择项目', width: '200px', list: PUBFN.getOptionsList('allProject'), isFirst: true },
    { itemType: 'radio', prop: 'subStatusId', label: '', type: 'daterange', width: '318px', list: selectList, isFirst: true, change: this.searchChange },
    { itemType: 'selectDialog', prop: 'brandFormatName', label: '', type: 'daterange', width: '200px', placeholder: '请选择签约业态', list: PUBFN.getOptionsList('brandFormatName'), multiple: true },
    { itemType: 'selectDialog', prop: 'feeName', label: '', placeholder: '所有费项', width: '200px', list: PUBFN.getOptionsList('allProjectFees') },
    ...subStatusIdList
  ]
}
// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
    { contNo: '合同编号', isShow: true, sortable: true },
    { programName: '项目名称', isShow: true, sortable: true },
    { brandName: '品牌名', isShow: true, sortable: true },
    { tenantName: '商家/企业', isShow: true, sortable: true },
    { leaseArea: '租赁区域', isShow: false, sortable: true },
    { contType: '合同类型', isShow: true, sortable: true, formatter: row => getOptionsLabel(row.contType, 'contTypes') },
    { oweAmount: '欠费金额(元)', isShow: true, sortable: true, type: 'money', width: 124 },
    { ArrearageDayThirty: '30天以内(元)', isShow: true, sortable: true, type: 'money', width: 124 },
    { ArrearageDaySixty: '31-60天(元)', isShow: true, sortable: true, type: 'money', width: 114 },
    { ArrearageDayNinety: '61-90天(元)', isShow: true, sortable: true, type: 'money', width: 114 },
    { ArrearageDayHundredTwenty: '91-120天(元)', isShow: true, sortable: true, type: 'money', width: 130 },
    { ArrearageDayHundredEighty: '121-180天(元)', isShow: false, sortable: true, type: 'money', width: 130 },
    { MoreArrearageDayHundredEighty: '180天以上(元)', isShow: false, sortable: true, type: 'money', width: 130 }
  ]
}
// 表格左侧文案展示 data为列表接口获取后的数据 取data的某字段作为展示
export const tableDescConfig = function(data) {
  return [
    { text: '欠费金额汇总(万元)', value: data.receivableAmountTotal }
  ]
}
