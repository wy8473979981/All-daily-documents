/*
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-07-28 13:23:33
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-08-11 14:56:49
 */
// import PUBFN from '@/utils/pubFn'
// 状态筛选
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
    { itemType: 'input', prop: '', label: '', placeholder: '请输入企业名称关键字', width: '220px', isFirst: true }, // TODO 字段没找到
    { itemType: 'selectDialog', prop: 'programName', label: '', placeholder: '请选择项目', width: '200px', isFirst: true, list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
    { itemType: 'selectDialog', prop: 'tenantType', label: '', placeholder: '请选择企业性质', width: '200px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
    { itemType: 'selectDialog', prop: 'tenantCompanyQuailty', label: '', placeholder: '请选择企业属性', width: '200px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' }
  ]
}
// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [

    { idx: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
    { programName: '项目', sortable: true, isShow: true },
    { tenantId: '企业编码', sortable: true, isShow: true },
    { tenantTaxpayerType: '纳税人类型', sortable: true, isShow: true },
    { tenantName: '企业名称', sortable: true, isShow: true },
    { tenantType: '企业性质', isShow: true, sortable: true, formatter: row => {
      if (row.tenantType === 0) {
        return '个人'
      }
      return '公司'
    } },
    { tenantCompanyQuailty: '企业属性', isShow: true, sortable: true },
    { checkStatus: '审核状态', sortable: true, isShow: true }
  ]
}
// 表格左侧文案展示 data为列表接口获取后的数据 取data的某字段作为展示
export const tableDescConfig = function(data) {
  return [
    { text: '公司商家(个)', value: data.total },
    { text: '个人商家(个)', value: data.total }
  ]
}
