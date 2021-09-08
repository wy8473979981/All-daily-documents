<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-07-03 14:06:52
 * @LastEditors: fhj
 * @LastEditTime: 2021-08-05 20:59:58
-->
<template>
  <div v-if="shopBudget !== undefined && shopBudget.length > 0">
    <ysn-table
      :checkbox="false"
      :data="shopBudget"
      :column="tableConfig"
      select-key="id"
      is-dis-table
      :show-slots="['annualIncomeRate','average']"
    >
      <template #annualIncomeRate="scope">
        <div :style="{color:scope.row.average==='达成'?'#5B6F63':'#6F120C'}">
          {{ scope.row.annualIncomeRate }}
        </div>
      </template>
      <template #average="scope">
        <div :style="{color:scope.row.average==='达成'?'#284C7B':'#6F120C'}">
          {{ scope.row.average }}
        </div>
      </template>
    </ysn-table>
  </div>
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
      type: [Array, Object],
      default: () => []
    }
  },
  data() {
    return {
      tableConfig: [ // 表格配置
        { name: '指标', columnClass: 'hasBg' },
        { rentCalculation: '预算单价(元/m²/月)', width: '140px', type: 'money' },
        { architecture: '申请单价(元/m²/月)', width: '140px', type: 'money' },
        { sleeve: '预算年收入(万)', width: '130px', type: 'money' },
        { other: '申请后年收入(万)', width: '130px', type: 'money' },
        { annualIncomeDiff: '年收入差异额(万)', width: '130px', type: 'money' },
        { annualIncomeRate: '年收入达成率', width: '120px', hasSlot: true, type: 'rate' },
        { average: '达成状态', width: '100px', hasSlot: true }
      ]

    }
  }

}
</script>

