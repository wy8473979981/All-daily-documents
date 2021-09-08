/*
 * @Author: xiaoxie
 * @Date: 2021-07-22 16:03:27
 * @Last Modified by: xiaoxie
 * @Last Modified time: 2021-08-31 18:14:21
 */
import PUBFN from '@/utils/pubFn'
// 审批状态
export const statusSearchConfig = function() {
  return [
    {
      name: '状态',
      key: 'voucherStatus',
      list: [
        { label: '未生成凭证', value: 1, dataKey: 'voucherStatus01' },
        { label: '已生成凭证', value: 2, dataKey: 'voucherStatus02' }
      ]
    }
  ]
}
// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入业务编号 / 合同号/品牌/商家', isSearch: true, isFirst: true, width: '200px' },
    { itemType: 'select', prop: 'ibTypeId', multiple: true, label: '', placeholder: '所有收付类型', width: '200px', list: PUBFN.getOptionsList('receiptPaymentType'), isFirst: true },
    { itemType: 'select', prop: 'accountName', multiple: true, label: '', placeholder: '请选择账套', width: '200px', list: PUBFN.getOptionsList('subjectType'), isFirst: true },
    { itemType: 'monthPicker', prop: 'financialDate', label: '', placeholder: '权责月', width: '200px', isFirst: true },
    { itemType: 'selectDialog', prop: 'programName', multiple: true, label: '', placeholder: '请选择项目', width: '200px', list: PUBFN.getOptionsList('allProject') },
    { itemType: 'select', prop: 'contType', multiple: true, label: '', placeholder: '请选择合同类型', width: '200px', list: PUBFN.getOptionsList('contractsType') },
    { itemType: 'select', prop: 'contractperiod', multiple: true, label: '', placeholder: '请选择合同期限', width: '200px', list: PUBFN.getOptionsList('contractPeriod') },
    { itemType: 'select', prop: 'taxCollectType', multiple: true, label: '', placeholder: '请选择征收类型', width: '200px', list: PUBFN.getOptionsList('taxCollectType') },
    { itemType: 'select', prop: 'isAgentReceivced', label: '', placeholder: '是否代收', width: '200px', list: PUBFN.getOptionsList('collectionOrNot') },
    { itemType: 'select', prop: 'isBackAgentReceivced', label: '', placeholder: '是否被代收', width: '200px', list: PUBFN.getOptionsList('backAgentReceivced') },
    { itemType: 'select', prop: 'isInvoice', label: '', placeholder: '是否已开票', width: '200px', list: PUBFN.getOptionsList('invoiceList') },
    { itemType: 'select', prop: 'isBeforVer', label: '', placeholder: '是否提前核销', width: '200px', list: PUBFN.getOptionsList('beforVerList') },
    { itemType: 'select', prop: 'paymentTypeName', label: '', placeholder: '收款方式', width: '200px', list: PUBFN.getOptionsList('paymentMethod') },
    { itemType: 'select', prop: 'derateType', label: '', placeholder: '减免类型', width: '200px', list: PUBFN.getOptionsList('derateTypeList') },
    { itemType: 'select', prop: 'feeName', label: '', placeholder: '冲抵费项', width: '200px', list: PUBFN.getOptionsList('feeNameList') },
    { itemType: 'select', prop: 'isMergeVoucher', label: '', placeholder: '是否合并凭证', width: '200px', list: PUBFN.getOptionsList('mergeVoucherList') },
    { itemType: 'select', prop: 'isAfterPaid', label: '', placeholder: '是否后付', width: '200px', list: PUBFN.getOptionsList('afterPaidList') },
    { itemType: 'monthPicker', prop: 'financialDateInterval', label: '', type: 'monthrange', format: 'yyyy年MM月', valueFormat: 'yyyy-MM', startPlaceholder: '权责月起', endPlaceholder: '权责月止', width: '246px' }

  ]
}
// 列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', sortable: true, showFixed: true },
    { programName: '项目', sortable: true, isShow: true },
    { accountName: '账套', sortable: true, isShow: true },
    { receiptNumber: '单据编号', sortable: true, isShow: true, fixedWidth: 150 },
    { businessNumber: '业务编号', isShow: true, sortable: true },
    { ibTypeId: '收付类型', sortable: true, isShow: true },
    { financialDate: '权责月', sortable: true, isShow: true },
    { amount: '金额', sortable: true, isShow: true },
    { contType: '合同类型', sortable: true, isShow: false },
    { tax: '税率', sortable: true, isShow: false },
    { taxCollectType: '征收类型', sortable: true, isShow: false },
    { isAgentReceivced: '是否代收', sortable: true, isShow: false },
    { isBackAgentReceivced: '是否被代收', sortable: true, isShow: false },
    { storeTypes: '铺位类型', sortable: true, isShow: false },
    { isInvoice: '是否已开票', sortable: true, isShow: false },
    { isBeforVer: '是否提前核销', sortable: true, isShow: false },
    { paymentTypeName: '收款方式', sortable: true, isShow: false },
    { bankName: '银行', sortable: true, isShow: false },
    { leaseArea: '租赁区域', sortable: true, isShow: false },
    { derateType: '减免类型', sortable: true, isShow: false },
    { feeName: '冲抵费项', sortable: true, isShow: false },
    { isMergeVoucher: '是否合并凭证', sortable: true, isShow: false },
    { voucherId: '凭证号', sortable: true, isShow: false },
    { voucherStatusText: '凭证状态', sortable: true, isShow: false },
    { generateMsg: '生成凭证返回', sortable: true, isShow: false },
    { creatDate: '创建时间', sortable: true, isShow: false },
    { remark: '备注', sortable: true, isShow: false }
  ]
}
