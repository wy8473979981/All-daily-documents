/*
 * @Author: sdy
 * @LastEditors: sdy
 * @Description: 转换单-新增
 */

// 页面配置
export const pageConfig = () => {
  return [
    {
      title: '转换信息', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      component: require('./blocks/programAndBusinessForm.vue').default, // 内容组件引用
      dataKey: 'programAndBusinessInfo', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon: false // 展示头部加号
    },
    {
      title: '转换明细',
      showFlod: true,
      dataKey: 'countData', // 对应formData的key
      component: require('./blocks/table.vue').default, // 内容组件引用
      flodicon: true, // 展示头部加号
      valiForm: ['rulesForm'] // 需要触发校验的表单
    },
    {
      title: '冲抵核销明细',
      showFlod: true,
      dataKey: 'attachmentList', // 对应formData的key
      component: require('./blocks/attachmentList.vue').default, // 内容组件引用
      flodicon: true // 展示头部加号

    }
  ]
}
