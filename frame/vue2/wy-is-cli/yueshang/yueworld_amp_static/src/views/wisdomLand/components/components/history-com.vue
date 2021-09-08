<template>
  <div class="tablelist">
    <el-table :data="tableData" style="width: 100%; font-size: 10px">
      <el-table-column prop="date1" label="操作员" width="80" align="center" />
      <el-table-column prop="date2" label="项目属性" width="100" />
      <el-table-column prop="date3" label="状态" width="100" />
      <el-table-column prop="date4" label="创建时间" width="200" />
      <el-table-column prop="date5" label="完成/更新时间" width="200" />
      <el-table-column prop="date6" label="累计总投(万元)" width="100" />
      <el-table-column prop="date7" label="总建面(万平)" width="100" />
      <el-table-column prop="date8" label="起始租金(元)" width="100" />
      <el-table-column prop="date9" label="完成/更新时间" width="100" />
      <el-table-column prop="date10" label="地价(元)" width="100" />
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date1: '盘大师',
          date2: '投前项目',
          date3: '完成',
          date4: '2021-03-02 09:32:10',
          date5: '2021-03-02 09:32:10',
          date6: '12,123.00',
          date7: '300.00',
          date8: '59.00',
          date9: '3,411.00',
          date10: '盘大师'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.tablelist {
  width: 1113px;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: #050101;
  line-height: 14px;
  ::v-deep .el-table td {
    background: #f6f5ee;
  }
  ::v-deep .el-table--scrollable-y ::-webkit-scrollbar {
    height: 1px;
  }
  ::v-deep .el-table--scrollable-x ::-webkit-scrollbar {
    height: 1px;
  }
  ::v-deep.el-table th {
    background: #e5e2de !important;
    padding: 0;
  }
  ::v-deep.el-table th:first-child {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }
  ::v-deep.el-table th:nth-last-child(2) {
    border-top-right-radius: 20px;
    background: #f6f5ee;
    border-bottom-right-radius: 20px;
  }
  ::v-deep.cell {
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #050101;
    p {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: #1c4c7f;
    }
    img {
      vertical-align: middle;
    }
  }
  ::v-deep.el-table tr {
    background: #f6f5ee;
  }
  ::v-deep.has-gutter {
    background: #f6f5ee;
  }
  ::v-deep.el-table--enable-row-hover
    .el-table__body
    tr:hover
    > td:first-child {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    background: #e5e2de;
  }
  ::v-deep.el-table--enable-row-hover
    .el-table__body
    tr:hover
    > td:nth-last-child(1) {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    background: #e5e2de;
    //  color: #48A0C3  !important ;
  }
  ::v-deep.el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #e5e2de;
  }
  ::v-deep.el-table--enable-row-hover .el-table__body tr:hover > td > .cell {
    color: #48a0c3;
  }
  ::v-deep.el-table--enable-row-hover
    .el-table__body
    tr:hover
    > td
    > .cell
    > p {
    color: #48a0c3;
  }
  ::v-deep.el-table--enable-row-transition .el-table__body td {
    transition: background-color -1s ease;
  }
  ::v-deep .el-table__header-wrapper {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }
  ::v-deep.el-table,
  .el-table__expanded-cell {
    background: #f6f5ee;
  }
  ::v-deep.el-table td,
  .el-table th {
    padding: 0;
  }
  ::v-deep.el-table__row td .cell {
    height: 36px !important;
    line-height: 36px;
  }
  .solt-icon {
    i {
      margin-left: 8px;
    }
  }
}
</style>
