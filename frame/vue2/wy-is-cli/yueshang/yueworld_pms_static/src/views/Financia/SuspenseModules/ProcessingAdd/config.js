/*
 * @Author: sdy
 * @LastEditors: sdy
 * @Description: 处理单-新增
 */

// 页面配置
const data = [
  {
    title: '基本信息', // 标题名
    showFlod: false, // 是否显示展开收起 默认为true
    component: require('./blocks/programAndBusinessForm.vue').default, // 内容组件引用
    dataKey: 'programAndBusinessInfo', // 对应formData的key
    valiForm: ['rulesForm'], // 需要触发校验的表单
    flodicon: false // 展示头部加号
  },
  {
    title: '处理明细',
    showFlod: false,
    dataKey: 'attachmentList', // 对应formData的key
    component: require('./blocks/attachmentList.vue').default, // 内容组件引用
    flodicon: true, // 展示头部加号
    valiForm: ['rulesForm'] // 需要触发校验的表单
  }
]
const data2 = [
  {
    title: '审核记录', // 标题名
    showFlod: false, // 是否显示展开收起 默认为true
    dataKey: 'firstCountList', // 对应formData的key
    component: require('./blocks/tabletwo.vue').default // 内容组件引用

  }
]
export const pagesConfig = function(val) {
  val.$route.query.id = Number(val.$route.query.id)
  if (val.$route.query.id === 4) {
    return [...data, ...data2]
  } else {
    return [...data]
  }
}
