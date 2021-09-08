
import PUBFN from '@/utils/pubFn'
import { getOptionsLabel } from '@/filters/index'

// 状态筛选
export const statusSearchConfig = function() {
  return [
    {
      name: '状态',
      key: 'status',
      dataKey: 'statusCount',
      list: PUBFN.getOptionsList('invoiceStatusTypes')
    }
  ]
}

// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入编号/发票号/合同编号/商家/品牌', width: '340px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'programName', multiple: true, label: '', placeholder: '所有项目', width: '200px', list: PUBFN.getOptionsList('projectName'), isFirst: true },
    { itemType: 'monthPicker', prop: 'billMonth', label: '', width: '200px', isFirst: true },
    { itemType: 'input', prop: 'invoiceNumber', label: '', placeholder: '请输入发票编号', width: '200px', isSearch: true },
    { itemType: 'input', prop: 'receivableNo', label: '', placeholder: '请输入应收编号', width: '200px', isSearch: true },
    { itemType: 'selectDialog', prop: 'invoiceType', multiple: true, label: '', placeholder: '发票类型', width: '200px', list: PUBFN.getOptionsList('invoiceTypes') },
    { itemType: 'selectDialog', prop: 'feeName', multiple: true, label: '', placeholder: '所有费项', width: '200px', list: PUBFN.getOptionsList('allProjectFees') },
    { itemType: 'input', prop: 'minMoney', label: '', placeholder: '开具最小金额', width: '150px', type: 'money', change: this.minMoney },
    { itemType: 'input', prop: 'maxMoney', label: '~', placeholder: '开具最大金额', width: '150px', type: 'money', change: this.maxMoney },
    { itemType: 'datePicker', type: 'daterange', startPlaceholder: '开具开始日期', endPlaceholder: '开具结束日期', rangeSeparator: '~', prop: 'invoiceDate', label: '', width: '246px' }

  ]
}

// 列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
    { invoiceId: '编号', sortable: true, isShow: true },
    { programName: '项目', sortable: true, isShow: true, formatter: row => getOptionsLabel(row.programName, PUBFN.getOptionsList('projectName')) },
    { tenantName: '商家', sortable: true, isShow: true },
    { invoiceType: '类型', sortable: true, isShow: true, formatter: row => getOptionsLabel(row.invoiceType, PUBFN.getOptionsList('invoiceTypes')) },
    { makeInvoiceAmount: '开票金额(元)', isShow: true, sortable: true, width: 130, type: 'money' },
    { taxAccount: '税额(元)', sortable: true, isShow: true, type: 'money' },
    { invoiceDate: '发票日期', sortable: true, isShow: true },
    { status: '状态', sortable: true, isShow: true, formatter: row => getOptionsLabel(row.status, PUBFN.getOptionsList('invoiceStatusTypes')) },
    // { fuzzyEnquiry: '模糊查询' },
    // { billMonth: '账单月份', sortable: true },
    { brandName: '品牌', sortable: true },
    { invoiceNumber: '发票号', sortable: true }
    // { receivableNo: '应收编号', sortable: true },
    // { contNo: '合同编号', sortable: true },
    // { feeName: '费项', sortable: true },
    // { receivableTime: '应收日期', sortable: true },
    // { receivableAmount: '应收金额', sortable: true },
    // { receivedAmount: '已核销金额', sortable: true },
    // { makeInvoiceAmountOne: '已开票金额', sortable: true },
    // { makeInvoiceAmountTwo: '可开票金额', sortable: true },
    // { remark: '备注', sortable: true },
    // { limit: '限额', sortable: true },
    // { makeInvoiceAmountThr: '申请开票金额', sortable: true },
    // { untaxAccount: '不含税金额', sortable: true },
    // { buyer: '购买方', sortable: true },
    // { seller: '销售方', sortable: true },
    // { amount: '价税合计', sortable: true }
  ]
}
