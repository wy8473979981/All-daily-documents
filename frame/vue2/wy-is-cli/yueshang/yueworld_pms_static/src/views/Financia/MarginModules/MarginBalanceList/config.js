/*
 * @Author: xiaoxie
 * @Date: 2021-07-22 10:00:33
 * @Last Modified by: xiaoxie
 * @Last Modified time: 2021-09-06 13:02:03
 */
import PUBFN from '@/utils/pubFn'

// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入意向/合同编号/商家名称/品牌名称', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'programName', label: '', placeholder: '请选择项目', width: '220px', list: PUBFN.getOptionsList('allProject'), isFirst: true },
    { itemType: 'selectDialog', prop: 'feeName', label: '', placeholder: '请选择费项', width: '220px', list: PUBFN.getOptionsList('FeeSubjectList'), isFirst: true }
    // { itemType: 'selectDialog', prop: 'feeName', label: '', multiple: true, placeholder: '请选择费项', width: '220px', list: PUBFN.getOptionsList(''), isFirst: true }
  ]
}
// 列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', sortable: true, showFixed: true },
    { feeName: '费项', sortable: true, isShow: true },
    { programName: '项目', sortable: true, isShow: true },
    { contNo: '意向/合同编号', sortable: true, isShow: true },
    { tenantName: '商家', sortable: true, isShow: true },
    { brandName: '品牌', isShow: true, sortable: true },
    { amount: '总额(元)', sortable: true, isShow: true, type: 'money' },
    { confiscationAmount: '罚没金(元)', sortable: true, isShow: true, type: 'money' },
    { refundFee: '退款金(元)', sortable: true, isShow: true, type: 'money' },
    { offsetAmount: '已冲抵(元)', sortable: true, isShow: true, type: 'money' },
    { balance: '余额(元)', sortable: true, isShow: true, type: 'money' },
    { applicationAmount: '申请冲抵(元)', sortable: true, isShow: true, type: 'money' },
    { accountName: '收款单位', sortable: true, isShow: true },
    { updateTime: '修改时间', sortable: true, isShow: false }
  ]
}
// 表格左侧文案展示 data为列表接口获取后的数据 取data的某字段作为展示
export const tableDescConfig = function(data) {
  return [
    { text: '当前页保证金余额（万元）：', value: data.pageTotal },
    { text: '全部页保证金余额（万元）：', value: data.allTotal }
  ]
}
