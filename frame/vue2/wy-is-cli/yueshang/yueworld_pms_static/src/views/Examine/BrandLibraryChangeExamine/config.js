/*
 * @Author: shuyuan
 * @LastEditors: shuyuan
 * @Description: 品牌变更
 */

// 页面配置
export const pageConfig = () => {
  return [
    {
      title: '基本信息', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      component: require('./blocks/form.vue').default, // 内容组件引用
      dataKey: 'detailInfo' // 对应formData的key
    },
    {
      title: '联系人信息', // 标题名
      showFlod: false, // 是否显示展开收起 默认为true
      dataKey: 'countData', // 对应formData的key
      component: require('./blocks/contactInfo.vue').default // 内容组件引用
    },
    {
      title: '合作商家', // 标题名
      showFlod: false, // 是否显示展开收起 默认为true
      dataKey: 'countData', // 对应formData的key
      component: require('./blocks/cooperativeMerchant.vue').default // 内容组件引用
    },
    {
      title: '合作项目', // 标题名
      showFlod: false, // 是否显示展开收起 默认为true
      flodSlot: 'countData', // flod右侧插槽
      dataKey: 'countData', // 对应formData的key
      component: require('./blocks/cooperationProject.vue').default // 内容组件引用
    }
  ]
}
