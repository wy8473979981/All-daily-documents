/*
 * @Author: qiuyw
 * @LastEditors: Please set LastEditors
 * @Description: 拆合铺新增
 */

// 页面配置
export const pageConfig = () => {
  return [
    {
      title: '基础数据', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      component: require('./blocks/formBase.vue').default, // 内容组件引用
      dataKey: 'baseInfo', // 对应formData的key
      flodicon: false // 展示头部加号
    },
    {
      title: '业主信息', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      component: require('./blocks/formOwner.vue').default, // 内容组件引用
      dataKey: 'formOwner',
      flodicon: false // 展示头部加号
    }
  ]
}
