/*
 * @Author: fzx
 * @LastEditors: fzx
 * @Description: 收款单详情配置
 */

// 页面配置
export const pageConfig = () => {
  return [
    {
      title: '基本信息', // 标题名
      showFlod: false, // 是否显示展开收起 默认为true
      flodSlot: 'detailInfo', // flod右侧插槽
      component: require('./blocks/form.vue').default, // 内容组件引用
      dataKey: 'form' // 对应formData的key
    },
    {
      title: '收款信息', // 标题名
      showFlod: false, // 是否显示展开收起 默认为true
      dataKey: 'formtwo', // 对应formData的key
      component: require('./blocks/form2.vue').default // 内容组件引用
    }
  ]
}
