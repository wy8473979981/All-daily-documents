/*
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description: 配置项
 */
import PUBFN from '@/utils/pubFn'

export const statusSearchConfig = function() {
  return [
    {
      name: '审批状态',
      key: 'searchStatus',
      list: [
        { label: '草稿', value: 1, dataKey: 'draft' },
        { label: '审核中', value: 2, dataKey: 'underReview' },
        { label: '审核通过', value: 3, dataKey: 'approved' },
        { label: '已驳回', value: 4, dataKey: 'rejected' },
        { label: '已红冲', value: 5, dataKey: 'redFlush' }
      ]
    }
  ]
}
// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入核销编号/商家企业/收款编号/合同编号', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'programName', label: '', placeholder: '所有项目', width: '200px', list: PUBFN.getOptionsList('projectName'), isFirst: true },
    { itemType: 'datePicker', prop: 'paymentTypeName', label: '', startPlaceholder: '收款日期起', endPlaceholder: '收款日期止', rangeSeparator: '~', type: 'daterange', width: '246px' },
    { itemType: 'datePicker', prop: 'verificationDate', label: '', startPlaceholder: '核销日期起', endPlaceholder: '核销日期止', rangeSeparator: '~', type: 'daterange', width: '255px', isFirst: true },
    { itemType: 'select', prop: 'verificationType', label: '', placeholder: '请选择核销类型', width: '200px', list: PUBFN.getOptionsList('verificationTypes') },
    { itemType: 'input', prop: 'verificationPerson', label: '', placeholder: '请填写核销人', width: '200px' }
  ]
}

// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { idx: '序号', type: 'index', sortable: true, showFixed: true },
    { verificationId: '核销编号', sortable: true, isShow: true },
    { programName: '项目名称', sortable: true, isShow: true },
    { tenantName: '商家/企业', sortable: true, isShow: true },
    { verificationAmount: '核销金额(元)', width: '120px', sortable: true, isShow: true, type: 'money' },
    { collectionVerificationTotal: '收款核销(元)', width: '120px', isShow: true, sortable: true, type: 'money' },
    { OffsetAmountTotal: '冲抵金额(元)', width: '120px', sortable: true, isShow: true, type: 'money' },
    { receivableReductionAmount: '应收冲减(元)', width: '120px', sortable: true, isShow: true, type: 'money' },
    { advanceAmountTotal: '转暂收款金额(元)', width: '150px', sortable: true, isShow: true, type: 'money' },
    { verificationDate: '核销日期', sortable: true, isShow: true },
    { auditStatus: '审核状态', sortable: true, isShow: true },
    { creator: '创建人', sortable: true, isShow: false },
    { creatDate: '创建时间', sortable: true, isShow: false },
    { updateTime: '更新时间', sortable: true, isShow: false },
    { uploadState: '上传状态', sortable: true, isShow: false },
    { receivedId: '收款编号', sortable: true, isShow: false },
    { verificationPerson: '核销人', sortable: true, isShow: false },
    { verificationType: '核销类型', sortable: true, isShow: false }
  ]
}

