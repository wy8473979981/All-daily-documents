<!--
 * @Description: 柱形图
 * @Author: ZY
 * @Date: 2021-01-08 19:24:26
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-15 09:06:21
-->
<template>
  <div class="chart-container">
    <BarChart
      height="100%"
      width="100%"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import BarChart from '@/components/charts/BarChart.vue'
type FilmsType = InstanceType<typeof BarChart>

export default defineComponent({
  components: {
    BarChart
  },
  setup() {
    const films = ref<FilmsType | null>(null);
  }
})
</script>

<style lang="scss" scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
