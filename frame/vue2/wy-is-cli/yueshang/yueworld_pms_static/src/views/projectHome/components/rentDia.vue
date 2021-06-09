<template>
  <el-dialog
    :title="title"
    width="798px"
    :visible.sync="dialogVisible"
    :before-close="handleClose">
    <div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          v-for="(item,index) in tableColumn"
          :key="index"
          :prop="item.prop"
          :label="item.name"
          :align="item.textAlign"
          :width="item.width">
        </el-table-column>
      </el-table>
    </div>
</el-dialog>
</template>

<script>
export default {
  name: 'RentDia',
  props: ['tableData', 'tableColumn', 'title'],
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
    }
  }
}
</script>
<style>
  .el-dialog{
    border-radius: 20px;
  }
  .el-dialog__body{
    padding: 0 20px 30px;
  }
</style>
<style scoped lang="scss">
  .info-t{
    height: 36px;
    line-height: 36px;
    background: #E0DFDD;
    border-radius: 20px;
  }
  .flex230{
    width: 230px;
  }
  .flex1{
    flex: 1;
  }
</style>
