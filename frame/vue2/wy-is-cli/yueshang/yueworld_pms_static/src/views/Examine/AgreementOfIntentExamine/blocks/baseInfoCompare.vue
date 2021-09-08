<!--
 * @Description:
 * @Author: wyz
 * @LastEditors: wyz
-->
<template>
  <div>
    <!-- <ysn-formTable
      ref="formTab"
      v-model="currentFormData"
      prop="tableData"
      :column="formTableConfig"
    /> -->
    <div v-if="currentFormData !== undefined && currentFormData.length > 0">
      <ysn-table
        :data="currentFormData"
        :column="tableConfig"
        select-key="id"
        :checkbox="false"
        :show-slots="['average']"
        is-dis-table
      >
        <template #average="scope">
          <div :style="{color:scope.row.average==='不一致'?'#6F120C':'#5B6F63'}">
            {{ scope.row.average }}
          </div>
        </template>
      </ysn-table>
    </div>
  </div>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'BaseInfoCompare',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'baseInfoCompare',
    event: 'change'
  },
  props: {
    baseInfoCompare: {
      type: [Array, Object],
      default: () => []
    }
  },
  data() {
    return {
      tableConfig: [
        { target: '指标', itemType: 'text', columnClass: 'hasBg' },
        { budget: '预算', itemType: 'text' },
        { name: '实际' },
        { average: '达成状态', hasSlot: true }
      ]
    }
  }
}
</script>
