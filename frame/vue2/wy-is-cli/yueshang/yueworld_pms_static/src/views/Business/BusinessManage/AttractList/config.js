/*
* @Author: zsj
* @Date: 2021-07-03 14:34:01
 * @Last Modified by: xueyx
 * @Last Modified time: 2021-07-03 14:35:46
 */

import PUBFN from '@/utils/pubFn'

// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入文档名称', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'programName', label: '', placeholder: '所有项目', width: '200px', list: PUBFN.getOptionsList('allProject'), isFirst: true },
    { itemType: 'treeDialog', multipleChoice: true, prop: 'toolkitType', label: '', placeholder: '所有文档', width: '200px', list: PUBFN.getOptionsList('docKinds'), isFirst: true }
  ]
}

// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { id: '序号', type: 'index', showFixed: true },
    { programName: '项目名称', sortable: true, isShow: true },
    { toolkitType: '工具包分类', isShow: true },
    { fileType: '文档分类', isShow: true },
    { fileName: '文档名称', isShow: true, showFixed: true },
    { creator: '创建人', isShow: false },
    { createTime: '创建时间', isShow: false }
  ]
}

