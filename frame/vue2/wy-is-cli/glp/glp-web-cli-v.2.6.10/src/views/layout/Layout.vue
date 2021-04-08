<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <sidebar class="sidebar-container" />
    <div class="header-container">
      <headerTpl></headerTpl>
      <navbar />
    </div>
    <div :class="mixin?'main-container-no-siderbar':'main-container'">
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, headerTpl } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";

export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain,
    headerTpl
  },

  mixins: [ResizeMixin],
  data() {
    return {
      mixin: false
    };
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    classObj() {
      return {
        hideSidebar: false,
        openSidebar: true,
        // hideSidebar: !this.sidebar.opened,
        // openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  },

  created() {
    if (window.parent instanceof Window) {
      this.mixin = false;
    }else{
      this.mixin = true;
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("closeSideBar", { withoutAnimation: false });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>
