/*
 * @Author: xiaoxie
 * @LastEditors:  xiaoxie
 * @Description: 进场装修配置文件
 */
import PUBFN from '@/utils/pubFn'
// 审核状态
export const statusSearchConfig = function() {
  return [
    {
      name: '审核状态',
      key: 'checkStatus',
      list: [
        { label: '草稿', value: 1, dataKey: 'checkStatus01' },
        { label: '审核中', value: 2, dataKey: 'checkStatus02' },
        { label: '审核通过', value: 3, dataKey: 'checkStatus03' },
        { label: '已驳回', value: 4, dataKey: 'checkStatus04' }
      ]
    }
  ]
}
// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', placeholder: '请输入租赁区域/品牌名称/商家名称/合同编号', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'programName', multiple: true, placeholder: '请选择项目', width: '220px', list: PUBFN.getOptionsList('allProject'), isFirst: true }
  ]
}
// 列表配置
export const tableConfig = function() {
  return [
    { t0: '序号', type: 'index', sortable: true, showFixed: true },
    { decorationEnterNo: '进场装修编号', sortable: true, isShow: true },
    { programName: '项目', sortable: true, isShow: true, fixedWidth: 100 },
    { tenantName: '商家', sortable: true, isShow: true },
    { brandName: '品牌', sortable: true, isShow: true },
    { contNo: '合同', isShow: true, sortable: true },
    { leaseArea: '租赁区域', sortable: true, isShow: true },
    { decorationEnterDate: '进场装修日期', sortable: true, isShow: true },
    { decorateEndDate: '装修结束日期', sortable: true, isShow: true },
    { acceptanceDate: '验收日期', sortable: true, isShow: true },
    { checkStatusText: '审核状态', sortable: true, isShow: true },
    { creator: '创建人', sortable: true, isShow: false },
    { createTime: '创建时间', sortable: true, isShow: false },
    { Modifier: '修改人', sortable: true, isShow: false },
    { updateTime: '修改时间', sortable: true, isShow: false }
  ]
}
