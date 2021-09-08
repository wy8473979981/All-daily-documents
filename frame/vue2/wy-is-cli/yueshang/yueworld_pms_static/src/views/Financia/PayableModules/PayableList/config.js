/*
 * @Author: jllk
 * @Date: 2021-07-29 11:44:40
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-08-11 16:49:45
 */
import PUBFN from '@/utils/pubFn'

// 状态筛选
export const statusSearchConfig = function() {
  return [
    {
      name: '付款核销状态',
      key: 'payableVerificationStatusId',
      list: [
        { label: '未核销', value: 1, dataKey: 'payableVerificationStatusId01' },
        { label: '审核中', value: 2, dataKey: 'payableVerificationStatusId02' },
        { label: '已核销', value: 3, dataKey: 'payableVerificationStatusId03' },
        { label: '已红冲', value: 4, dataKey: 'payableVerificationStatusId04' }
      ]
    },
    {
      name: '数据来源',
      key: 'paydataSourceableId',
      list: [
        { label: '暂收款处理单', value: 1, dataKey: 'paydataSourceableId01' },
        { label: '保证金处理单', value: 2, dataKey: 'paydataSourceableId02' },
        { label: '撤场清算', value: 3, dataKey: 'paydataSourceableId03' },
        { label: '应收明细', value: 4, dataKey: 'paydataSourceableId04' }
      ]
    }
  ]
}

// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入应付编号/合同编号/商家/企业/品牌/租赁区域', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'programName', label: '', placeholder: '所有项目', width: '220px', list: PUBFN.getOptionsList('projectList'), isFirst: true },
    { itemType: 'selectDialog', prop: 'feeName', width: '200', label: '', placeholder: '所有费项', list: PUBFN.getOptionsList('allProjectFees'), isFirst: true },
    { itemType: 'datePicker', prop: 'creatDate', label: '', type: 'daterange', width: '246px', span: 3, startPlaceholder: '应付日期起', endPlaceholder: '应付日期止', rangeSeparator: '~', isFirst: true }
  ]
}

// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { id: '序号', type: 'index', width: 80, showFixed: true },
    { payableId: '应付编号', sortable: true, isShow: true },
    { programName: '项目名称', sortable: true, isShow: true },
    { contNo: '合同编号', sortable: true, isShow: true },
    { tenantId: '商家/企业', sortable: true, isShow: true },
    { payableAmount: '应付金额(元)', width: '130', sortable: true, isShow: true, type: 'money' },
    { payableVerificationStatusId: '付款核销状态', width: 160, sortable: true, isShow: true },
    { paydataSourceableId: '数据来源', sortable: true, isShow: true },
    { payableTime: '应付时间', sortable: true, isShow: true },
    { leaseArea: '租赁区域', sortable: true, isShow: false },
    { brandName: '品牌名', sortable: true, isShow: false },
    { feeName: '费项', sortable: true, isShow: false },
    { creatDate: '创建时间', sortable: true, isShow: false }

  ]
}
