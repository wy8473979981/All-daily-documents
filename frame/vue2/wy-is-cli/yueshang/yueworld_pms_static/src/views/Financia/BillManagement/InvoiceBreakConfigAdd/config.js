/*
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description:
*/

// 页面配置
export const pageConfig = () => {
  return [
    {
      title: '基本信息', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      dataKey: 'baseInfo', // 对应formData的key
      valiForm: ['rulesForm'],
      component: require('./blocks/baseInfo.vue').default // 内容组件引用
    },
    {
      title: '拆分规则', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      dataKey: 'rulesInfo', // 获取列表的标识
      valiForm: ['rulesForm'], // 需要触发校验的表单
      component: require('./blocks/rules.vue').default // 内容组件引用
    }
  ]
}
