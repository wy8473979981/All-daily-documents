/*
 * @Author: fzx
 * @LastEditors: fzx
 * @Description: 收款单-编辑
 */

// 页面配置
export const pageConfig = () => {
  return [
    {
      title: '基本信息', // 标题名
      showFlod: false, // 是否显示展开收起 默认为true
      flodSlot: 'detailInfo', // flod右侧插槽
      component: require('./blocks/form.vue').default, // 内容组件引用
      dataKey: 'form', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon: false // 展示头部加号
    },
    {
      title: '收款信息', // 标题名
      showFlod: false, // 是否显示展开收起 默认为true
      flodSlot: 'detailInfo', // flod右侧插槽
      component: require('./blocks/collectionFome.vue').default, // 内容组件引用
      dataKey: 'collectionFome', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon: false // 展示头部加号
    }
  ]
}

