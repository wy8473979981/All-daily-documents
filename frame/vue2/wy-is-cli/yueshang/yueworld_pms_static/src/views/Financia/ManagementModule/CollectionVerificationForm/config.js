//* @Author: fzx
//* @LastEditors: fzx
//* @Description:收款单-编辑-收款核销单配置
// 页面配置
export const pageConfig = () => {
  return [{
    title: '基本信息', // 标题名
    showFlod: true, // 是否显示展开收起 默认为true
    flodSlot: 'essential', // flod右侧插槽
    component: require('./blocks/essential.vue').default, // 内容组件引用
    dataKey: 'essential', // 对应formData的key
    valiForm: ['rulesForm'] // 需要触发校验的表单
  },
  {
    title: '收款信息',
    showFlod: true,
    component: require('./blocks/contract.vue').default,
    dataKey: 'contract',
    valiForm: ['rulesForm']
  },
  {
    title: '冲抵',
    showFlod: true,
    showOperation: false,
    component: require('./blocks/offset.vue').default,
    dataKey: 'offset',
    valiForm: ['rulesForm']
  },
  {
    title: '暂收款',
    showFlod: true,
    component: require('./blocks/temporaryCollections.vue').default,
    dataKey: 'temporaryCollections',
    valiForm: ['rulesForm'],
    flodicon: true // 展示头部加号
  },
  {
    title: '应收冲减',
    showFlod: true,
    component: require('./blocks/receivableDeduction.vue').default,
    dataKey: 'receivableDeduction',
    valiForm: ['rulesForm'],
    flodicon: true // 展示头部加号
  },
  {
    title: '核销明细',
    showFlod: true,
    component: require('./blocks/writeOffDetails.vue').default,
    dataKey: 'writeOffDetails',
    valiForm: ['rulesForm'],
    showOperation: true,
    flodicon: true // 展示头部加号
  }
  ]
}
