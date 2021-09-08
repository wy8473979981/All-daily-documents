/*
 * @Author: wyz
 * @LastEditors: wyz
 * @Description: 合同解约-新增
 */

// 页面配置
export const pageConfig = () => {
  return [
    {
      title: '基本信息', // 标题名
      showFlod: false, // 是否显示展开收起 默认为true
      component: require('./blocks/essentialData.vue').default, // 内容组件引用
      dataKey: 'essentialData', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon: false // 展示头部加号
    },
    {
      title: '条款变更',
      showFlod: false,
      dataKey: 'termChange',
      component: require('./blocks/termChange.vue').default // 内容组件引用
    }
  ]
}
