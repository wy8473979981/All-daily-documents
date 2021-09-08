/*
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 配置项
 */
import PUBFN from '@/utils/pubFn'

// 列表数据模板配置 调用yapi时忽视
export const dataTmp = {
  t1: 'FP-202030000',
  t2: '测试项目',
  t3: '珠海市酒店管理有限公司',
  t4: '普票',
  t5: 1,
  t6: 1,
  t7: '2020-05-',
  t8: '失败'
}

// 状态筛选
export const statusSearchConfig = function() {
  return [
    {
      name: '审批状态',
      key: 'searchStatus1',
      list: [
        { label: '草稿', value: 1, dataKey: 'total' },
        { label: '审核中', value: 2, dataKey: 'total' },
        { label: '审核通过', value: 3, dataKey: 'total' },
        { label: '已驳回', value: 4, dataKey: 'total' }
      ]
    },
    {
      name: '审批状态2',
      key: 'searchStatus2',
      list: [
        { label: '草稿', value: 1, dataKey: 'total' },
        { label: '审核中', value: 2, dataKey: 'total' },
        { label: '审核通过', value: 3, dataKey: 'total' },
        { label: '已驳回的', value: 4, dataKey: 'total' }
      ]
    }
  ]
}

// 搜索配置
export const searchConfig = function() {
  console.log('this', this)
  return [
    { itemType: 'input', prop: 's1', label: '', placeholder: '请输入合同编号、发票编号', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'select', prop: 's2', label: '', placeholder: '所有项目', width: '220px', list: PUBFN.getOptionsList('globalSearchList'), isFirst: true, change: this.inputChange },
    { itemType: 'select', prop: 's3', label: '', placeholder: '所有费项', width: '200px', list: PUBFN.getOptionsList('globalSearchList') },
    { itemType: 'datePicker', type: 'date', prop: 's4', label: '', placeholder: '应收日期', width: '240px' }
  ]
}

// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
    { t1: '发票编号', sortable: true, isShow: true },
    { t2: '项目', sortable: true, isShow: true },
    { t3: '租户', sortable: true },
    { t4: '类型', hasClose: true, isShow: true, tableList: [
      { t5: '开票金额(元)', isShow: true, sortable: true, width: 140, type: 'money' },
      { t6: '税额(元)', isShow: true, sortable: true, width: 140, type: 'money' },
      { t7: '发票日期', isShow: true, sortable: true, width: 140 },
      { t8: '状态', isShow: true, sortable: true, width: 140 }
    ] },
    { t5: '开票金额(元)', isShow: true, sortable: true, width: 140, type: 'money' },
    { t6: '税额(元)', sortable: true, isShow: true },
    { t7: '发票日期', sortable: true },
    { t8: '状态', sortable: true }
  ]
}

// 表格左侧文案展示 data为列表接口获取后的数据 取data的某字段作为展示
export const tableDescConfig = function(data) {
  return [
    { text: '建筑面积(m²)', value: data.total },
    { text: '计租面积(m²)', value: data.total }
  ]
}
