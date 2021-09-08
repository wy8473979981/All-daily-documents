/*
 * @Author: xiaoxie
 * @Date: 2021-07-26 16:44:31
 * @Last Modified by: xiaoxie
 * @Last Modified time: 2021-08-04 09:50:04
 */
import PUBFN from '@/utils/pubFn'

// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入编号 / 名称', width: '200px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'levelId', label: '', placeholder: '所有级别', width: '200px', list: PUBFN.getOptionsList('levelIdList'), isFirst: true },
    { itemType: 'selectDialog', prop: 'ibTypeId', label: '', placeholder: '所有收付类型', width: '200px', list: PUBFN.getOptionsList('receiptPaymentType'), isFirst: true },
    { itemType: 'selectDialog', prop: 'derateType', label: '', placeholder: '减免类型', width: '220px', list: PUBFN.getOptionsList('derateTypeList') },
    { itemType: 'select', prop: 'isAgentReceivced', label: '', placeholder: '是否代收', width: '220px', list: PUBFN.getOptionsList('collectionOrNot') },
    { itemType: 'select', prop: 'isBackAgentReceivced', label: '', placeholder: '是否被代收', width: '220px', list: PUBFN.getOptionsList('backAgentReceivced') },
    { itemType: 'select', prop: 'isBeforVer', label: '', placeholder: '是否提前核销', width: '220px', list: PUBFN.getOptionsList('beforVerList') },
    { itemType: 'selectDialog', prop: 'storeTypes', label: '', placeholder: '铺位类型', width: '200px', list: PUBFN.getOptionsList('contType') },
    { itemType: 'selectDialog', prop: 'paymentTypeName', label: '', placeholder: '收款方式', width: '220px', list: PUBFN.getOptionsList('paymentMethod') },
    { itemType: 'selectDialog', prop: 'spaceEquityNature', label: '', placeholder: '产权性质', width: '200px', list: PUBFN.getOptionsList('spaceEquityNatureList') }
  ]
}
// 列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
    { templateId: '编号', sortable: true, isShow: true, width: 120 },
    { ibTypeId: '收付类型', sortable: true, isShow: true },
    { templateNumber: '名称', sortable: true, isShow: true, width: 120 },
    { levelId: '级别', sortable: true, isShow: true, width: 120 },
    { accountName: '账套', sortable: true, isShow: true },
    { isAgentReceivced: '是否代收', sortable: true, isShow: true },
    { isCollection: '是否代付', sortable: true, isShow: false },
    { isBeforVer: '是否提前核销', sortable: true, isShow: true, width: 120 },
    { isAfterPaid: '是否后付', sortable: true, isShow: false },
    { derateType: '减免类型', sortable: true, isShow: true },
    { storeTypes: '铺位类型', sortable: true, isShow: true },
    { spaceEquityNature: '产权性质', sortable: true, isShow: true },
    { isSplit: '是否拆分', sortable: true, isShow: true, width: 120 },
    { isBackAgentReceivced: '是否被代收', sortable: true, isShow: false },
    { isInvoice: '是否已开票', sortable: true, isShow: false },
    { splitType: '拆分类型', sortable: true, isShow: false },
    { isMerge: '是否合并分录', sortable: true, isShow: false },
    { isOffset: '是否冲抵费项', sortable: true, isShow: false },
    { creator: '创建人', sortable: true, isShow: false },
    { creatDate: '创建时间', sortable: true, isShow: false }

  ]
}

