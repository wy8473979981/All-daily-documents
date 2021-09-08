/*
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-07-28 14:27:59
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-07-28 15:00:43
 */
export const statusSearchConfig = function() {
  return [
    {
      name: '审核状态',
      key: 'auditStatus',
      list: [
        { label: '草稿', value: 1, dataKey: 'draftStatistics' },
        { label: '审核中', value: 2, dataKey: 'underReviewStatistics' },
        { label: '审核通过', value: 3, dataKey: 'reviewedStatistics' },
        { label: '已驳回', value: 4, dataKey: 'rejectedStatistics' }
      ]
    }
  ]
}
// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入企业名称关键字', width: '220px', isFirst: true }, // TODO 字段没找到
    { itemType: 'select', prop: 'programName', label: '', placeholder: '请选择项目', width: '200px', isFirst: true, list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value', multiple: true },
    { itemType: 'select', prop: 'tenantType', label: '', placeholder: '请选择企业性质', width: '200px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value', multiple: true },
    { itemType: 'select', prop: 'tenantName', label: '', placeholder: '请选择企业名称', width: '200px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value', multiple: true }
  ]
}
// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { idx: '序号', type: 'index', width: '100px' },
    { programName: '项目', isShow: true, sortable: true },
    { tenantId: '企业编码', sortable: true, isShow: true },
    { tenantName: '企业名称', sortable: true, isShow: true },
    { tenantType: '企业性质', sortable: true, isShow: true, formatter: row => {
      if (row.tenantType === 0) {
        return '个人'
      }
      return '公司'
    } },
    { changes: '变更内容', sortable: true, isShow: true },
    { checkStatus: '审核状态', sortable: true, isShow: true, formatter: row => {
      if (row.checkStatus === '0') {
        return '已审核'
      }
      return '审核中'
    } },
    { applyDate: '发起时间', isShow: true, sortable: true },
    { completeDate: '审核结束时间', isShow: true, sortable: true }
  ]
}
// // 表格左侧文案展示 data为列表接口获取后的数据 取data的某字段作为展示
// export const tableDescConfig = function(data) {
//   return [
//     { text: '公司商家(个)', value: data.total },
//     { text: '个人商家(个)', value: data.total }
//   ]
// }
