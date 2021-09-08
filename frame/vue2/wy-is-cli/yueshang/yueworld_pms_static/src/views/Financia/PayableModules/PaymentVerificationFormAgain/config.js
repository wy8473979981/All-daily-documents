/*
 * @Author: jllk
 * @LastEditors: jllk
 * @Description: 付款核销单-审核中配置
 */

// 页面配置
export const pageConfig = () => {
  return [
    {
      title: '基础信息', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      flodSlot: 'baseInfo', // flod右侧插槽
      component: require('./blocks/form.vue').default, // 内容组件引用
      dataKey: 'baseInfo' // 对应formData的key
    },
    {
      title: '付款信息', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      flodSlot: 'baseInfoPayment', // flod右侧插槽
      component: require('./blocks/Paymentform.vue').default, // 内容组件引用
      dataKey: 'baseInfoPayment' // 对应formData的key
    },
    {
      title: '收款信息', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      flodSlot: 'baseInfoBilling', // flod右侧插槽
      component: require('./blocks/Receiveform.vue').default, // 内容组件引用
      dataKey: 'baseInfoBilling' // 对应formData的key
    },
    {
      title: '核销明细', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      dataKey: 'detailedData', // 对应formData的key
      component: require('./blocks/Table.vue').default // 内容组件引用
    },
    {
      title: '审核历史', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      dataKey: 'detailedData', // 对应formData的key
      component: require('./blocks/ApprovalTable.vue').default // 内容组件引用
    }

  ]
}
