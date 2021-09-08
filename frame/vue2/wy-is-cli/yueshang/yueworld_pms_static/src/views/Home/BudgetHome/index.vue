<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <div class="group-container">
    <Trend />
    <Satffing />
    <Tabs />
  </div>
</template>
<script>
import Trend from './trend'
import Satffing from './staffing'
import Tabs from './tabs'
export default {
  name: 'BudgetHome',
  components: { Trend, Satffing, Tabs },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
</style>
