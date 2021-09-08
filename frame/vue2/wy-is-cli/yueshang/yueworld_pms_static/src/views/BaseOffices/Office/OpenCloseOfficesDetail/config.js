/*
 * @Author: qiuyw
 * @LastEditors:  qiuyw
 * @Description: 拆合铺新增
 */

// 页面配置
export const pageConfig = () => {
  return [
    {
      title: '基础数据', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      component: require('./blocks/form.vue').default, // 内容组件引用
      dataKey: 'baseInfo', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon: false // 展示头部加号
    },
    {
      title: '变更数据对比', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      dataKey: 'logData',
      component: require('./blocks/changeData.vue').default, // 内容组件引用
      flodicon: false // 展示头部加号
    },
    {
      title: '新单元',
      dataKey: 'groupShopOld',
      isGroup: true,
      dynamic: false, // 展示头部加号
      group: [
        {
          title: '原单元基础信息', // 标题名
          showFlod: true, // 是否显示展开收起 默认为true
          dataKey: 'formBaseOld',
          component: require('./blocks/formBaseOld.vue').default, // 内容组件引用
          flodicon: false // 展示头部加号
        },
        {
          title: '原单元一铺一价', // 标题名
          showFlod: true, // 是否显示展开收起 默认为true
          dataKey: 'tablePriceOld',
          component: require('./blocks/tablePriceOld.vue').default, // 内容组件引用
          flodicon: false // 展示头部加号
        }
      ]
    },
    {
      title: '新单元',
      dataKey: 'groupShopNew',
      isGroup: true,
      dynamic: false, // 展示头部加号
      group: [
        {
          title: '新单元基础信息', // 标题名
          showFlod: true, // 是否显示展开收起 默认为true
          dataKey: 'baseInfo',
          component: require('./blocks/formBaseNew.vue').default, // 内容组件引用
          flodicon: false // 展示头部加号
        },
        {
          title: '新单元一铺一价', // 标题名
          showFlod: true, // 是否显示展开收起 默认为true
          dataKey: 'priceInfo',
          component: require('./blocks/tablePriceNew.vue').default, // 内容组件引用
          flodicon: false // 展示头部加号
        },
        {
          title: '新铺位预算', // 标题名
          showFlod: true, // 是否显示展开收起 默认为true
          dataKey: 'budgetInfo',
          component: require('./blocks/tableBudGetNew.vue').default, // 内容组件引用
          flodicon: false // 展示头部加号
        }
      ]
    }
  ]
}
