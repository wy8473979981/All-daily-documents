<template>
  <!-- 首页列表模板 -->
  <div class="app-page-main">
    <h1>Demo - Home</h1>
    <el-button type="success" @click="handleClick">show Loading1</el-button>
    <el-button type="success" @click="handleClick2">show Loading2</el-button>
    <el-button type="success" @click="handleClick3">show Loading3</el-button>
  </div>
</template>
<script>

export default {
  data() {
    return {

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
