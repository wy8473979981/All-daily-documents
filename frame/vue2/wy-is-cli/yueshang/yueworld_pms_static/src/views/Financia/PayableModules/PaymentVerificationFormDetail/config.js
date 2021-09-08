/*
 * @Author: jllk
 * @Date: 2021-08-05 11:07:52
 * @Last Modified by:   jllk
 * @Last Modified time: 2021-08-05 11:07:52
 */
// 页面配置
export const pageConfig = () => {
  return [
    {
      title: '基本信息', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      flodSlot: 'baseInfo', // flod右侧插槽
      component: require('./blocks/Information.vue').default, // 内容组件引用
      dataKey: 'baseInfo', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon: false // 展示头部加号
    },
    {
      title: '付款信息', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      dataKey: 'baseInfoPayment', // 对应formData的key
      component: require('./blocks/PaymentInformation.vue').default, // 内容组件引用
      flodicon: false, // 展示头部加号
      valiForm: ['rulesForm'] // 需要触发校验的表单

    },
    {
      title: '收款信息', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      dataKey: 'baseInfoBilling', // 对应formData的key
      component: require('./blocks/BillingMessage.vue').default, // 内容组件引用
      flodicon: false, // 展示头部加号
      valiForm: ['rulesForm'] // 需要触发校验的表单

    },
    {
      title: '核销明细', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      dataKey: 'detailedData', // 对应formData的key
      component: require('./blocks/DetailsTable.vue').default, // 内容组件引用
      flodicon: false // 展示头部加号
    },
    {
      title: '审核历史', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      dataKey: 'detailedData', // 对应formData的key
      component: require('./blocks/ApprovalTable.vue').default // 内容组件引用
    }
  ]
}

