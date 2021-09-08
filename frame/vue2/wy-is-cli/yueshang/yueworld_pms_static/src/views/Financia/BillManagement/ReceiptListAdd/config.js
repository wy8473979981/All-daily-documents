/*
 * @Author: zbk
 * @LastEditors: xza
 * @Description: 收据-新增
 */

// 页面配置
export const pageConfig = () => {
  return [
    {
      title: '基本信息',
      showFlod: true,
      dataKey: 'userInfo',
      flodSlot: 'baseInfo', // flod右侧插槽
      component: require('./blocks/userInfo.vue').default,
      flodicon: false, // 展示头部加号
      valiForm: ['ruleForm']
    },
    {
      title: '收据明细',
      showFlod: true,
      dataKey: 'detailedData',
      component: require('./blocks/detailed.vue').default,
      flodicon: true, // 展示头部加号
      valiForm: ['detailedData']
    },
    {
      title: '操作记录',
      showFlod: true,
      dataKey: 'operationRecords',
      component: require('./blocks/operationRecords.vue').default,
      flodicon: false // 展示头部加号
    }
  ]
}
