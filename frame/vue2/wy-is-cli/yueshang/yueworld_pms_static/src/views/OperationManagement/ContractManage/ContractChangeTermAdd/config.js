/*
 * @Author: wyz
 * @LastEditors: wyz
 * @Description: 合约变更新增
 */

// 页面配置
export const fixedRentPageConfig = () => {
  return [
    {
      title: '固定', // 标题名
      component: require('./blocks/fixedRent.vue').default, // 内容组件引用
      dataKey: 'fixedRent', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      onMenu: false,
      showFlod: false,
      flodicon: false // 展示头部加号
    }
  ]
}
export const commissionRentPageConfig = () => {
  return [
    {
      title: '提成', // 标题名
      component: require('./blocks/commissionRent.vue').default, // 内容组件引用
      dataKey: 'commissionRent', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      onMenu: false,
      showFlod: false,
      flodicon: false // 展示头部加号
    }
  ]
}
export const startPageConfig = () => {
  return [
    {
      title: '基本信息', // 标题名
      component: require('./blocks/essentialData.vue').default, // 内容组件引用
      dataKey: 'essentialData', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon: false // 展示头部加号
    },
    {
      title: '商务信息', // 标题名
      component: require('./blocks/businessAffairs.vue').default, // 内容组件引用
      dataKey: 'businessAffairs', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon: false // 展示头部加号
    },
    {
      title: '起计日', // 标题名
      component: require('./blocks/beginDate.vue').default, // 内容组件引用
      dataKey: 'beginDate', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon: false // 展示头部加号
    },
    {
      title: '免租期', // 标题名
      component: require('./blocks/rentFreePeriod.vue').default, // 内容组件引用
      dataKey: 'rentFreePeriod', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon: false // 展示头部加号
    },
    {
      title: '周期性费用', // 标题名
      component: require('./blocks/periodic.vue').default, // 内容组件引用
      dataKey: 'periodic', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon: false // 展示头部加号
    }
  ]
}
export const endPageConfig = () => {
  return [
    {
      title: '一次性费用',
      dataKey: 'oneTimeFee', // 对应formData的key
      component: require('./blocks/oneTimeFee.vue').default, // 内容组件引用
      valiForm: ['formTableRules'], // 需要触发校验的表单
      flodicon: true // 展示头部加号
    },
    {
      title: '保证金', // 标题名
      component: require('./blocks/bond.vue').default, // 内容组件引用
      dataKey: 'bond', // 对应formData的key
      valiForm: ['formTableRules'], // 需要触发校验的表单
      flodicon: true // 展示头部加号
    },
    {
      title: '首账期', // 标题名
      component: require('./blocks/firstAccountPeriod.vue').default, // 内容组件引用
      dataKey: 'firstAccountPeriod', // 对应formData的key
      valiForm: ['formTableRules'], // 需要触发校验的表单
      flodicon: true // 展示头部加号
    },
    {
      title: '合同甲方信息', // 标题名
      component: require('./blocks/partyAsContract.vue').default, // 内容组件引用
      dataKey: 'partyAsContract', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon: false // 展示头部加号
    }
  ]
}
export const businessConfig = () => {
  return [
    {
      title: '商家开票信息', // 标题名
      component: require('./blocks/businessInvoice.vue').default, // 内容组件引用
      dataKey: 'businessInvoice', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon: false // 展示头部加号
    },
    {
      title: '商家合同信息', // 标题名
      component: require('./blocks/merchantContract.vue').default, // 内容组件引用
      dataKey: 'merchantContract', // 对应formData的key
    }
  ]
}
export const partyBsContractConfig = () => {
  return [
    {
      title: '合同乙方信息', // 标题名
      component: require('./blocks/partyBsContract.vue').default, // 内容组件引用
      dataKey: 'partyBsContract', // 对应formData的key
      flodicon: false // 展示头部加号
    }
  ]
}
