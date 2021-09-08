//* @Author: fzx
//* @LastEditors: fzx
//* @Description:核销单-新增/编辑
// 页面配置
export const pageConfig = () => {
  return [{
    title: '基本信息', // 标题名
    showFlod: true, // 是否显示展开收起 默认为true
    flodSlot: 'detailInfo', // flod右侧插槽
    component: require('./blocks/essential.vue').default, // 内容组件引用
    dataKey: 'essential', // 对应formData的key
    valiForm: ['rulesForm'] // 需要触发校验的表单
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
    flodicon: true // 展示头部加号
  }
  ]
}
