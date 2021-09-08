/*
 * @Author: wyz
 * @LastEditors: wyz
 * @Description: 撤场清算
 */

export const auditStatusSearchConfig = function() {
  return [
    {
      name: '状态',
      key: 'auditStatus',
      list: [
        { label: '草稿', value: 4, dataKey: 'draftStatistics' },
        { label: '审核中', value: 2, dataKey: 'underReviewStatistics' },
        { label: '审核通过', value: 1, dataKey: 'reviewedStatistics' },
        { label: '已驳回', value: 3, dataKey: 'rejectedStatistics' }
      ]
    }
  ]
}
// 搜索配置
export const searchConfig = function() {
  return [// 表单配置
    {
      itemType: 'input',
      prop: 'fuzzyEnquiry',
      label: '',
      placeholder: '合同编号/商家/品牌/租赁区域',
      width: '220px',
      isFirst: true,
      isSearch: true
    },
    {
      itemType: 'selectDialog',
      prop: 'programName',
      label: '',
      placeholder: '请选择项目',
      width: '220px',
      isFirst: true,
      list: this.$PUBFN.getOptionsList('globalSearchList'),
      listName: 'label',
      listValue: 'value',
      multiple: true
    },
    {
      itemType: 'datePicker',
      prop: 'realEedDates',
      label: '',
      width: '246px',
      startPlaceholder: '清算日期起',
      rangeSeparator: '~',
      endPlaceholder: '清算日期止',
      isFirst: true,
      type: 'daterange'
    }
  ]
}
// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { idx: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
    { programName: '项目名称', sortable: true, isShow: true },
    { contClearNO: '清算编号', sortable: true, isShow: true },
    { contNo: '合同号', sortable: true, isShow: true },
    { tenantName: '商家/企业', sortable: true, isShow: true },
    { leaseArea: '租赁区域', sortable: true, isShow: true },
    { realEedDate: '清算日期', sortable: true, isShow: true },
    // { brandName: '品牌', sortable: true, isShow: true },
    // { contFallDate: '解约日期', sortable: true, isShow: true },
    // { creater: '创建人', sortable: true, isShow: true },
    { auditStatus: '状态', sortable: true, isShow: true }
  ]
}
