/*
 * @Author: sdy
 * @LastEditors: xueyx
 * @Description: 应收账单配置
 */
import { getOptionsLabel } from '@/filters/index'

// 搜索配置
export const searchConfig = function() {
  return [// 表单配置
    {
      itemType: 'input',
      prop: 'fuzzyEnquiry',
      label: '',
      placeholder: '请输入账单编号/合同编号/应收编号/商家/企业/品牌名',
      width: '232px',
      isFirst: true,
      isSearch: true
    },
    {
      itemType: 'selectDialog',
      prop: 'programName',
      label: '',
      placeholder: '请选择项目',
      width: '200px',
      isFirst: true,
      list: this.$PUBFN.getOptionsList('projectList')
    },
    {
      itemType: 'datePicker',
      prop: 'generateTime',
      label: '',
      startPlaceholder: '生成时间起',
      endPlaceholder: '生成时间止',
      rangeSeparator: '~',
      type: 'daterange',
      width: '220px',
      isFirst: true
    },
    {
      itemType: 'select',
      prop: 'contType',
      label: '',
      placeholder: '请选择合同类型',
      width: '200px',
      list: this.$PUBFN.getOptionsList('contTypes')
    },
    {
      itemType: 'selectDialog',
      prop: 'feeName',
      label: '',
      placeholder: '所有费项',
      width: '200px',
      list: this.$PUBFN.getOptionsList('allProjectFees')
    },
    {
      itemType: 'input',
      prop: 'billNo',
      label: '',
      placeholder: '账单编号起 ~ 账单编号止',
      type: 'daterange',
      width: '220px'
    },
    {
      itemType: 'select',
      prop: 'isPrintBill',
      label: '',
      placeholder: '请选择打印账单状态',
      width: '200px',
      list: this.$PUBFN.getOptionsList('billingStatus')
    }
  ]
}
// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { idx: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
    { billNo: '账单编号', sortable: true, isShow: true, minWidth: 100 },
    { programName: '项目名称', sortable: true, isShow: true, minWidth: 100 },
    { contNo: '合同编号', sortable: true, isShow: true, minWidth: 100 },
    { tenantName: '商家/企业', sortable: true, isShow: true, minWidth: 100 },
    { amountpayable: '应付金额(元)', sortable: true, isShow: true, minWidth: 100, type: 'money' },
    { isPrintBill: '是否打印账单', sortable: true, isShow: true, minWidth: 100 },
    { generateTime: '生成时间', sortable: true, isShow: true, minWidth: 100 },
    { brandName: '品牌名', sortable: true, isShow: false },
    { leaseArea: '租赁区域', sortable: false, isShow: false },
    { receivableNo: '应收编号', sortable: true, isShow: false },
    { feeName: '费项', sortable: false, isShow: false },
    { receivedAmount: '已核销金额(元)', sortable: true, isShow: false, type: 'money' },
    { receivableAmount: '应收金额(元)', sortable: true, isShow: false, type: 'money' },
    { subAmount: '减免金额(元)', sortable: true, isShow: false, type: 'money' },
    { contType: '合同类型', sortable: true, isShow: false, formatter: row => getOptionsLabel(row.contType, 'contTypes') }
  ]
}
