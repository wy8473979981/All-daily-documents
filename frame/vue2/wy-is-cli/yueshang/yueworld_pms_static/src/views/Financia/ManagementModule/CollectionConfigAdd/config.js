/*
 * @Author: fzx
 * @LastEditors: fzx
 * @Description: 收款单详情配置
 */
const obj = {
  // 只展示基本信息组件
  basic: [
    {
      title: '基本信息', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      flodSlot: 'detailInfo', // flod右侧插槽
      component: require('./blocks/form.vue').default, // 内容组件引用
      dataKey: 'form', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon: false // 展示头部加号
    }
  ],
  // 手工核销 组件展示
  manual: [
    {
      title: '基本信息', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      flodSlot: 'detailInfo', // flod右侧插槽
      component: require('./blocks/form.vue').default, // 内容组件引用
      dataKey: 'form', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon: false // 展示头部加号
    },
    {
      title: '手工核销', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      flodSlot: 'detailInfo', // flod右侧插槽
      component: require('./blocks/manualCancellation.vue').default, // 内容组件引用
      dataKey: 'manualCancellation', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon: false // 展示头部加号
    },
    {
      title: '带出费项顺序', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      flodSlot: 'detailInfo', // flod右侧插槽
      component: require('./blocks/takeOutOrder.vue').default, // 内容组件引用
      dataKey: 'takeOutOrder', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon: true // 展示头部加号
    }
  ],
  // 自动核销-是否定时组件默认展示
  automatic: [
    {
      title: '基本信息', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      flodSlot: 'detailInfo', // flod右侧插槽
      component: require('./blocks/form.vue').default, // 内容组件引用
      dataKey: 'form', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon: false // 展示头部加号
    },
    {
      title: '自动核销', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      flodSlot: 'detailInfo', // flod右侧插槽
      component: require('./blocks/automaticWriteOff.vue').default, // 内容组件引用
      dataKey: 'automaticWriteOff', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon: false // 展示头部加号
    },
    {
      title: '定时', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      flodSlot: 'detailInfo', // flod右侧插槽
      component: require('./blocks/timing.vue').default, // 内容组件引用
      dataKey: 'timing', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon: false // 展示头部加号
    },
    {
      title: '核销费项顺序', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      flodSlot: 'detailInfo', // flod右侧插槽
      component: require('./blocks/takeOutOrder.vue').default, // 内容组件引用
      dataKey: 'takeOutOrder', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon: true // 展示头部加号
    }
  ],
  //  是否定时为 ‘无’ 时组件展示
  automatic1: [
    {
      title: '基本信息', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      flodSlot: 'detailInfo', // flod右侧插槽
      component: require('./blocks/form.vue').default, // 内容组件引用
      dataKey: 'form', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon: false // 展示头部加号
    },
    {
      title: '自动核销', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      flodSlot: 'detailInfo', // flod右侧插槽
      component: require('./blocks/automaticWriteOff.vue').default, // 内容组件引用
      dataKey: 'automaticWriteOff', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon: false // 展示头部加号
    },
    {
      title: '核销费项顺序', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      flodSlot: 'detailInfo', // flod右侧插槽
      component: require('./blocks/takeOutOrder.vue').default, // 内容组件引用
      dataKey: 'takeOutOrder', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon: true // 展示头部加号
    }
  ],
  //  是否定时为 ‘按日’ 时展示
  automatic2: [
    {
      title: '基本信息', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      flodSlot: 'detailInfo', // flod右侧插槽
      component: require('./blocks/form.vue').default, // 内容组件引用
      dataKey: 'form', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon: false // 展示头部加号
    },
    {
      title: '自动核销', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      flodSlot: 'detailInfo', // flod右侧插槽
      component: require('./blocks/automaticWriteOff.vue').default, // 内容组件引用
      dataKey: 'automaticWriteOff', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon: false // 展示头部加号
    },
    {
      title: '定时', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      flodSlot: 'detailInfo', // flod右侧插槽
      component: require('./blocks/timing2.vue').default, // 内容组件引用
      dataKey: 'timing', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon: false // 展示头部加号
    },
    {
      title: '核销费项顺序', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      flodSlot: 'detailInfo', // flod右侧插槽
      component: require('./blocks/takeOutOrder.vue').default, // 内容组件引用
      dataKey: 'takeOutOrder', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon: true // 展示头部加号
    }
  ],
  // 是否定时为按 ‘月’ 展示
  automatic3: [
    {
      title: '基本信息', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      flodSlot: 'detailInfo', // flod右侧插槽
      component: require('./blocks/form.vue').default, // 内容组件引用
      dataKey: 'form', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon: false // 展示头部加号
    },
    {
      title: '自动核销', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      flodSlot: 'detailInfo', // flod右侧插槽
      component: require('./blocks/automaticWriteOff.vue').default, // 内容组件引用
      dataKey: 'automaticWriteOff', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon: false // 展示头部加号
    },
    {
      title: '定时', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      flodSlot: 'detailInfo', // flod右侧插槽
      component: require('./blocks/timing3.vue').default, // 内容组件引用
      dataKey: 'timing', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon: false // 展示头部加号
    },
    {
      title: '核销费项顺序', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      flodSlot: 'detailInfo', // flod右侧插槽
      component: require('./blocks/takeOutOrder.vue').default, // 内容组件引用
      dataKey: 'takeOutOrder', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon: true // 展示头部加号
    }
  ]
}
// 导出数据
export const pagesConfig = () => {
  return obj
}
