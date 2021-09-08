/*
 * @Author: wyz
 * @LastEditors: wyz
 * @Description: 撤场清算-新增
 */

// 页面配置
export const pageConfig = () => {
  return [
    {
      title: '项目及商家信息', // 标题名
      showFlod: false, // 是否显示展开收起 默认为true
      component: require('./blocks/programAndBusinessForm.vue').default, // 内容组件引用
      dataKey: 'programAndBusinessInfo', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon: false // 展示头部加号
    },
    {
      title: '财务信息',
      showFlod: false,
      dataKey: 'financialData',
      component: require('./blocks/financialTable.vue').default // 内容组件引用
    }
  ]
}
