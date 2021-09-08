/*
 * @Author: xza
 * @LastEditors: xza
 * @Description: 税率配置项
 */
import PUBFN from '@/utils/pubFn'
import { formatNumber } from '@/utils'
// 状态筛选
export const statusSearchConfig = function() {
  return [
    {
      name: '状态',
      key: 'status',
      list: [
        { label: '正常', value: 1, dataKey: 'status01' },
        { label: '已失效', value: 2, dataKey: 'status02' }
      ]
    }
  ]
}
// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', multiple: true, label: '', placeholder: '请输入税率编码/税率名称关键字', width: '220px', isSearch: true, isFirst: true, change: this.proName },
    { itemType: 'selectDialog', prop: 'taxType', multiple: true, label: '', placeholder: '请选择税率类别', width: '200px', list: PUBFN.getOptionsList('taxTypeID'), isFirst: true, change: this.proName },
    { itemType: 'selectDialog', prop: 'taxCollectType', multiple: true, label: '', placeholder: '请选择征收类型', width: '200px', list: PUBFN.getOptionsList('taxCollectType'), isFirst: true, change: this.proName }
  ]
}
// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
    { taxId: '税率编码', sortable: true, isShow: true },
    { taxName: '税率名称', sortable: true, isShow: true },
    { taxType: '类别', sortable: true, isShow: true },
    { taxCollectType: '征收类型', sortable: true, isShow: true, fixedWidth: '150px' },
    { tax: '税值', isShow: true, sortable: true, type: 'rate', fixedWidth: '80px', valueDecimal: 0, formatter: row => formatNumber(row.tax, 'rate', 0) },
    { creatDate: '创建时间', isShow: true, sortable: true },
    { status: '状态', isShow: false, sortable: true },
    { thirdPartyId: '三方编码', isShow: false, sortable: true }
  ]
}
