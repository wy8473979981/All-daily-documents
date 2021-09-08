/*
 * @Author: sdy
 * @LastEditors: sdy
   @Description: 余额查询配置
 */
import PUBFN from '@/utils/pubFn'
import { getOptionsLabel } from '@/filters/index'

// 状态筛选
export const statusSearchConfig = function() {
  return [
    {
      name: '末名款项',
      key: 'unknownType',
      list: [
        { label: '是', value: 1, dataKey: 'unknownType01' },
        { label: '否', value: 2, dataKey: 'unknownType02' }
      ]
    }
  ]
}
const list = [
  { label: '是', value: 1 },
  { label: '否', value: 2 }
]
// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入/商家/企业编号/名称/品牌名', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'programName', label: '', placeholder: '请选择项目', width: '220px', list: PUBFN.getOptionsList('projectName'), isFirst: true, change: this.inputChange },
    { itemType: 'selectDialog', prop: 'feeName', label: '', placeholder: '请选择费项', width: '200px', list: PUBFN.getOptionsList('feesName'), isFirst: true },
    { itemType: 'selectDialog', prop: 'accountName', label: '', placeholder: '请选择收款单位', width: '200px', list: PUBFN.getOptionsList('accountNames'), isFirst: true }
  ]
}

// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', sortable: true, showFixed: true },
    { feeName: '费项', sortable: true, isShow: true },
    { accountName: '收款单位', sortable: true, isShow: true, width: '260px' },
    { programName: '项目名称', sortable: true, isShow: true },
    { tenantName: '商家/企业', sortable: true, isShow: true },
    { tenantId: '商家/企业编号', sortable: true, isShow: false },
    { brandName: '品牌名', sortable: true, isShow: true },
    { summaryProvisionalReceivables: '暂收款总额(元)', isShow: true, sortable: true, type: 'money' },
    { confiscationAmount: '罚没金(元)', isShow: true, sortable: true, type: 'money' },
    { refundFee: '退款金额(元)', isShow: true, sortable: true, type: 'money' },
    { offsetAmount: '已冲抵(元)', isShow: true, sortable: true, type: 'money' },
    { temporaryReceiptsBalance: '暂收款余额(元)', isShow: true, sortable: true, type: 'money' },
    { unknownType: '未名款项', sortable: true, isShow: true, formatter: row => getOptionsLabel(row.unknownType, list) },
    { creatDate: '创建时间', sortable: true, isShow: false },
    { updatedDate: '最后更新时间', sortable: true, isShow: false },
    { bankName: '收款银行', isShow: false },
    { bankAccount: '银行账号', isShow: false }

  ]
}

// 表格左侧文案展示 data为列表接口获取后的数据 取data的某字段作为展示
export const tableDescConfig = function() {
  return [
    { text: '暂收款总额汇总(万元)', value: 110 },
    { text: '暂收款余额汇总(万元)', value: 52.1 }
  ]
}
