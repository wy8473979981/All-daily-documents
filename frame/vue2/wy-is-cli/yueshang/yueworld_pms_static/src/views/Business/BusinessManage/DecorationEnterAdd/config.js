/*
 * @Author: xiaoxie
 * @LastEditors: xiaoxie
 * @Description: 进场装修详情配置
 */

// 页面配置
export const pageConfig = () => {
  return [
    {
      title: '进场装修审批', // 标题名
      showFlod: false, // 是否显示展开收起 默认为true
      flodSlot: 'baseInfo', // flod右侧插槽
      component: require('./blocks/form.vue').default, // 内容组件引用
      dataKey: 'baseInfo', // 对应formData的key
      valiForm: ['ruleForm'], // 需要触发校验的表单
      flodicon: false // 展示头部加号
    },
    {
      title: '费用信息',
      showFlod: false,
      dataKey: 'feeInformationData',
      component: require('./blocks/feeInformation.vue').default, // 内容组件引用
      flodicon: true, // 展示头部加号
      valiForm: ['feeInformationData']
    },
    {
      title: '进场装修相关资料',
      showFlod: false,
      dataKey: 'attachmentList',
      component: require('./blocks/formTable.vue').default, // 内容组件引用
      flodicon: true,
      valiForm: ['rulesForm']
    }
  ]
}
