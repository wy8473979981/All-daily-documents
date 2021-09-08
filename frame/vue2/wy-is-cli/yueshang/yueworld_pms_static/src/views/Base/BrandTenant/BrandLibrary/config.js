/*
 * @Author: shuyuan
 * @LastEditors: shuyuan
 * @Description: 品牌库
 */
import PUBFN from '@/utils/pubFn'

// 搜索配置
export const searchConfig = function() {
  return [
    { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入品牌名关键字', width: '220px', isSearch: true, isFirst: true },
    { itemType: 'selectDialog', prop: 'brandLevel', label: '', placeholder: '请选择品牌等级', width: '200px', list: PUBFN.getOptionsList('brandLevelChoice'), isFirst: true, multiple: true },
    { itemType: 'selectDialog', prop: 'brandOperateType', label: '', placeholder: '请选择经营性质', width: '200px', list: PUBFN.getOptionsList('brandOperateType'), isFirst: false, multiple: true },
    { itemType: 'selectDialog', prop: 'brandStoreType', label: '', placeholder: '请选择连锁/单店', width: '200px', list: PUBFN.getOptionsList('brandStoreType'), isFirst: false, multiple: true },
    { itemType: 'selectDialog', prop: 'brandShopMode', label: '', placeholder: '请选择开店方式', width: '200px', list: PUBFN.getOptionsList('brandShopMode'), isFirst: false, multiple: true }
  ]
}

// 左侧列表配置
// 表格配置
export const leftConfig = function() {
  return {
    title: '业态', // 大标题
    subTitle: '', // 副标题
    topBtn: true, // 进阶配置
    dataList: this.$PUBFN.getOptionsList('brandFormatName1')
  }
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
    { brandLevel: '品牌等级', sortable: true, isShow: true },
    { brandOperateType: '经营性质', isShow: true },
    { brandFormatName: '业态', isShow: true, sortable: true },
    { checkStatusName: '审核状态', isShow: true, sortable: true },
    { brandStoreType: '连锁/单店', isShow: false, sortable: true },
    { brandShopMode: '开店方式', isShow: false, sortable: true },
    { brandGroupName: '集团名称', isShow: false, sortable: true },
    { brandHqAddress: '总部地址', isShow: false, sortable: true },
    { brandKeyProvince: '重点发展省份', isShow: false, sortable: true },
    { brandKeyCity: '主要分布城市', isShow: false, sortable: true },
    { brandPerCustomerTransaction: '客单价(元)', isShow: false, sortable: true, type: 'money' }
  ]
}

// 表格左侧文案展示 data为列表接口获取后的数据 取data的某字段作为展示
export const tableDescConfig = function(data) {
  return [
    { text: 'S级品牌数量(个)', value: data.brandQtyS, decimal: 0 },
    { text: 'A级品牌数量(个)', value: data.brandQtyA, decimal: 0 },
    { text: 'B级品牌数量(个)', value: data.brandQtyB, decimal: 0 },
    { text: 'C级品牌数量(个)', value: data.brandQtyC, decimal: 0 },
    { text: 'D级品牌数量(个)', value: data.brandQtyD, decimal: 0 }
  ]
}
