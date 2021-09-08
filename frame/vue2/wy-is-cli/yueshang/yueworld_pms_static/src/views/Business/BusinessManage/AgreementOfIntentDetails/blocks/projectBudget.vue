<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-06-30 16:59:09
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-07-27 13:48:19
-->
<template>
  <ysn-table
    :checkbox="false"
    :data="currentFormData"
    :column="tableConfig"
    select-key="id"
    is-dis-table
  />
</template>

<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'ProjectBudget',
  components: {},
  mixins: [pageAccorDetailCom],
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
        { rentCalculation: '预算收入(万元)', width: '130px' },
        { architecture: '当前累计达成额(万元)', width: '160px' },
        { sleeve: '达成当前率' },
        { other: '申请后累计达成额(万元)', width: '180px' },
        { average: '申请后达成率', width: '130px' },
        { average: '达成率变化', width: '110px' }
      ]

    }
  }

}
</script>
