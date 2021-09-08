<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-07-03 14:06:52
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-08-04 14:24:46
-->
<template>
  <ysn-table
    :checkbox="false"
    :data="shopBudget.shopBudget"
    :column="tableConfig"
    select-key="id"
    is-dis-table
  />
</template>

<script>
export default {
  name: 'ProjectBudget',
  components: {},
  model: {
    prop: 'shopBudget',
    event: 'change'
  },
  props: {
    shopBudget: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      tableConfig: [ // 表格配置
        { name: '指标', columnClass: 'hasBg' },
        { rentCalculation: '预算单价(元/m²/月)' },
        { architecture: '申请单价(元/m²/月)' },
        { sleeve: '预算年收入(万)' },
        { other: '申请后年收入(万)' },
        { average: '年收入差异额(万)' },
        { average: '年收入达成率' },
        { average: '达成状态' }
      ]

    }
  }

}
</script>

