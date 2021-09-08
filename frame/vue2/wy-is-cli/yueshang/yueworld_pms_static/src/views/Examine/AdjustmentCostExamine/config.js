/*
 * @Author: chenkeju9933
 * @LastEditors: chenkeju9933
 * @Description: 费用调整单详情页
 */

// 页面配置
export const pageConfig = () => {
  return [
    {
      title: '基本信息', // 标题名
      showFlod: false, // 是否显示展开收起 默认为true
      flodSlot: 'detailInfo', // flod右侧插槽
      component: require('./blocks/form.vue').default, // 内容组件引用
      dataKey: 'detailInfo' // 对应formData的key
    },
    {
      title: '调整明细', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      dataKey: 'countData', // 对应formData的key
      component: require('./blocks/table.vue').default // 内容组件引用
    }
  ]
}
