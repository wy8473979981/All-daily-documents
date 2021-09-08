/*
 * @Author: wyz
 * @LastEditors: wyz
 * @Description: 合同台账-详情
 */

// 页面配置
export const pageConfig = () => {
  return [
    {
      title: '商务信息', // 标题名
      component: require('./blocks/businessAffairs.vue').default, // 内容组件引用
      dataKey: 'businessAffairs' // 对应formData的key
    },
    {
      title: '补充协议',
      dataKey: 'supplemental',
      component: require('./blocks/supplemental.vue').default // 内容组件引用
    },
    {
      title: '免租期',
      dataKey: 'rentFreePeriod',
      component: require('./blocks/rentFreePeriod.vue').default // 内容组件引用
    },
    {
      title: '保证金',
      dataKey: 'bond',
      component: require('./blocks/bond.vue').default // 内容组件引用
    },
    {
      title: '一次性费用',
      dataKey: 'oneTimeFee',
      component: require('./blocks/oneTimeFee.vue').default // 内容组件引用
    },
    {
      title: '双签信息',
      dataKey: 'doubleSignInfo',
      component: require('./blocks/doubleSignInfo.vue').default, // 内容组件引用
      valiForm: ['formTable'] // 需要触发校验的表单
    }
  ]
}
