/*
 * @Author: fzx
 * @LastEditors: fzx
 * @Description: 配置项
 */
import PUBFN from '@/utils/pubFn'
import { getOptionsLabel } from '@/filters/index'
export const statusSearchConfig = function() {
  return [{
    name: '收款单状态',
    key: 'searchStatus',
    list: [
      { label: '未核销', value: 1, dataKey: 'searchStatus01' },
      { label: '审核中', value: 2, dataKey: 'searchStatus02' },
      { label: '已核销', value: 3, dataKey: 'searchStatus03' }
    ]
  }]
}
const list = [
  { label: '未核销', value: 1 },
  { label: '审核中', value: 2 },
  { label: '已核销', value: 3 }
]
// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder:
    '请输入收款编号/合同编号/商家/企业/品牌名/收款单位', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'programName', label: '', placeholder: '所有项目', width: '200px', list: PUBFN.getOptionsList('entryName'), isFirst: true },
    { itemType: 'selectDialog', prop: 'paymentTypeName', label: '', placeholder: '所有收款方式', width: '200px', list: PUBFN.getOptionsList('paymentMethod'), isFirst: true },
    { itemType: 'datePicker', prop: 'receivedDate', label: '', startPlaceholder: '收款日期起', endPlaceholder: '收款日期止', rangeSeparator: '~', type: 'daterange', width: '220px', isFirst: true },
    { itemType: 'select', prop: 'unknownType', label: '', placeholder: '请选择未名款', width: '200px', list: PUBFN.getOptionsList('unnamed'), span: 1 },
    { itemType: 'input', prop: 'minMoney', label: '', placeholder: '最小收款金额', width: '150px', type: 'money', change: this.minMoney },
    { itemType: 'input', prop: 'maxMoney', label: '~', placeholder: '最大收款金额', width: '150px', type: 'money', change: this.maxMoney },
    { itemType: 'select', prop: 'generation', label: '', placeholder: '请选择生成方式', width: '200px', list: PUBFN.getOptionsList('generationMethod') },
    { itemType: 'input', prop: 'bankFlowNumber', label: '', placeholder: '请输入银行流水', width: '200px' },
    { itemType: 'input', prop: 'bankAccount', label: '', placeholder: '请输入收款银行账号', width: '200px' },
    { itemType: 'input', prop: 'receivedPerson', label: '', placeholder: '请输入收款人', width: '200px' }
  ]
}

// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { idx: '序号', type: 'index', sortable: true, showFixed: true },
    { receivedId: '收款编号', sortable: true, isShow: true },
    { programName: '项目名称', sortable: true, isShow: true },
    { tenantName: '商家/企业', sortable: true, isShow: true },
    { brandName: '品牌名', sortable: true, isShow: false },
    { creatDate: '创建时间', sortable: true, isShow: false },
    { updatedDate: '最后修改时间', sortable: true, isShow: false },
    { updater: '修改人', sortable: true, isShow: false },
    { paymentTypeName: '收款方式', width: '105px', sortable: true, isShow: true },
    { receivedAmount: '收款金额(元)', isShow: true, sortable: true, type: 'money' },
    { verificationAmount: '核销金额(元)', sortable: true, isShow: true, type: 'money' },
    { receivedDate: '收款日期', sortable: true, isShow: true },
    { receivedVerificationStatusId: '收款核销状态', sortable: true, isShow: true, formatter: row => getOptionsLabel(row.searchStatus, list) },
    { unknownType: '未名款项', sortable: true, isShow: false },
    { generation: '生成方式', sortable: true, isShow: false },
    { receivedPerson: '收款人', sortable: true, isShow: false }
  ]
}
