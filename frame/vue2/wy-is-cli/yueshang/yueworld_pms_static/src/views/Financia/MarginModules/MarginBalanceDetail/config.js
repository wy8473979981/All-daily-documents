/*
 * @Author: xiaoxie
 * @Date: 2021-07-22 10:38:18
 * @Last Modified by: xiaoxie
 * @Last Modified time: 2021-08-27 14:41:18
 */
// 状态
export const statusSearchConfig = function() {
  return [
    {
      name: '来源类型',
      key: 'srcType',
      list: [
        { label: '收款', value: 1, dataKey: 'srcType01' },
        { label: '退款', value: 2, dataKey: 'srcType02' },
        { label: '罚没', value: 3, dataKey: 'srcType03' },
        { label: '冲抵', value: 4, dataKey: 'srcType04' },
        { label: '转换', value: 5, dataKey: 'srcType05' },
        { label: '反核销-收款', value: 6, dataKey: 'srcType06' },
        { label: '反核销-冲抵', value: 7, dataKey: 'srcType07' },
        { label: '付款反核销', value: 8, dataKey: 'srcType08' }
      ]
    }
  ]
}
// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入来源单号', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'datePicker', prop: 'verificationDate', label: '', startPlaceholder: '生成时间起', endPlaceholder: '生成时间止', rangeSeparator: '~', type: 'daterange', width: '220px', isFirst: true }
  ]
}
// 列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', width: 50, fixedWidth: 100, sortable: true, showFixed: true },
    { srcNo: '来源单号', sortable: true, isShow: true, fixedWidth: 250 },
    { amount: '金额(元) ', sortable: true, isShow: true, type: 'money', fixedWidth: 100 },
    { srcTypeText: '来源类型', sortable: true, isShow: true, fixedWidth: 250 },
    { verificationDate: '生成时间', sortable: true, isShow: true },
    { feeName: '费项', sortable: true, isShow: false },
    { programName: '项目', sortable: true, isShow: false },
    { contNo: '意向/合同编号', sortable: true, isShow: false },
    { tenantName: '商家', sortable: true, isShow: false },
    { brandName: '品牌', isShow: false, sortable: false },
    { marginAccountName: '收款单位', sortable: true, isShow: false }
  ]
}
// 表格左侧文案展示 data为列表接口获取后的数据 取data的某字段作为展示
export const tableDescConfig = function(data) {
  return [
    { text: '项目名称：', value: data.programName },
    { text: '意向/合同编号：', value: data.contNo },
    { text: '商家：', value: data.tenantName },
    { text: '品牌：', value: data.brandName },
    { text: '费项：', value: data.feeName },
    { text: '收款单位：', value: data.marginAccountName }
  ]
}
