<template>
  <div class="common-table-container">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180" />
    </el-table>
  </div>
</template>
<script>
export default {
  props: {},

  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped></style>
