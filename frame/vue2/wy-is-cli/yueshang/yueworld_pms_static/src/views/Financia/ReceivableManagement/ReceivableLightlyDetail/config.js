/*
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description: 应收减免详情页
 */

// 页面配置

const listOne = [{
  title: '基本信息', // 标题名
  showFlod: false, // 是否显示展开收起 默认为true
  flodSlot: 'detailInfo', // flod右侧插槽
  component: require('./blocks/form.vue').default, // 内容组件引用
  dataKey: 'detailInfo' // 对应formData的key
},
{
  title: '减免明细', // 标题名
  showFlod: true, // 是否显示展开收起 默认为true
  dataKey: 'countData', // 对应formData的key
  component: require('./blocks/table.vue').default // 内容组件引用
}]
const listTwo = [{
  title: '审核记录', // 标题名
  showFlod: true, // 是否显示展开收起 默认为true
  dataKey: 'firstCountList', // 对应formData的key
  component: require('./blocks/firstTable.vue').default // 内容组件引用

}]
export const pagesConfig = function(val) {
  if (val.OA) {
    return [...listOne]
  } else {
    return [...listOne, ...listTwo]
  }
}
