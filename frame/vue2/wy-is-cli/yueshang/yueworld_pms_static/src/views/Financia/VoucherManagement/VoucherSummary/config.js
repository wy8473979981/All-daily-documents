/*
 * @Author: xiaoxie
 * @Date: 2021-07-22 17:22:21
 * @Last Modified by: xiaoxie
 * @Last Modified time: 2021-07-30 09:35:55
 */
import PUBFN from '@/utils/pubFn'
// 审批状态
export const statusSearchConfig = function() {
  return [
    {
      name: '状态',
      key: 'status',
      list: [
        { label: '未上传', value: 1, dataKey: 'status01' },
        { label: '上传中', value: 2, dataKey: 'status02' },
        { label: '上传失败', value: 3, dataKey: 'status03' },
        { label: '上传成功', value: 4, dataKey: 'status04' },
        { label: '已红冲', value: 5, dataKey: 'status05' }
      ]
    }
  ]
}
// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入凭证号', width: '200px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'programName', label: '', placeholder: '请选择项目', width: '200px', list: PUBFN.getOptionsList('allProject'), isFirst: true },
    { itemType: 'selectDialog', prop: 'accountName', label: '', placeholder: '请选择账套', width: '200px', list: PUBFN.getOptionsList('subjectType'), isFirst: true },
    { itemType: 'selectDialog', prop: 'ibTypeId', label: '', placeholder: '请选择收付类型', width: '200px', list: PUBFN.getOptionsList('receiptPaymentType'), isFirst: true },
    { itemType: 'input', prop: 'thirdVoucherId', label: '', placeholder: '请输入第三方凭证号', width: '200px' },
    { itemType: 'datePicker', prop: 'accrualDate', label: '', startPlaceholder: '凭证日期起', endPlaceholder: '凭证日期止', rangeSeparator: '~', type: 'daterange', width: '220px' }
  ]
}
// 列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
    { programName: '项目', sortable: true, isShow: true },
    { accountName: '账套', sortable: true, isShow: true },
    { voucherId: '凭证号', sortable: true, isShow: true, fixedWidth: 160 },
    { thirdVoucherId: '第三方凭证号', sortable: true, isShow: true, fixedWidth: 160 },
    { ibTypeId: '收付类型', sortable: true, isShow: true },
    { debitAmount: '借方金额', sortable: true, isShow: true, type: 'money' },
    { crebditAmount: '贷方金额', sortable: true, isShow: true, type: 'money' },
    { accrualDate: '凭证日期', sortable: true, isShow: true },
    { statusText: '凭证状态', sortable: true, isShow: true },
    { creator: '制单人', sortable: true, isShow: true },
    { accrualDate: '生成日期', sortable: true, isShow: true, width: 120 },
    { thirdMsn: '三方信息', sortable: true, isShow: false },
    { sourceType: '来源类型', sortable: true, isShow: false },
    { uploadDate: '上传日期', sortable: true, isShow: false },
    { reverseVoucher: '红冲凭证', sortable: true, isShow: false }
  ]
}

