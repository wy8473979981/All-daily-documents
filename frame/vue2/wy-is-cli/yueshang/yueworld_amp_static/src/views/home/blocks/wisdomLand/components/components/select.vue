<template>
  <div class="select">
    <el-select v-model="value" :placeholder="title">
      <el-option
        v-for="item in options"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>
  </div>
</template>

<script>
export default {
  props: ['title', 'optionsList'],
  data() {
    return {
      options: this.optionsList,
      value: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.select {
  ::v-deep.el-input--medium {
    width: 150px !important;
  }
  ::v-deep.el-input--medium .el-input__inner {
    width: 100% !important;
    height: 32px;
    background: #c8c6a9;
    border-radius: 16px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
  }
}
</style>
