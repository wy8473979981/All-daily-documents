//* @Author: fzx
//* @LastEditors: fzx
//* @Description:核销单配置
// 页面配置
const underReview = [{
  title: '基本信息', // 标题名
  showFlod: true, // 是否显示展开收起 默认为true
  flodSlot: 'essential', // flod右侧插槽
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
  flodicon: false // 展示头部加号
},
{
  title: '核销明细',
  showFlod: true,
  component: require('./blocks/writeOffDetails.vue').default,
  dataKey: 'writeOffDetails',
  valiForm: ['rulesForm'],
  flodicon: false // 展示头部加号
},
{
  title: '审核历史',
  showFlod: true,
  component: require('./blocks/writeOffHistory.vue').default,
  dataKey: 'writeOffHistory',
  valiForm: ['rulesForm'],
  flodicon: false // 展示头部加号
}
]
const balance = [{
  title: '基本信息', // 标题名
  showFlod: true, // 是否显示展开收起 默认为true
  flodSlot: 'essential', // flod右侧插槽
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
  flodicon: false // 展示头部加号
},
{
  title: '核销明细',
  showFlod: true,
  component: require('./blocks/writeOffDetails.vue').default,
  dataKey: 'writeOffDetails',
  valiForm: ['rulesForm'],
  flodicon: false // 展示头部加号
}
]
const collection = [{
  title: '商家信息', // 标题名
  showFlod: true, // 是否显示展开收起 默认为true
  flodSlot: 'business', // flod右侧插槽
  component: require('./blocks/business.vue').default, // 内容组件引用
  dataKey: 'business', // 对应formData的key
  valiForm: ['rulesForm'] // 需要触发校验的表单
},
{
  title: '收款信息', // 标题名
  showFlod: true, // 是否显示展开收起 默认为true
  flodSlot: 'collectionInformation', // flod右侧插槽
  component: require('./blocks/collectionInformation.vue').default, // 内容组件引用
  dataKey: 'collectionInformation', // 对应formData的key
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
  title: '暂收款',
  showFlod: true,
  showOperation: false,
  component: require('./blocks/provisionalCollection.vue').default,
  dataKey: 'provisionalCollection',
  valiForm: ['rulesForm']
},
{
  title: '应收冲减',
  showFlod: true,
  component: require('./blocks/receivableDeduction.vue').default,
  dataKey: 'receivableDeduction',
  valiForm: ['rulesForm'],
  flodicon: false // 展示头部加号
},
{
  title: '核销明细',
  showFlod: true,
  component: require('./blocks/writeOffDetails.vue').default,
  dataKey: 'writeOffDetails',
  valiForm: ['rulesForm'],
  flodicon: false // 展示头部加号
},
{
  title: '审核历史',
  showFlod: true,
  component: require('./blocks/writeOffHistory.vue').default,
  dataKey: 'writeOffHistory',
  valiForm: ['rulesForm'],
  flodicon: false // 展示头部加号
}
]

export const pageConfig = val => {
  var status = Number(val.$route.query.status)
  var verificationTypes = Number(val.$route.query.verificationTypes)
  //  status=2为审核中
  if (status === 2) {
    return underReview
    // verificationTypes=1 为余额核销
  } else if (status === 1 && verificationTypes === 1) {
    return balance
    // verificationTypes=2 为收款核销
  } else if (status === 1 && verificationTypes === 2) {
    return collection
  }
}
