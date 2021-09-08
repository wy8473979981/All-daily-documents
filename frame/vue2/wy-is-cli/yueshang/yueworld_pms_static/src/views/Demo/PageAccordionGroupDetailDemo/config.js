/*
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 手风琴详情页demo-配置
 */

// 页面配置
export const pageConfig = () => {
  return [
    {
      title: 'flod插槽', // 标题名
      showFlod: false, // 是否显示展开收起 默认为true
      flodSlot: 'baseInfo', // flod右侧插槽
      component: require('./blocks/form.vue').default, // 内容组件引用
      dataKey: 'baseInfo', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon: true // 展示头部加号
    },
    {
      title: '原单元',
      dataKey: 'groupData',
      isGroup: true,
      group: [
        {
          title: '测试',
          showFlod: true,
          component: require('./blocks/group.vue').default,
          dataKey: 'baseInfo',
          valiForm: ['rulesForm']
        }
      ]
    },
    {
      title: '内容插槽',
      showFlod: true,
      hiddenFlod: false, // 默认收起
      dataKey: 'baseInfo1',
      slot: 'slotName'
    },
    {
      title: '功能扩展',
      showFlod: true,
      component: require('./blocks/form1.vue').default,
      dataKey: 'baseInfo1',
      valiForm: ['rulesForm']
    }
  ]
}
