<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scope>
html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
  z-index: 1;
  background-color: #f2f2f2;
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica,
    Segoe UI, Arial, Roboto, "PingFang SC", miui, "Hiragino Sans GB",
    "Microsoft Yahei", sans-serif, SourceHanSansCN-Normal, SourceHanSansCN;
}
</style>
