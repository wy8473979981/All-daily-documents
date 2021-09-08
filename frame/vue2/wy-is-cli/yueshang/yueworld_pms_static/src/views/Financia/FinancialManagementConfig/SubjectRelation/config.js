/*
 * @Author: xza
 * @LastEditors: xza
 * @Description: 费用项-科目关系配置
 */
import PUBFN from '@/utils/pubFn'
// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', multiple: true, label: '', placeholder: '请输入费项/科目名称关键字', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'subjectInfo', multiple: true, label: '', placeholder: '请选择科目', list: PUBFN.getOptionsList('allProjectFee'), width: '200px', isFirst: true },
    { itemType: 'selectDialog', prop: 'feeName', multiple: true, label: '', placeholder: '请选择费项', list: PUBFN.getOptionsList('allProjectFees'), width: '200px', isFirst: true }
  ]
}

// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
    { accountName: '账套', sortable: true, isShow: true },
    { feeName: '费项名称', sortable: true, isShow: true },
    { subjectInfo: '科目编码及名称', sortable: true, isShow: true },
    { creatDate: '创建时间', sortable: true, isShow: true },
    { remark: '备注', isShow: false, sortable: true }
  ]
}

// 左侧列表配置
export const leftConfig = function() {
  return {
    title: '项目', // 大标题
    subTitle: '', // 副标题
    topBtn: false, // 进阶配置
    dataList: this.$PUBFN.getOptionsList('freeRelationship')
  }
}
