/*
 * @Author: chenkeju9933
 * @LastEditors: chenkeju9933
 * @Description: 费用调整单详情页
 */

// 页面配置
export const pageConfig = () => {
  return [
    {
      title: '基本信息', // 标题名
      showFlod: true, // 是否显示展开收起 默认为true
      flodSlot: 'detailInfo', // flod右侧插槽
      component: require('./blocks/form.vue').default, // 内容组件引用
      dataKey: 'detailInfo' // 对应formData的key
    },
    {
      title: '品牌授权', // 标题名
      showFlod: false, // 是否显示展开收起 默认为true
      dataKey: 'countData', // 对应formData的key
      component: require('./blocks/brandAuthorization.vue').default // 内容组件引用
    },
    {
      title: '业务联系人信息', // 标题名
      showFlod: false, // 是否显示展开收起 默认为true
      dataKey: 'countData', // 对应formData的key
      component: require('./blocks/businessContact.vue').default // 内容组件引用
    },
    {
      title: '证照管理', // 标题名
      showFlod: false, // 是否显示展开收起 默认为true
      dataKey: 'countData', // 对应formData的key
      component: require('./blocks/licenseManagement.vue').default // 内容组件引用
    },
    {
      title: '合同信息', // 标题名
      showFlod: false, // 是否显示展开收起 默认为true
      dataKey: 'detailInfo', // 对应formData的key
      component: require('./blocks/contractInfo.vue').default // 内容组件引用
    },
    {
      title: '开票信息', // 标题名
      showFlod: false, // 是否显示展开收起 默认为true
      dataKey: 'countData', // 对应formData的key
      component: require('./blocks/billingInfo.vue').default // 内容组件引用
    },
    {
      title: '诚信记录', // 标题名
      showFlod: false, // 是否显示展开收起 默认为true
      dataKey: 'countData', // 对应formData的key
      component: require('./blocks/integrityRecord.vue').default // 内容组件引用
    }
  ]
}
