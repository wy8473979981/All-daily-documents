<template>
  <van-nav-bar
    v-if="show ? showNav : show"
    class="navbar"
    :title="title"
    left-text=""
    right-text=""
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  >
    <template #title>
      <span class="title">{{ title }}</span>
    </template>
    <template #left>
      <van-icon name="arrow-left" size="18" />
    </template>
  </van-nav-bar>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    show: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters(["getProjectIdBol"]),
  },
  data() {
    return {
      showNav: false,
    };
  },
  watch: {},
  mounted() {
    const ua = navigator.userAgent.toLowerCase();
    const isWxwork = ua.match(/wxwork/i) == "wxwork";
    if (!isWxwork) {
      this.showNav = true;
    }
  },
  methods: {
    onClickLeft() {
      try {
        window.history.go(-1);
      } catch (e) {
        console.log(e);
        window.history.go(-1);
      }
    },
    onClickRight() {
      this.$Toast("按钮");
    },
  },
};
</script>
<style lang="scss" scoped>
.van-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0 0.4rem;
  z-index: 9999999;
  background: linear-gradient(270deg, #1e5385 0%, #3a96bd 100%);
}
::v-deep .van-nav-bar__content {
  height: 96px;
}
.van-hairline--bottom::after {
  border: none;
}

.van-icon {
  color: #fff !important;
}

.navbar {
  background-color: transparent;
  // display: none;
}

.title {
  color: #fff !important;
}
::v-deep .van-nav-bar__title {
  font-size: 36px;
}
.tab-list-box {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  width: 100%;
  font-size: 32px;
  // background: -webkit-linear-gradient(right, #1e5385 0%, #3a96bd 100%);
  // background: linear-gradient(270deg, #1e5385 0%, #3a96bd 100%);
  padding: 0 100px;
  color: #cdcfd5;

  .tab-list-item {
    border-bottom: 6px solid transparent;
    padding-bottom: 26px;
  }

  .border-current {
    border-color: #fff;
    color: #fff;
    font-size: 32px;
  }
}
</style>
