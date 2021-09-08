/*
 * @Author: qiuyw
 * @LastEditors:  qiuyw
 * @Description: 拆合铺新增
 */

// 页面配置
export const pageConfig = () => {
  return [
    {
      title: '一铺一价综合信息', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      component: require('./blocks/formBase.vue').default, // 内容组件引用
      // dataKey: 'baseInfo', // 对应formData的key
      flodicon: false // 展示头部加号
    },
    /* {
      title: '业态平均价格', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      component: require('./blocks/formIndustryPrice.vue').default, // 内容组件引用
      dataKey: 'averagePriceIndustryPrice', // 对应formData的key
      flodicon: false // 展示头部加号
    },*/
    {
      title: '楼层平均价格', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      component: require('./blocks/formFloorPrice.vue').default, // 内容组件引用
      dataKey: 'averagePriceFloor',
      flodicon: false // 展示头部加号
    },
    {
      title: '一铺一价信息', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      component: require('./blocks/changeData.vue').default, // 内容组件引用
      dataKey: 'infoList',
      valiForm: ['rulesForm'],
      flodicon: false // 展示头部加号
    }
  ]
}
