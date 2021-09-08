/*
 * @Author: sdy
 * @LastEditors: sdy
 * @Description: 暂收款处理单审核记录详情配置
 */

// 页面配置
export const pageConfig = () => {
  return [
    {
      title: '基本信息', // 标题名
      showFlod: false, // 是否显示展开收起 默认为true
      flodSlot: 'detailInfo', // flod右侧插槽
      component: require('./blocks/form.vue').default, // 内容组件引用
      dataKey: 'detailInfo', // 对应formData的key
      flodicon: false // 展示头部加号
    },
    {
      title: '处理明细', // 标题名
      showFlod: false, // 是否显示展开收起 默认为true
      dataKey: 'listSecond', // 对应formData的key
      component: require('./blocks/table.vue').default // 内容组件引用
    }
  ]
}
