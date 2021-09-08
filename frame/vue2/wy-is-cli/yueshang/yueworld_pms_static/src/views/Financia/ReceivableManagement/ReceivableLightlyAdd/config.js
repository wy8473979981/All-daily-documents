/*
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description: 应收减免详情页
 */
const data = [
  {
    title: '基本信息', // 标题名
    showFlod: true, // 是否显示展开收起 默认为true
    flodSlot: 'detailInfo', // flod右侧插槽
    component: require('./blocks/form.vue').default, // 内容组件引用
    valiForm: ['rulesForm'], // 表单验证
    dataKey: 'detailInfo' // 对应formData的key
  },
  {
    title: '减免明细', // 标题名
    showFlod: true, // 是否显示展开收起 默认为true
    dataKey: 'countData', // 对应formData的key
    component: require('./blocks/table.vue').default, // 内容组件引用
    valiForm: ['rulesForm'],
    flodicon: true // 展示头部加号
  }
]
// const data2 = [
//   {
//     title: '审核记录', // 标题名
//     showFlod: true, // 是否显示展开收起 默认为true
//     dataKey: 'firstCountList', // 对应formData的key
//     component: require('./blocks/firstTable.vue').default // 内容组件引用

//   }
// ]

export const pagesConfig = function(val) {
  if (val.$route.query.id) {
    return [...data]
  } else {
    return [...data]
  }
}
