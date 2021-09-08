/*
 * @Author: xiaoxie
 * @LastEditors: xiaoxie
 * @Description: 新增模板
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
      title: '匹配规则',
      showFlod: true,
      dataKey: 'formMatchData',
      component: require('./blocks/formMatch.vue').default, // 内容组件引用
      flodicon: false, // 展示头部加号
      valiForm: ['ruleForm']
    },
    {
      title: '功能信息',
      showFlod: true,
      dataKey: 'functionData',
      component: require('./blocks/functionInformation.vue').default, // 内容组件引用
      flodicon: false,
      valiForm: ['rulesForm']
    },
    {
      title: '分录规则',
      showFlod: true,
      dataKey: 'entryRulesData',
      component: require('./blocks/entryRules.vue').default, // 内容组件引用
      flodicon: true,
      valiForm: ['rulesForm']
    }
  ]
}
