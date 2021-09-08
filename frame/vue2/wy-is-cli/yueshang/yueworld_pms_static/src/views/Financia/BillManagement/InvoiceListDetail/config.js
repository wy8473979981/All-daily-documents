/*
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description: 配置
 */

import { invoiceOfListApi } from '@/api'

// 页面配置
export const pageConfig = () => {
  return [
    {
      title: '基本信息', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      dataKey: 'detailInfo', // 对应formData的key
      component: require('./blocks/baseInfo.vue').default // 内容组件引用
    },
    {
      title: '发票明细', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      dataKey: 'invoiceId', // 获取列表的标识
      component: require('./blocks/invoiceList.vue').default // 内容组件引用
    }
  ]
}

// 获取详情信息
export const getInvoiceOfListDetail = async function(params) {
  return await invoiceOfListApi.invoiceOfListDetail(params)
}
// 获取发票明细数据
export const getDetailDataList = async function(params) {
  return await invoiceOfListApi.detailList(params)
}
// 详情页配置信息结束
