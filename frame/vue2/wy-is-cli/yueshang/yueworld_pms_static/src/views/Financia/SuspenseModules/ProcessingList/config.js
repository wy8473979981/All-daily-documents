/*
 * @Author: sdy
 * @LastEditors: sdy
 * @Description: 处理单列表配置
 */
import PUBFN from '@/utils/pubFn'

// 状态筛选
export const statusSearchConfig = function() {
  return [
    {
      name: '审核状态',
      key: 'auditStatus',
      list: [
        { label: '草稿', value: 1, dataKey: 'auditStatus01' },
        { label: '审核中', value: 2, dataKey: 'auditStatus02' },
        { label: '审核通过', value: 3, dataKey: 'auditStatus03' },
        { label: '驳回', value: 4, dataKey: 'auditStatus04' }
      ]
    },
    {
      name: '处理类型',
      key: 'dealType',
      list: [
        { label: '罚没', value: 1, dataKey: 'dealType01' },
        { label: '退款', value: 2, dataKey: 'dealType02' }
      ]
    }
  ]
}

// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入商家/企业编号/名称，品牌名，处理编号', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'programName', label: '', placeholder: '请选择项目', width: '220px', list: PUBFN.getOptionsList('allPros'), isFirst: true, change: this.proName },
    { itemType: 'datePicker', prop: 'createTime', label: '', startPlaceholder: '处理日期起', endPlaceholder: '处理日期止', rangeSeparator: '~', type: 'daterange', width: '220px', isFirst: true }
  ]
}

// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', showFixed: true, sortable: true, width: '100px' },
    { programName: '项目名称', sortable: true, isShow: true },
    { dealNo: '处理编号', sortable: true, isShow: true },
    { tenantName: '商家/企业', sortable: true, isShow: true },
    { brandName: '品牌名', isShow: true, sortable: true },
    { dealTypeText: '处理类型', isShow: true, sortable: true },
    { feeName: '费项', isShow: true, sortable: true },
    { dealAmount: '处理金额(元)', isShow: true, sortable: true, type: 'money' },
    { auditStatusText: '审核状态', isShow: true, sortable: true },
    { creatTime: '创建时间', isShow: false, sortable: true },
    { createor: '创建人', isShow: false, sortable: true },
    { updatedDate: '最后更新时间', isShow: false, sortable: true },
    { updater: '最后修改人', isShow: false, sortable: true }
  ]
}

// 表格左侧文案展示 data为列表接口获取后的数据 取data的某字段作为展示
export const tableDescConfig = function() {
  return [
    { text: '处理金额汇总(元)', value: 100000 }
  ]
}
