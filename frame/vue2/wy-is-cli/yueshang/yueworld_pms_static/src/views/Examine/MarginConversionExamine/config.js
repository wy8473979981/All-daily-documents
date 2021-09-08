/*
 * @Author: xza
 * @LastEditors: xza
 * @Description: 保证金转换单OA审核记录
 */

// 页面配置
export const pageConfig = () => {
  return [
    {
      title: '转换信息', // 标题名
      showFlod: false, // 是否显示展开收起 默认为true
      component: require('./blocks/form.vue').default, // 内容组件引用
      dataKey: 'baseInfo', // 对应formData的key
      flodicon: false // 展示头部加号
    },
    {
      title: '转换明细',
      showFlod: false,
      dataKey: 'convertDetail',
      component: require('./blocks/table.vue').default // 内容组件引用
    },
    {
      title: '冲抵明细',
      showFlod: false,
      dataKey: 'pushMDetail',
      component: require('./blocks/formTable.vue').default // 内容组件引用
    }
    // ,
    // {
    //   title: '审核历史',
    //   showFlod: false,
    //   dataKey: 'historyShow',
    //   component: require('./blocks/historyShow.vue').default // 内容组件引用
    // }
  ]
}
