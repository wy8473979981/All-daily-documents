/*
 * @Author: xza
 * @Date: 2021-07-20 09:25:57
 * @LastEditTime: 2021-09-06 13:10:53
 * @LastEditors: Please set LastEditors
 * @Description: 保证金转换配置
 * @FilePath: /baolong/src/views/Financia/MarginModules/MarginConversionAdd/config.js
 */

// 页面配置
export const pageConfig = () => {
  return [
    {
      title: '基本信息', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      flodSlot: 'baseInfo', // flod右侧插槽
      component: require('./blocks/form.vue').default, // 内容组件引用
      dataKey: 'baseInfo', // 对应formData的key
      valiForm: ['ruleForm'], // 需要触发校验的表单
      flodicon: false // 展示头部加号
    },
    {
      title: '转换明细',
      showFlod: true,
      dataKey: 'detailedData',
      component: require('./blocks/detailed.vue').default, // 内容组件引用
      flodicon: true, // 展示头部加号
      valiForm: ['detailedData']
    },
    {
      title: '冲抵明细',
      showFlod: true,
      dataKey: 'balanceData',
      component: require('./blocks/balance.vue').default, // 内容组件引用
      flodicon: true, // 展示头部加号
      valiForm: ['balanceData']
    },
    {
      title: '审核记录',
      showFlod: true,
      dataKey: 'historyShow',
      component: require('./blocks/historyShow.vue').default, // 内容组件引用
      valiForm: ['balanceData']
    }
  ]
}
