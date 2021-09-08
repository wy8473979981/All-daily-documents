/*
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description: 费用项配置
 */
import PUBFN from '@/utils/pubFn'
// 状态筛选
export const statusSearchConfig = function() {
  return [
    {
      name: '开票状态',
      key: 'invoiceStatusId',
      list: [
        { label: '未开票', value: 1, dataKey: 'unvoiced' },
        { label: '部分开票', value: 2, dataKey: 'paitialInvoice' },
        { label: '已开票', value: 3, dataKey: 'ticketed' }
      ]
    },
    {
      name: '核销状态',
      key: 'verificationStatusId',
      list: [
        { label: '未核销', value: 1, dataKey: 'notWritten' },
        { label: '部分核销', value: 2, dataKey: 'paitialWrite' },
        { label: '已核销', value: 3, dataKey: 'writeOff' }
      ]
    },
    {
      name: '应收来源',
      key: 'sourceId',
      list: [
        { label: '合同台账', value: 1, dataKey: 'contractBilling' },
        { label: '合同变更', value: 2, dataKey: 'contractChange' },
        { label: '合同解约', value: 3, dataKey: 'contractBreak' },
        { label: '撤场清算', value: 4, dataKey: 'leaveClear' },
        { label: '进场装修', value: 5, dataKey: 'insiteDecoration' },
        { label: '费用调整', value: 6, dataKey: 'costAdjustment' },
        { label: '能耗管理', value: 7, dataKey: 'nhManager' }
      ]
    }
  ]
}
// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', multiple: true, label: '', placeholder: '请输入应收编号/合同编号/商家/企业/品牌/租赁区域', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'programName', multiple: true, label: '', placeholder: '请选择项目', width: '200px', list: PUBFN.getOptionsList('allProject'), isFirst: true },
    { itemType: 'selectDialog', prop: 'feeName', label: '', placeholder: '请选择费项', width: '200px', list: PUBFN.getOptionsList('allProjectFees'), isFirst: true, multiple: true },
    { itemType: 'datePicker', prop: 'receivableTime', label: '', type: 'daterange', width: '246px', startPlaceholder: '应收日期起', endPlaceholder: '应收日期止', rangeSeparator: '~' },
    { itemType: 'select', prop: 'contType', label: '', type: 'daterange', width: '200px', placeholder: '请选择合同类型', list: PUBFN.getOptionsList('receivableContType'), span: 2 },
    { itemType: 'select', prop: 'subStatusId', label: '', type: 'daterange', width: '200px', placeholder: '请选择减免状态', list: PUBFN.getOptionsList('subStatusIdStatus') },
    { itemType: 'select', prop: 'isGeneratedBills', label: '', type: 'daterange', width: '200px', placeholder: '请选择生成账单状态', list: PUBFN.getOptionsList('isOrNotStatus') },
    { itemType: 'select', prop: 'isBeforVer', label: '', type: 'daterange', width: '200px', placeholder: '请选择是否提前核销', list: PUBFN.getOptionsList('isOrNotStatus') },
    { itemType: 'monthPicker', prop: 'financialDate', label: '', type: 'monthrange', width: '246px', startPlaceholder: '权责月起', endPlaceholder: '权责月止', rangeSeparator: '~' },
    { itemType: 'select', prop: 'buildingName', label: '', type: 'daterange', width: '200px', placeholder: '请选择楼栋', list: [], multiple: true },
    { itemType: 'select', prop: 'floorName', label: '', type: 'daterange', width: '200px', placeholder: '请选择楼层', list: [] },
    { itemType: 'select', prop: 'isNoReceivable', label: '', type: 'daterange', width: '220px', placeholder: '应收是否为负', list: PUBFN.getOptionsList('isOrNotStatus') },
    { itemType: 'input', prop: 'unReceivedAmount', label: '', placeholder: '未核销金额起 ~ 未核销金额止', type: 'daterange', width: '220px' }
  ]
}
// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { contNo: '合同编号', isShow: false, sortable: true },
    { tenantName: '商家/企业', isShow: false, sortable: true },
    { tax: '税率', isShow: false, sortable: true, type: 'money' },
    { tataxAccountxId: '税额', isShow: false, sortable: true, type: 'money' },
    { subAmount: '减免金额', isShow: false, sortable: true, type: 'money' },
    { brandName: '品牌名', isShow: false, sortable: true },
    { paymentStartDate: '账期开始日期', isShow: false, sortable: true },
    { paymentEndDate: '账期结束日期', isShow: false, sortable: true },
    { leaseArea: '租赁区域', isShow: false, sortable: true },
    { beforeVerAmount: '提前核销金额', isShow: false, sortable: true, type: 'money' },
    { t0: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
    { receivableNo: '应收编号', sortable: true, isShow: true },
    { feeName: '费项', sortable: true, isShow: true },
    { receivableTime: '应收日期', sortable: true, isShow: true },
    { financialDate: '权责月', isShow: true, sortable: true },
    { receivableAmount: '应收金额(元)', isShow: true, sortable: true, width: 130, type: 'money' },
    { actualReceivableAmount: '实际应收金额(元)', isShow: true, sortable: true, width: 150, type: 'money' },
    { receivedAmount: '已核销金额(元)', isShow: true, sortable: true, width: 140, type: 'money' },
    { isBeforVer: '是否提前核销', isShow: true, sortable: true, width: 110 },
    { isGeneratedBills: '是否生成账单', isShow: true, sortable: true, width: 110 },
    { checkStatus: '状态', isShow: true, sortable: true },
    { unReceivedAmount: '未核销金额(元)', isShow: false, sortable: true, type: 'money' }
  ]
}
// 表格左侧文案展示 data为列表接口获取后的数据 取data的某字段作为展示
export const tableDescConfig = function(data) {
  return [
    { text: '应收金额汇总(万元)', value: data.receivableAmountTotal },
    { text: '实际应收金额汇总(万元)', value: data.actualReceivableAmountTotal },
    { text: '已核销金额汇总(万元)', value: data.receivedAmountTotal }
  ]
}
