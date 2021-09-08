/*
 * @Author: fzzx
 * @LastEditors: fzx
 * @Description: 费用调整单详情页面配置
 */

// 页面配置
const data = [
  {
    title: '基本信息', // 标题名
    showFlod: true, // 是否显示展开收起 默认为true
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
const data2 = [
  {
    title: '审核记录', // 标题名
    showFlod: true, // 是否显示展开收起 默认为true
    dataKey: 'firstCountList', // 对应formData的key
    component: require('./blocks/firstTable.vue').default // 内容组件引用

  }
]

export const pageConfig = function(val) {
  const statusId = Number(val.$route.query.status)
  if (statusId === 4 || statusId === 5) {
    return [...data]
  } else {
    return [...data, ...data2]
  }
}
