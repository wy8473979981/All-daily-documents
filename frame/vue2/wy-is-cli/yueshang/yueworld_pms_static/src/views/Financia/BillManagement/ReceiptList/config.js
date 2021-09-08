/*
 * @Author: xza
 * @Date: 2021-07-28 16:18:27
 * @LastEditTime: 2021-08-10 18:32:30
 * @LastEditors: xza
 * @Description: 收据
 * @FilePath: /baolong/src/views/Financia/BillManagement/ReceiptList/config.js
 */
// 倒入Api
import { receiptListApi } from '@/api/receiptList'

import PUBFN from '@/utils/pubFn'

// 状态筛选
export const statusSearchConfig = function() {
  return [
    {
      name: '状态',
      key: 'status',
      list: [
        { label: '未开具', value: 1, dataKey: 'status01' },
        { label: '已开具', value: 2, dataKey: 'status02' },
        { label: '已回收', value: 3, dataKey: 'status03' },
        { label: '已作废', value: 4, dataKey: 'status04' }
      ]
    }
  ]
}

// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'receiptId', label: '', placeholder: '请输入收据号/合同号/核销单号/应收编号', width: '340px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'programName', label: '', placeholder: '所有项目', width: '200px', list: PUBFN.getOptionsList('receiptProgramTypes'), isFirst: true },
    { itemType: 'input', prop: 'accountName', label: '', placeholder: '请输入收款单位', width: '200px', isSearch: true },
    { itemType: 'input', prop: 'payConpanyName', label: '', placeholder: '请输入缴款单位', width: '200px', isSearch: true },
    { itemType: 'datePicker', type: 'daterange', startPlaceholder: '开具开始日期', endPlaceholder: '开具结束日期', rangeSeparator: '~', prop: 'receiptDate', label: '', width: '246px' }
  ]
}

// 查询表单配置
export const searchForm = function() {
  return {
    fuzzyEnquiry: '', // 模糊搜索
    programName: [], // 所有项目
    accountName: '', // 收款单位
    payConpanyName: '', // 缴款单位
    daterange: [] // 收据日期
  }
}

// 接口请求配置
export const queryConfig = function() {
  return {
    api: receiptListApi.receiptList,
    dataKey: 'receiptList' // 用于渲染表格数据的标识
  }
}

// 列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
    { receiptId: '收据号', sortable: true, isShow: true },
    { programName: '项目', sortable: true, isShow: true },
    { operationDate: '开具日期', sortable: true, isShow: true },
    { status: '状态', sortable: true, isShow: true },
    { amount: '合计金额(元)', sortable: true, isShow: true, type: 'money' },
    { accountName: '收款单位', sortable: true, isShow: true },
    { payConpanyName: '缴款单位', sortable: true, isShow: true },
    { operationUser: '经办人', sortable: true, isShow: true },
    { verificationId: '核销单号', sortable: true, isShow: false }
  ]
}
