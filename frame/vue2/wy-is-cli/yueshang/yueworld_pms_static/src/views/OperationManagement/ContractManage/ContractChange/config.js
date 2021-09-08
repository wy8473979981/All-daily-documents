/*
 * @Author: wyz
 * @LastEditors: wyz
 * @Description:合同变更
*/

export const auditStatusSearchConfig = function() {
  return [
    {
      name: '状态',
      key: 'auditStatus',
      list: [
        { label: '审核通过', value: 1, dataKey: 'reviewedStatistics' },
        { label: '审核中', value: 2, dataKey: 'underReviewStatistics' },
        { label: '已驳回', value: 3, dataKey: 'rejectedStatistics' },
        { label: '草稿', value: 4, dataKey: 'draftStatistics' }
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
      placeholder: '审批号/品牌/租户/合同号',
      width: '220px',
      isFirst: true,
      isSearch: true
    },
    {
      itemType: 'selectDialog',
      prop: 'programName',
      label: '',
      placeholder: '所有项目',
      width: '200px',
      isFirst: true,
      list: this.$PUBFN.getOptionsList('globalSearchList'),
      listName: 'label',
      listValue: 'value',
      multiple: true
    },
    {
      itemType: 'select',
      prop: 'changeType',
      label: '',
      placeholder: '所有变更类型',
      width: '200px',
      isFirst: true,
      list: this.$PUBFN.getOptionsList('allChangeType'),
      listName: 'label',
      listValue: 'value',
      multiple: true
    }
  ]
}
// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { idx: '序号', type: 'index', sortable: true, isShow: true },
    { contNo: '合同编号', sortable: true, isShow: true },
    { programName: '项目名称', sortable: true, isShow: true },
    { tenantName: '租户', sortable: true, isShow: true },
    { changeType: '变更类型', sortable: true, isShow: true },
    { contractChangeNO: '变更审批编号', sortable: true, isShow: true },
    { auditStatus: '状态', sortable: true, isShow: true },
    { promoter: '发起人', sortable: false, isShow: true },
    { createdDate: '发起时间', sortable: true, isShow: true }
  ]
}
