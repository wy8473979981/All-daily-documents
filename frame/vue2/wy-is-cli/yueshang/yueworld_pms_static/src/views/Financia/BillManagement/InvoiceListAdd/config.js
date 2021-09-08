/*
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description: 配置
 */

import { invoiceOfListApi } from '@/api'
import PUBFN from '@/utils/pubFn'
import { getOptionsLabel } from '@/filters/index'

// 页面配置
export const configData = () => {
  return [
    { itemType: 'radio', prop: 'invoiceType', label: '发票类型', list: PUBFN.getOptionsList('invoiceTypes'), width: '100%' },
    { itemType: 'radio', prop: 'programName', label: '备注', list: PUBFN.getOptionsList('programRadioTypes'), width: '100%' },
    { itemType: 'input', type: 'textarea', prop: 'remark', label: '  ', width: '435px', height: '64px' },
    { itemType: 'input', type: 'number', prop: 'limit', label: '限额', width: '200px' }
  ]
}
export const tableOrderConfig = function() {
  return {
    checkbox: false,
    showOperation: true
  }
}
// 表单验证
export const rulesForm = () => {
  return {
    invoiceType: [{ required: true, message: '请输入必填项', trigger: 'blur' }],
    programName: [{ required: true, message: '请输入必填项', trigger: 'blur' }],
    remark: [{ required: false, message: '', trigger: 'blur' }],
    limit: [{ required: true, message: '请输入必填项', trigger: 'blur' }]
  }
}

export const rulesTable = () => {
  return {
    makeInvoiceAmountThr: [{ required: true, message: '请输入必填项', trigger: 'blur' }]
  }
}
export const queryConfig = function() {
  return {
    api: invoiceOfListApi.detailList,
    dataKey: 'detailList' // 用于渲染表格数据的标识
  }
}
// 列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', width: 50, sortable: true, isShow: true, showFixed: true },
    { receivableNo: '应收编号', isShow: true },
    { contNo: '合同编号', isShow: true },
    { tenantName: '商家', sortable: true, isShow: true },
    { feeName: '费项', isShow: true, formatter: row => getOptionsLabel(row.feeName, PUBFN.getOptionsList('subjectRelationFee')) },
    { receivableTime: '应收日期', isShow: true },
    { receivableAmount: '应收金额(元)', isShow: true, width: '120px', type: 'money' },
    { receivedAmount: '已核销金额(元)', isShow: true, width: '130px', type: 'money' },
    { makeInvoiceAmountOne: '已开票金额(元)', isShow: true, width: '130px', type: 'money' },
    // { makeInvoiceAmount: '开票金额(元)', isShow: true, sortable: true, width: '120px', type: 'money' },
    { makeInvoiceAmountTwo: '可开票金额(元)', isShow: true, width: '130px', type: 'money' },
    { makeInvoiceAmountThr: '申请开票金额(元)', isShow: true, width: '150px', itemType: 'input', inputType: 'Number', type: 'number', required: true },
    { invoiceNumber: '发票编号', sortable: true, showFixed: true },
    { programName: '项目', sortable: true },
    { invoiceType: '类型', sortable: true },
    { taxAccount: '税额(元)', sortable: true, width: '80px', type: 'money' },
    { invoiceDate: '发票日期', sortable: true },
    { status: '状态', sortable: true },
    // { fuzzyEnquiry: '模糊查询' },
    { billMonth: '账单月份' },
    { brandName: '品牌' },
    { remark: '备注' },
    { limit: '限额', type: 'money' },
    { untaxAccount: '不含税金额(元)', type: 'money', width: '130px' },
    { buyer: '购买方' },
    { seller: '销售方' },
    { amount: '价税合计', type: 'money' }
  ]
}

// 弹出层配置
export const dialogConfig = function() {
  return {
    width: '1161px',
    title: '选定开票范围'
  }
}
// 弹出层接口配置
export const dialogQueryConfig = function() {
  return {
    api: invoiceOfListApi.dialogList, // 用于加载开票范围列表
    dataKey: 'dialogList' // 用于渲染表格数据的标识
  }
}
// 弹出层列表查询表单配置
export const dialogSearchConfig = function() {
  return [
    { itemType: 'input', prop: 'invoiceId', label: '', placeholder: '请输入编号/发票号/合同编号/商家/品牌', width: '260px', height: '32px', isFirst: true },
    { itemType: 'selectDialog', prop: 'programName', multiple: true, label: '', placeholder: '所有项目', width: '150px', height: '32px', list: PUBFN.getOptionsList('projectName'), isFirst: true },
    { itemType: 'selectDialog', prop: 'feeName', multiple: true, label: '', placeholder: '所有费项', width: '150px', height: '32px', list: PUBFN.getOptionsList('allProjectFeesNo'), isFirst: true },
    { itemType: 'selectDialog', prop: 'status', multiple: true, label: '', placeholder: '开票状态', width: '150px', height: '32px', list: PUBFN.getOptionsList('invoiceStatusTypes'), isFirst: true },
    { itemType: 'monthPicker', prop: 'monthNumber', label: '', width: '200px', isFirst: true }
  ]
}
// 弹出层表格列配置
export const dialogConfigData = function() {
  return [
    { t0: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
    { receivableNo: '应收编号', sortable: true, isShow: true, showFixed: true },
    { contNo: '合同编号', sortable: true, isShow: true, showFixed: true },
    { tenantName: '商家', sortable: true, isShow: true },
    { feeName: '费项', sortable: true, isShow: true, formatter: row => getOptionsLabel(row.feeName, PUBFN.getOptionsList('allProjectFeesNo')) },
    { receivableTime: '应收日期', width: 80, sortable: true, isShow: true },
    { receivableAmount: '应收金额(元)', width: 120, sortable: true, isShow: true, type: 'money' },
    { receivedAmount: '已核销金额(元)', width: 130, sortable: true, isShow: true, type: 'money' },
    { makeInvoiceAmountOne: '已开票金额(元)', width: 130, sortable: true, isShow: true, type: 'money' },
    { makeInvoiceAmountTwo: '可开票金额(元)', width: 130, sortable: true, isShow: true, type: 'money' }
  ]
}
