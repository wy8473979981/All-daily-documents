<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-06-30 16:59:09
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-06-30 17:16:49
-->
<template>
  <ysn-table
    :checkbox="false"
    :data="projectBudget"
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
    prop: 'projectBudget',
    event: 'change'
  },
  props: {
    projectBudget: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tableConfig: [ // 表格配置
        { name: '实际', columnClass: 'hasBg' },
        { rentCalculation: '预算收入(万元)' },
        { architecture: '当前累计达成额(万元)' },
        { sleeve: '达成当前率' },
        { other: '申请后累计达成额(万元)' },
        { average: '申请后达成率' },
        { average: '达成率变化' }
      ]

    }
  }

}
</script>
