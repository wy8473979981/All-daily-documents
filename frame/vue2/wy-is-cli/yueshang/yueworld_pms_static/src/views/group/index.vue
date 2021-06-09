<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <div class="group-container">
    <Trend />
    <Satffing />
    <GroupTable />
  </div>
</template>
<script>
import Trend from './trend'
import Satffing from './staffing'
import GroupTable from './groupTable'
export default {
  components: { Trend, Satffing, GroupTable },
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>

</style>
