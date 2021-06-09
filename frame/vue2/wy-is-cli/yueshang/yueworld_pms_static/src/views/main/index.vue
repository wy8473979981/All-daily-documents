<!--
 * @Author: fhj
 * @LastEditors: Please set LastEditors
 * @Description:
-->
<template>
  <!-- 首页列表模板 -->
  <div class="app-page-main">
    <h1>Demo - 1Home</h1>
    <el-button type="success" @click="handleClick">show Loading</el-button>
  </div>
</template>
<script>

export default {
  data() {
    return {

    }
  },
  watch: {

  },
  created() {

  },
  methods: {
    handleClick() {
      this.$ysnloading()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
