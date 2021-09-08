/*
 * @Author: zsj
 * @Date: 2021-07-05 16:36:54
 * @LastEditTime: 2021-08-05 11:32:50
 * @LastEditors: xza
 */

// 页面配置
export const pageConfig = () => {
  return [
    {
      title: '基本信息', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      flodSlot: 'essential', // flod右侧插槽\
      component: require('./blocks/essential.vue').default, // 内容组件引用
      dataKey: 'essential', // 对应formData的key
      valiForm: ['rulesForm'] // 需要触发校验的表单
    },
    {
      title: '必填字段初始默认值',
      showFlod: true,
      component: require('./blocks/contract.vue').default,
      dataKey: 'contract',
      valiForm: ['rulesForm']
    }, {
      title: '合同页面逻辑配置',
      showFlod: true,
      component: require('./blocks/greeting.vue').default,
      dataKey: 'greeting',
      valiForm: ['rulesForm']
    },
    {
      title: '合同字段配置',
      showFlod: true,
      component: require('./blocks/arrange.vue').default,
      dataKey: 'arrange',
      valiForm: ['rulesForm']
    },
    // {
    //   title: '功能扩展',
    //   showFlod: false,
    //   flodSlot: 'baseInfo',
    //   component: require('./blocks/formlist.vue').default,
    //   dataKey: 'formlist',
    //   valiForm: ['rulesForm']
    // },
    {
      title: '计算方式',
      showFlod: true,
      component: require('./blocks/formula.vue').default,
      dataKey: 'formula',
      valiForm: ['rulesForm']
    },
    {
      title: '费项定制',
      showFlod: true,
      component: require('./blocks/reimbursement.vue').default,
      dataKey: 'reimbursement',
      valiForm: ['rulesForm'],
      flodicon: true// 展示头部加号
    },
    {
      title: '一铺一价配置',
      showFlod: true,
      component: require('./blocks/bedding.vue').default,
      dataKey: 'bedding',
      valiForm: ['rulesForm'],
      flodicon: true// 展示头部加号
    }
  ]
}
