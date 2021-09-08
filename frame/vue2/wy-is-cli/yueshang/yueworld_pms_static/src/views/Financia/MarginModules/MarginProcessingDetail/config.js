/*
 * @Author: xiaoxie
 * @Date: 2021-07-20 10:10:53
 * @Last Modified by: xiaoxie
 * @Last Modified time: 2021-08-27 11:32:11
 */
// 页面配置
export const pageConfig = () => {
  return [
    {
      title: '基本信息', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      flodSlot: 'baseInfo', // flod右侧插槽
      component: require('./blocks/form.vue').default, // 内容组件引用
      dataKey: 'baseInfo', // 对应formData的key
      flodicon: false // 展示头部加号
    },
    {
      title: '处理明细',
      showFlod: true,
      dataKey: 'detailedData',
      component: require('./blocks/detailed.vue').default, // 内容组件引用
      flodicon: false // 展示头部加号
    }
  ]
}
