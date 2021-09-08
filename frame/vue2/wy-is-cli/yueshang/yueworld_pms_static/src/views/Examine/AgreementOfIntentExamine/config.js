/*
 * @Description: 意向协议
 * @Author: zengcheng
 * @Date: 2021-06-30 14:15:54
 * @LastEditors: fhj
 * @LastEditTime: 2021-08-26 10:53:56
 */
export const pageConfig = (showMenu, contract, edit) => {
  // Contract 合同签署  1 甲方 2 乙方  3 第三方
  const baseList = [

    // {
    //   title: '操作',
    //   showFlod: true,
    //   hiddenFlod: false, // 默认收起
    //   slot: 'operation' // 内容插槽
    // }
  ]
  // 乙方
  const contractList = [
    {
      title: '乙方合同信息', // 标题名
      showFlod: true, // 是./blocks/.vue
      component: require('./blocks/oneShopOnePrice.vue').default, // 内容组件引用
      dataKey: 'oneShopOnePrice' // 对应formData的key
    }
  ]
  const editList = [
    {
      title: '意向协议预警', // 标题名
      showFlod: true, // 是./blocks/.vue
      component: require('./blocks/agreementOfIntentEarlyWarning.vue').default, // 内容组件引用
      dataKey: 'agreementOfIntentEarlyWarning' // 对应formData的key
    },
    {
      title: '一铺一价表', // 标题名
      showFlod: true, // 是./blocks/.vue
      component: require('./blocks/oneShopOnePricetrs.vue').default, // 内容组件引用
      dataKey: 'oneShopOnePricetrs' // 对应formData的key
    },
    {
      title: '基本信息对比', // 标题名
      showFlod: true, // 是./blocks/.vue
      component: require('./blocks/baseInfoCompare.vue').default, // 内容组件引用
      dataKey: 'baseInfoCompare' // 对应formData的key
    },
    {
      title: '铺位预算信息(本年)', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      component: require('./blocks/shopBudget.vue').default, // 内容组件引用
      dataKey: 'shopBudget' // 对应formData的key
    },
    {
      title: '项目预算本息(本年)', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      component: require('./blocks/projectBudget.vue').default, // 内容组件引用
      dataKey: 'projectBudget' // 对应formData的key
    }
  ]
  const wholeList = [
    {

      title: '基本信息', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      // flodSlot: 'baseInfo', // flod右侧插槽
      component: require('./blocks/essentialData.vue').default, // 内容组件引用
      dataKey: 'essentialData', // 对应formData的key
      column: showMenu ? 4 : 5
    },
    {
      title: '商务信息', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      component: require('./blocks/businessAffairs.vue').default, // 内容组件引用
      dataKey: 'businessAffairs', // 对应formData的key
      column: showMenu ? 4 : 5
    },
    {
      title: '免租期', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      component: require('./blocks/rentFreePeriod.vue').default, // 内容组件引用
      dataKey: 'rentFreePeriod' // 对应formData的key
    },
    {
      title: '固定租金', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      component: require('./blocks/fixedRent.vue').default, // 内容组件引用
      dataKey: 'fixedRent' // 对应formData的key
    },
    {
      title: '一次性费用', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      component: require('./blocks/oneTimeFee.vue').default, // 内容组件引用
      dataKey: 'oneTimeFee' // 对应formData的key
    },
    {
      title: '保证金', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      component: require('./blocks/bond.vue').default, // 内容组件引用
      dataKey: 'bond' // 对应formData的key
    },
    {
      title: '首账期', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      component: require('./blocks/firstAccountPeriod.vue').default, // 内容组件引用
      dataKey: 'firstAccountPeriod' // 对应formData的key
    },
    {
      title: '甲方合同信息', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      component: require('./blocks/partyAsContract.vue').default, // 内容组件引用
      dataKey: 'partyAsContract' // 对应formData的key
    }
  ]
  const business = [
    {
      title: '商家开票信息', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      component: require('./blocks/businessInvoice.vue').default, // 内容组件引用
      dataKey: 'businessInvoice' // 对应formData的key
    },
    {
      title: '商家合同信息', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      component: require('./blocks/merchantCcontract.vue').default, // 内容组件引用
      dataKey: 'merchantCcontract' // 对应formData的key
    }
  ]

  // if (!showMenu) {
  //   return baseList
  // }
  if (contract === '3') { // 三方
    return [
      ...baseList,
      ...editList,
      ...wholeList,
      ...contractList
    ]
  }

  if (contract !== '3') { // 两方
    return [
      ...baseList,
      ...editList,
      ...wholeList,
      ...business
    ]
  }

  return [
    ...baseList,
    ...editList,
    ...wholeList,
    ...business
  ]
}
