/*
 * @Author: wyz
 * @LastEditors: wyz
 * @Description: 合约变更预览
 */

// 页面配置
export const pageConfig = () => {
  return [
    {
      title: '基本信息', // 标题名
      component: require('./blocks/essentialData.vue').default, // 内容组件引用
      dataKey: 'essentialData', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon: false // 展示头部加号
    },
    {
      title: '商务信息', // 标题名
      component: require('./blocks/businessAffairs.vue').default, // 内容组件引用
      dataKey: 'businessAffairs', // 对应formData的key
      flodicon: false // 展示头部加号
    },
    {
      title: '租赁区域', // 标题名
      component: require('./blocks/leaseArea.vue').default, // 内容组件引用
      dataKey: 'leaseArea', // 对应formData的key
      flodicon: false // 展示头部加号
    },
    {
      title: '租期', // 标题名
      component: require('./blocks/rentYears.vue').default, // 内容组件引用
      dataKey: 'rentYears', // 对应formData的key
      flodicon: false // 展示头部加号
    },
    {
      title: '免租期', // 标题名
      component: require('./blocks/rentFreePeriod.vue').default, // 内容组件引用
      dataKey: 'rentFreePeriod', // 对应formData的key
      valiForm: ['rulesForm'], // 需要触发校验的表单
      flodicon: false // 展示头部加号
    },
    {
      title: '周期性费用-固定', // 标题名
      component: require('./blocks/fixedRent.vue').default, // 内容组件引用
      dataKey: 'fixedRent', // 对应formData的key
      flodicon: false // 展示头部加号
    },
    {
      title: '周期性费用-提成', // 标题名
      component: require('./blocks/commissionRent.vue').default, // 内容组件引用
      dataKey: 'commissionRent', // 对应formData的key
      flodicon: false // 展示头部加号
    },
    {
      title: '一次性费用',
      component: require('./blocks/oneTimeFee.vue').default, // 内容组件引用
      dataKey: 'oneTimeFee', // 对应formData的key
      flodicon: false // 展示头部加号
    },
    {
      title: '保证金', // 标题名
      component: require('./blocks/bond.vue').default, // 内容组件引用
      dataKey: 'bond', // 对应formData的key
      flodicon: false // 展示头部加号
    },
    {
      title: '首账期', // 标题名
      component: require('./blocks/firstAccountPeriod.vue').default, // 内容组件引用
      dataKey: 'firstAccountPeriod', // 对应formData的key
      flodicon: false // 展示头部加号
    },
    {
      title: '合同签署方', // 标题名
      component: require('./blocks/contractSignedParty.vue').default, // 内容组件引用
      dataKey: 'contractSignedParty', // 对应formData的key
      flodicon: false // 展示头部加号
    },
    {
      title: '台账测算', // 标题名
      component: require('./blocks/StandingBook.vue').default, // 内容组件引用
      flodicon: false // 展示头部加号
    }
  ]
}
// 列表配置
// showFixed:为固定 不可在自定义表头中修改的项目 一般用于序号
// isShow: 为默认展示的列表配置
export const tableConfig = function() {
  return [
    { idx: '应收编号', type: 'index', width: 50, sortable: true, showFixed: true },
    { programName: '收款项目', sortable: true, isShow: true, width: 100 },
    { tenantName: '权责月', sortable: true, isShow: true, width: 150 },
    { contNo: '账期', sortable: true, isShow: true, width: 100 },
    { contType: '应收日期', sortable: true, isShow: true, width: 100 },
    { leaseArea: '应收金额(元)', sortable: true, isShow: true, width: 100 },
    { contractStates: '核销状态', sortable: true, isShow: true, width: 100 },
    { contNature: '发票状态', sortable: true, isShow: true, width: 100 },
    { createdDate: '凭着状态', sortable: true, isShow: true, width: 100 }
  ]
}

