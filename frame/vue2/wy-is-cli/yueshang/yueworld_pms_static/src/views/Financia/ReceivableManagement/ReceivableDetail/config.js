/*
 * @Author: sdy
 * @LastEditors: xueyx
 * @Description: 处理单详情配置
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
      title: '应缴款项', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      dataKey: 'payableInfo', // 对应formData的key
      component: require('./blocks/table.vue').default // 内容组件引用
    },
    {
      title: '收款账户信息', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      dataKey: 'userInfo', // 对应formData的key
      component: require('./blocks/firstTable.vue').default // 内容组件引用
    },
    {
      title: '联系人信息', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      dataKey: 'personInfo', // 对应formData的key
      component: require('./blocks/personTable.vue').default // 内容组件引用
    }
  ]
}
