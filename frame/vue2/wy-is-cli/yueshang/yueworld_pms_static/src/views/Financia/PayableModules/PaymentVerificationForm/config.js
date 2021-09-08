/*
 * @Author: jllk
 * @LastEditors: fhj
 * @Description: 付款核销单列表页
 */
import PUBFN from '@/utils/pubFn'

// 状态筛选
export const statusSearchConfig = function() {
  return [
    {
      name: '审核状态',
      key: 'checkStatus',
      list: [
        { label: '草稿', value: 1, dataKey: 'checkStatus01' },
        { label: '审核中', value: 2, dataKey: 'checkStatus02' },
        { label: '审核通过', value: 3, dataKey: 'checkStatus03' },
        { label: '已驳回', value: 4, dataKey: 'checkStatus04' },
        { label: '已红冲', value: 5, dataKey: 'checkStatus05' }
      ]
    }
  ]
}

// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入核销编号/合同编号/商家/企业/品牌/租赁区域', width: '220px', Left: 20, isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'programName', label: '', width: '200', placeholder: '所有项目', list: PUBFN.getOptionsList('projectList'), isFirst: true },
    { itemType: 'datePicker', prop: 'payableDate', label: '', type: 'daterange', width: '246px', span: 2, startPlaceholder: '付款日期起', endPlaceholder: '付款日期止', rangeSeparator: '~', isFirst: true },
    { itemType: 'selectDialog', prop: 'feeName', width: '200', label: '', placeholder: '所有费项', list: PUBFN.getOptionsList('allProjectFees') },
    { itemType: 'selectDialog', prop: 'uploadStatus', width: '200', label: '', placeholder: '请选择上传状态', list: PUBFN.getOptionsList('SelectState') },
    { itemType: 'datePicker', prop: 'verificationDate', label: '', type: 'daterange', width: '246px', startPlaceholder: '核销日期起', endPlaceholder: '核销日期止', rangeSeparator: '~' }

  ]
}

// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { id: '序号', type: 'index', width: 80, sortable: true, showFixed: true },
    { receivableNo: '核销编号', sortable: true, isShow: true },
    { programName: '项目名称', sortable: true, isShow: true },
    { tenantId: '商家/企业', sortable: true, isShow: true },
    { receivableNo: '应付编号', sortable: true, isShow: true },
    { payableAmount: '本次付款金额(元)', width: '150', sortable: true, isShow: true, type: 'money' },
    { status: '状态', sortable: true, isShow: true, formatter: row => this.Parallelstatus(row) },
    { verificationDate: '核销日期', sortable: true, isShow: true },
    { creatDate: '创建时间', sortable: true, isShow: false },
    { updatePerson: '修改人', sortable: true, isShow: false },
    { payableDate: '付款日期', sortable: true, isShow: false },
    { uploadStatus: '上传状态', sortable: true, isShow: false },
    { verificationStatusId: '核销状态', sortable: true, isShow: false },
    { auditStatus: '审核状态', sortable: true, isShow: false },
    { feeName: '费项', sortable: true, isShow: false }

  ]
}
