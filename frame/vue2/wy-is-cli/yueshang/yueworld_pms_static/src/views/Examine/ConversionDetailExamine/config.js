/*
 * @Author: sdy
 * @LastEditors: sdy
 * @Description:转换单审核记录详情配置
 */
// 页面配置
export const pageConfig = () => {
  return [
    {
      title: '转换信息', // 标题名
      showFlod: false, // 是否显示展开收起 默认为true
      flodSlot: 'detailInfo', // flod右侧插槽
      component: require('./blocks/form.vue').default, // 内容组件引用
      dataKey: 'detailInfo', // 对应formData的key
      flodicon: false // 展示头部加号
    },
    {
      title: '转换明细', // 标题名
      showFlod: false, // 是否显示展开收起 默认为true
      dataKey: 'listSecond', // 对应formData的key
      component: require('./blocks/table.vue').default // 内容组件引用
    },
    {
      title: '冲抵核销明细', // 标题名
      showFlod: false, // 是否显示展开收起 默认为true
      dataKey: 'lisThird', // 对应formData的key
      component: require('./blocks/firstTable.vue').default // 内容组件引用
    }
  ]
}
