/*
 * @Author: xiaoxie
 * @Date: 2021-07-26 15:47:00
 * @Last Modified by: xiaoxie
 * @Last Modified time: 2021-07-26 15:55:36
 */
// 凭证汇总详情页面配置项
export const pageConfig = () => {
  return [
    {
      title: '主信息', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      flodSlot: 'baseInfo', // flod右侧插槽
      component: require('./blocks/form.vue').default, // 内容组件引用
      dataKey: 'baseInfo', // 对应formData的key
      valiForm: ['ruleForm'], // 需要触发校验的表单
      flodicon: false // 展示头部加号
    },
    {
      title: '分录信息',
      showFlod: true,
      dataKey: 'detailedData',
      component: require('./blocks/detailed.vue').default, // 内容组件引用
      flodicon: false, // 展示头部加号
      valiForm: ['detailedData']
    }
  ]
}
