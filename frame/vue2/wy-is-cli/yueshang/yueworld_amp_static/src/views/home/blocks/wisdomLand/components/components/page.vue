<template>
  <div class="paging">
    <div class="paging-data">
      <p>共15条数据，当前在1/1页</p>
    </div>

    <div class="paging-option">
      <el-pagination layout="prev, pager, next" :total="100"> </el-pagination>
      <div class="line"></div>
      <el-select v-model="value">
        <el-option label="每页10条" value="1"> </el-option>
        <el-option label="每页20条" value="2"> </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "1",
    };
  },
};
</script>

<style lang="scss" scoped>
.paging {
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .line {
    width: 1px;
    height: 32px;
    background: #e7e8e9;
    margin-right: 16px;
  }
  .paging-data {
    p {
      font-size: 14px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #020b14;
      padding-left: 60px;
    }
  }
  .paging-option {
    display: flex;
    color: #020b14;
    ::v-deep .el-input__inner {
      padding: 0;
      height: 24px;
      width: 85px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: #050101;
      background: #f6f5ee;
      border: none;
      padding-top: 4px;
    }
    ::v-deep.el-input__icon {
      line-height: 18px;
    }
    ::v-deep.el-pager li {
      height: 24px;
      line-height: 24px;
      background: transparent;
    }
    ::v-deep.el-pagination button,
    .el-pagination span:not([class*="suffix"]) {
      height: 24px;
      line-height: 24px;
    }
  }
  ::v-deep.el-pagination button {
    background: #f6f5ee;
  }
  ::v-deep.number {
    background: #f6f5ee !important ;
  }
}
</style>