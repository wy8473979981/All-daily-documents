/*
 * @Author: fzx
 * @LastEditors: fzx
 * @Description: 页面配置
 */

// 页面配置
const data = [
  {
    title: '基本信息', // 标题名
    showFlod: true, // 是否显示展开收起 默认为true
    flodSlot: 'detailInfo', // flod右侧插槽
    component: require('./blocks/form.vue').default, // 内容组件引用
    valiForm: ['rulesForm'],
    dataKey: 'detailInfo' // 对应formData的key
  },
  {
    title: '调整明细', // 标题名
    showFlod: true, // 是否显示展开收起 默认为true
    dataKey: 'countData', // 对应formData的key
    flodicon: true, // 展示头部加号
    flodSlot: 'detailInfo', // flod右侧插槽
    valiForm: ['rulesForm'],
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
  if (Number(val.$route.query.status) === 7) {
    return [...data, ...data2]
  } else {
    return [...data]
  }
}
