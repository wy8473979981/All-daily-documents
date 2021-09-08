<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-06-30 16:59:09
 * @LastEditors: fhj
 * @LastEditTime: 2021-08-05 20:58:24
-->
<template>
  <div v-if="currentFormData !== undefined && currentFormData.length > 0">
    <ysn-table
      :checkbox="false"
      :data="currentFormData"
      :column="tableConfig"
      select-key="id"
      is-dis-table
      :show-slots="['rateChange']"
    >
      <template #rateChange="scope">
        <div :style="{color:scope.row.type==='up'?'#5B6F63':'#6F120C'}">
          <i v-if="scope.row.type==='up'" class="el-icon-top" />
          <i v-else class="el-icon-bottom" />
          <span>{{ scope.row.rateChange }}</span>
        </div>
      </template>
    </ysn-table>
  </div>
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
      type: [Array, Object],
      default: () => []
    }
  },
  data() {
    return {
      tableConfig: [ // 表格配置
        { name: '实际', columnClass: 'hasBg' },
        { rentCalculation: '预算收入(万元)', width: '130px', type: 'money' },
        { architecture: '当前累计达成额(万元)', width: '160px', type: 'money' },
        { achievementRate: '达成当前率', type: 'rate' },
        { other: '申请后累计达成额(万元)', width: '180px', type: 'money' },
        { applicationRate: '申请后达成率', width: '130px', type: 'rate' },
        { rateChange: '达成率变化', width: '110px' }
      ]

    }
  }

}
</script>
