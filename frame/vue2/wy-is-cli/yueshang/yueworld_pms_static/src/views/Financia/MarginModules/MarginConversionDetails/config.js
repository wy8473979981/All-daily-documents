/*
 * @Author: xza
 * @Date: 2021-07-20 21:24:18
 * @LastEditTime: 2021-09-03 20:46:24
 * @LastEditors: xza
 * @Description: 保证金转换单详情配置
 * @FilePath: /baolong/src/views/Financia/MarginModules/MarginConversionDetails/config.js
 */

// 页面配置
export const pageConfig = () => {
  return [
    {
      title: '转换信息', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      component: require('./blocks/form.vue').default, // 内容组件引用
      dataKey: 'baseInfo', // 对应formData的key
      flodicon: false // 展示头部加号
    },
    {
      title: '转换明细',
      showFlod: true,
      dataKey: 'convertDetail',
      component: require('./blocks/table.vue').default // 内容组件引用
    },
    {
      title: '冲抵明细',
      showFlod: true,
      dataKey: 'pushMDetail',
      component: require('./blocks/formTable.vue').default // 内容组件引用
    },
    {
      title: '审核记录',
      showFlod: true,
      dataKey: 'historyShow',
      component: require('./blocks/historyShow.vue').default // 内容组件引用
    }
  ]
}
