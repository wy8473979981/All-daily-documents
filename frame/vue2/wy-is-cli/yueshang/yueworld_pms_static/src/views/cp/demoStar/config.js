/*
 * @Author: xza
 * @LastEditors: xza
 * @Description: 辅助核算配置
 */
import PUBFN from '@/utils/pubFn'

// 状态删选列表
export const statusSearchConfig = function() {
  return [
    {
      name: '状态',
      key: 'data',
      list: [
        { label: '正常', value: 1, dataKey: 'normal' },
        { label: '已失效', value: 2, dataKey: 'notnormal' }
      ]

    }
  ]
}

// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'assistingId', multiple: true, label: '', placeholder: '请输入业务编码/辅助核算', width: '220px', isFirst: true },
    { itemType: 'select', prop: 'assistingMold', multiple: true, label: '', placeholder: '请选择核算类型', width: '220px', list: PUBFN.getOptionsList('globalSearchList'), isFirst: true }
  ]
}

// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
    { assistingId: '辅助核算编码', sortable: true, isShow: true },
    { assistingName: '辅助核算名称', sortable: true, isShow: true },
    { assistingMold: '核算类型', sortable: true, isShow: true },
    { status: '状态', isShow: true },
    { creatDate: '创建时间', isShow: true, sortable: true, width: 140 }
  ]
}
