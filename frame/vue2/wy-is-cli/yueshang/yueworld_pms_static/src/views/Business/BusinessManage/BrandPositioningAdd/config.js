/*
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description: 品牌落位详情配置
 */

// 页面配置
export const pageConfig = () => {
  return [
    {
      title: '品牌落位综合信息', // 标题名
      showFlod: false, // 是否显示展开收起 默认为true
      flodSlot: 'baseInfo', // flod右侧插槽
      component: require('./blocks/form.vue').default, // 内容组件引用
      dataKey: 'baseInfo', // 对应formData的key
      valiForm: ['ruleForm'], // 需要触发校验的表单
      flodicon: false // 展示头部加号
    },
    {
      title: '品牌落位信息',
      showFlod: false,
      dataKey: 'feeInformationData',
      component: require('./blocks/feeInformation.vue').default, // 内容组件引用
      flodicon: false,
      valiForm: ['feeInformationData']
    }
  ]
}
