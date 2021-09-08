/*
 * @Author: sdy
 * @LastEditors: sdy
 * @Description: 余额查询暂收款流水
 */

// 状态筛选
export const statusSearchConfig = function() {
  return [
    {
      name: '来源类型',
      key: 'sourceType',
      list: [
        { label: '收款', value: 1, dataKey: 'sourceType01' },
        { label: '退款', value: 2, dataKey: 'sourceType02' },
        { label: '罚没', value: 3, dataKey: 'sourceType03' },
        { label: '冲抵', value: 4, dataKey: 'sourceType04' },
        { label: '转换', value: 5, dataKey: 'sourceType05' },
        { label: '反核销-收款', value: 6, dataKey: 'sourceType06' },
        { label: '反核销-冲抵', value: 7, dataKey: 'sourceType07' },
        { label: '付款反核销', value: 8, dataKey: 'sourceType08' }

      ]
    }
  ]
}
// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入流水编号/单据编号', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'datePicker', prop: 'generationTime', label: '', startPlaceholder: '生成时间起', endPlaceholder: '生成时间止', rangeSeparator: '~', type: 'daterange', width: '206px', isFirst: true }
  ]
}
// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', fixed: true, showFixed: true },
    { serialNumber: '流水编号', sortable: true, isShow: true },
    { documentNumber: '单据编号', sortable: true, isShow: true },
    { amountofMoney: '金额(元)', sortable: true, isShow: true, type: 'money' },
    { sourceTypeText: '来源类型', sortable: true, isShow: true, fixedWidth: 230 },
    { generationTime: '生成时间', sortable: true, isShow: true }

  ]
}
// 表格左侧文案展示 data为列表接口获取后的数据 取data的某字段作为展示
export const tableDescConfig = function(data) {
  return [
    { text: '项目名称', value: data.programName },
    { text: '商家/企业名称', value: data.tenantName },
    { text: '费项', value: data.feeName },
    { text: '收款单位', value: data.accountName }
  ]
}
