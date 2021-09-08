/*
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description: 进场装修详情配置
 */

// 页面配置
export const pageConfig = () => {
  return [
    {
      title: '开业审批', // 标题名
      showFlod: false, // 是否显示展开收起 默认为true
      flodSlot: 'detailInfo', // flod右侧插槽
      component: require('./blocks/form.vue').default, // 内容组件引用
      dataKey: 'detailInfo', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon: false // 展示头部加号
    },
    {
      title: '费用信息', // 标题名
      showFlod: false, // 是否显示展开收起 默认为true
      dataKey: 'countData', // 对应formData的key
      component: require('./blocks/table.vue').default // 内容组件引用
    },
    {
      title: '首账期', // 标题名
      showFlod: false, // 是否显示展开收起 默认为true
      dataKey: 'firstCountList', // 对应formData的key
      component: require('./blocks/firstTable.vue').default // 内容组件引用
    },
    {
      title: '开业审批相关资料', // 标题名
      showFlod: false, // 是否显示展开收起 默认为true
      dataKey: 'formTableData', // 对应formData的key
      component: require('./blocks/formTable.vue').default, // 内容组件引用
      valiForm: ['rulesForm']
    }
  ]
}
