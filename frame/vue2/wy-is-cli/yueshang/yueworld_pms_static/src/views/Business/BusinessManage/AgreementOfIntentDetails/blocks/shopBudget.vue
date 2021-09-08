<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-07-03 14:06:52
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-07-21 16:47:02
-->
<template>
  <div>
    <ysn-table
      :checkbox="false"
      :data="currentFormData.shopBudget"
      :column="tableConfig"
      select-key="id"
      is-dis-table
    />
  </div>
</template>

<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'ProjectBudget',
  components: {},
  mixins: [pageAccorDetailCom],
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
        { rentCalculation: '预算单价(元/m²/月)', width: '140px' },
        { architecture: '申请单价(元/m²/月)', width: '140px' },
        { sleeve: '预算年收入(万)', width: '130px' },
        { other: '申请后年收入(万)', width: '130px' },
        { average: '年收入差异额(万)', width: '130px' },
        { average: '年收入达成率', width: '120px' },
        { average: '达成状态', width: '100px' }
      ]

    }
  },
  methods: {
    btn() {
      console.log(this.currentFormData.shopBudget)
    }
  }

}
</script>

