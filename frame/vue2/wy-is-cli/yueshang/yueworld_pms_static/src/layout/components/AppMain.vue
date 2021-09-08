<!--
 * @Author: fhj
 * @LastEditors: zengcheng
-->
<template>
  <section class="app-main">
    <!-- <transition name="fade-transform" mode="out-in"> -->
    <!-- 目前需求不需要keep-alive -->
    <!-- <keep-alive > -->
    <router-view :key="key" />
    <!-- </keep-alive> -->
    <!-- </transition> -->
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  },
  mounted() {
    const { name } = this.$route
    if (name) {
      this.$store.dispatch('tagsView/addView', this.$route)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  width: 100%;
  // min-width: 1160px;
  position: relative;
  overflow-x:hidden;
  overflow-y: hidden;
  flex: 1;
  // height: 0;
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
