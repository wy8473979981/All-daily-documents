<template>
  <!-- 首页列表模板 -->
  <div class="app-page-main">
    <!-- <h1>Demo - Home</h1>
    <el-button type="success" @click="handleClick">show Loading1</el-button>
    <el-button type="success" @click="handleClick2">show Loading2</el-button>
    <el-button type="success" @click="handleClick3">show Loading3</el-button> -->

    <ys-n-table :config="tableConfig" v-model="tableData" :height="400"></ys-n-table>
  </div>
</template>
<script>
import { TableConfig, TableData } from './config.js'
export default {
  data() {
    return {
      tableConfig: TableConfig.call(this),
      tableData: TableData
    };
  },
  watch: {

  },
  created() {

  },
  methods: {
    handleClick() {
      const l = this.$ysnloading()
      setTimeout(() => {
        l.close()
      }, 3000);
    },
    handleClick2() {
      const l = this.$ysnloading({
        color: '#16406D'
      })
      setTimeout(() => {
        l.close()
      }, 3000);
    },
    handleClick3() {
      const l = this.$ysnloading({
        color: '#004948'
      })
      setTimeout(() => {
        l.close()
      }, 3000);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
