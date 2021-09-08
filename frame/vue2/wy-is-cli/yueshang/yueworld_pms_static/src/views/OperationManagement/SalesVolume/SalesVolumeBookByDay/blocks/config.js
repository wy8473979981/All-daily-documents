// 页面配置
export const netSalesVolumeConfig = () => {
  return [
    {
      title: '变更金额对比', // 标题名
      component: require('./item/netSalesVolumeForm.vue').default, // 内容组件引用
      dataKey: 'netSalesVolume', // 对应formData的key
      showFlod: false
    },
    {
      title: '历史调整记录',
      dataKey: 'netSalesVolumeHistory',
      component: require('./item/netSalesVolumeHistory.vue').default, // 内容组件引用
      showFlod: false
    }
  ]
}
