/*
 * @Author: shuyuan
 * @LastEditors: shuyuan
 * @Description: 品牌变更列表
 */
import PUBFN from '@/utils/pubFn'
// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入品牌名关键字', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'brandLevel', label: '', placeholder: '请选择品牌等级', width: '200px', list: PUBFN.getOptionsList('brandLevel'), isFirst: true, multiple: true },
    { itemType: 'select', prop: 'brandOperateType', label: '', placeholder: '请选择经营性质', width: '200px', list: PUBFN.getOptionsList('brandOperateType'), isFirst: false },
    { itemType: 'select', prop: 'brandStoreType', label: '', placeholder: '请选择连锁/单店', width: '200px', list: PUBFN.getOptionsList('brandStoreType'), isFirst: false },
    { itemType: 'select', prop: 'brandShopMode', label: '', placeholder: '请选择开店方式', width: '200px', list: PUBFN.getOptionsList('brandShopMode'), isFirst: false }
  ]
}
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

// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { id: '序号', type: 'index', width: 50, sortable: true, showFixed: true },
    { brandName: '品牌名', sortable: true, isShow: true },
    { brandId: '品牌编码', sortable: true, isShow: true },
    { brandOtherName: '品牌别名', sortable: true, isShow: true },
    { changes: '变更项目', sortable: true, isShow: true },
    { checkStatusName: '审核状态', isShow: true, sortable: true },
    { applyDate: '发起时间', isShow: true, sortable: true },
    { completeDate: '审核结束时间', isShow: true, sortable: true },
    { brandCradle: '品牌发源地', isShow: false, sortable: true },
    { brandFormatName: '所属业态', isShow: false, sortable: true },
    { brandLevel: '品牌等级', isShow: false, sortable: true },
    { brandOperateType: '经营性质', isShow: false, sortable: true },
    { brandShopMode: '开店方式', isShow: false, sortable: true },
    { brandStoreType: '连锁/单店', isShow: false, sortable: true },
    { brandGroupName: '集团名称', isShow: false, sortable: true },
    { brandHqAddress: '总部地址', isShow: false, sortable: true },
    { brandKeyProvince: '重点发展省份', isShow: false, sortable: true },
    { brandKeyCity: '主要分布城市', isShow: false, sortable: true },
    { brandPerCustomerTransaction: '客单价(元)', isShow: false, sortable: true, type: 'money' }
  ]
}
