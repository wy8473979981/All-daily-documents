<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-07-03 14:06:52
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-07-03 14:14:40
-->
<template>
  <ysn-table
    :checkbox="false"
    :data="shopBudget"
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
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tableConfig: [ // 表格配置
        { name: '指标', columnClass: 'hasBg' },
        { rentCalculation: '预算单价(元/m²/月)', width: '140px' },
        { architecture: '申请单价(元/m²/月)', width: '140px' },
        { sleeve: '预算年收入(万)', width: '130px' },
        { other: '申请后年收入(万)', width: '130px' },
        { average: '年收入差异额(万)', width: '130px' },
        { average: '年收入达成率', width: '120px' },
        { average: '达成状态', width: '100px' }
      ]

    }
  }

}
</script>

