/*
 * @Author: wyz
 * @LastEditors: wyz
 * @Description: 合同台账
 */

import PUBFN from '@utils/pubFn'

export const statusSearchConfig = function() {
  return [
    {
      name: '合同状态',
      key: 'contractStates',
      list: [
        { label: '待审核', value: 1, dataKey: 'reviewing' },
        { label: '已审核', value: 2, dataKey: 'reviewed' },
        { label: '已解约', value: 3, dataKey: 'rescinded' },
        { label: '已清算', value: 4, dataKey: 'cleared' }
      ]
    },
    {
      name: '合同类型',
      key: 'contType',
      list: [
        { label: '招商合同', value: 1, dataKey: 'business' },
        { label: '多经合同', value: 2, dataKey: 'meridian' },
        { label: '写字楼合同', value: 3, dataKey: 'officeBuilding' }
      ]
    },
    {
      name: '合同性质',
      key: 'contNature',
      list: [
        { label: '新租', value: 1, dataKey: 'newRent' },
        { label: '续租', value: 2, dataKey: 'renewal' }
      ]
    }
  ]
}
export const tableDescConfig = function(data) {
  return [
    { text: '应收金额统计（万元）：', value: data.receivableMoney },
    { text: '已签约计租面积（m²）：', value: data.floorLeasableArea }
  ]
}
// 搜索配置
export const searchConfig = function() {
  return [// 表单配置
    {
      itemType: 'input',
      prop: 'fuzzyEnquiry',
      label: '',
      placeholder: '请输入商家/企业/品牌名称，租赁区域、合同编号',
      width: '220px',
      isFirst: true,
      isSearch: true
    },
    {
      itemType: 'selectDialog',
      prop: 'programName',
      multiple: true,
      label: '',
      placeholder: '请选择项目',
      width: '200px',
      list: PUBFN.getOptionsList('projectList'),
      isFirst: true,
      change: this.proName
    },
    {
      itemType: 'select',
      prop: 'contractExpirationDay',
      label: '',
      placeholder: '合同到期时间',
      width: '200px',
      isFirst: false,
      list: this.$PUBFN.getOptionsList('contractExpirationDayList'),
      listName: 'label',
      listValue: 'value',
      multiple: false,
      clearable: true
    },
    {
      itemType: 'select',
      prop: 'receivableTime',
      label: '',
      placeholder: '应收到期时间',
      width: '200px',
      isFirst: false,
      list: this.$PUBFN.getOptionsList('receivableTime'),
      listName: 'label',
      listValue: 'value',
      multiple: false,
      clearable: true
    },
    {
      itemType: 'treeDialog',
      prop: 'brandFormatName',
      label: '',
      placeholder: '签约业态',
      width: '200px',
      isFirst: false,
      list: this.$PUBFN.getOptionsList('brandFormatName'),
      listName: 'label',
      listValue: 'value',
      multiple: false
    },
    {
      itemType: 'select',
      prop: 'leasAreaStart',
      label: '',
      placeholder: '租赁面积起始',
      width: '200px',
      isFirst: false,
      list: [],
      listName: 'label',
      listValue: 'value',
      multiple: true
    },
    {
      itemType: 'select',
      prop: 'leasAreaEnd',
      label: '',
      placeholder: '租赁面积终止',
      width: '200px',
      isFirst: false,
      list: [],
      listName: 'label',
      listValue: 'value',
      multiple: true
    },
    {
      itemType: 'datePicker',
      prop: 'contBeginDates',
      type: 'daterange',
      label: '',
      isFirst: false,
      startPlaceholder: '合同起始日期起',
      rangeSeparator: '~',
      endPlaceholder: '合同起始日期止',
      width: '246px'
    },
    {
      itemType: 'datePicker',
      prop: 'contEndDates',
      type: 'daterange',
      label: '',
      isFirst: false,
      startPlaceholder: '合同结束日期起',
      rangeSeparator: '~',
      endPlaceholder: '合同结束日期止',
      width: '246px'
    }]
}
// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { idx: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
    { programName: '项目名称', sortable: true, isShow: true },
    { tenantName: '商家/企业', sortable: true, isShow: true },
    { contNo: '合同编号', sortable: true, isShow: true },
    { contType: '合同类型', sortable: true, isShow: true },
    { leaseArea: '租赁区域', sortable: true, isShow: true },
    { contractStates: '合同状态', sortable: true, isShow: true },
    { contNature: '合同性质', sortable: true, isShow: true },
    { createdDate: '创建日期', sortable: true, isShow: true },
    { brandName: '品牌名', sortable: true, isShow: false },
    { textType: '文本类型', sortable: true, isShow: false },
    { meterRentarea: '计租面积', sortable: true, isShow: false },
    { startDate: '起始日期', sortable: true, isShow: false },
    { endDate: '截止日期', sortable: true, isShow: false }
  ]
}
