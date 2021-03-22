<template>
  <van-nav-bar class="navbar" :title="title" left-text="" right-text="" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
    <template #title>
      <span class="title">{{title}}</span>
    </template>
    <template #left>
      <van-icon name="arrow-left" size="18" />
    </template>
  </van-nav-bar>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters(['getProjectIdBol']),
  },
  data() {
    return {
    }
  },
  watch: {},
  mounted() {

  },
  methods: {
    onClickLeft() {
      try {


        let projectIdBol = this.getProjectIdBol;

        if (this.$route.meta.goback == 1) {
          // 首页 下的 二级页面
          if (window.WebViewJavascriptBridge) {
            window.WebViewJavascriptBridge.callHandler("goBack", { param: "返回" }, function (responseData) { });
          } else if (window.webkit && window.webkit.messageHandlers) {
            window.webkit.messageHandlers.goBack.postMessage({ param: "返回" });
          } else {

            window.history.go(-1)
          }

        } else {

          if (projectIdBol === 1 && this.$route.meta.goback == 2) {
            // 首页选择了项目，从项目详情跳转到首页

            if (window.WebViewJavascriptBridge) {
              window.WebViewJavascriptBridge.callHandler("goBack", { param: "返回" }, function (responseData) { });
            } else if (window.webkit && window.webkit.messageHandlers) {
              window.webkit.messageHandlers.goBack.postMessage({ param: "返回" });
            } else {
              window.history.go(-1)
            }

          } else {

            window.history.go(-1)
          }

        }

      } catch (e) {
        console.log(e)
        window.history.go(-1)
      }
    },
    onClickRight() {
      this.$Toast('按钮');
    },
  },
};
</script>
<style lang="scss" scoped>
// ::v-deep .van-tabs__nav {
//   background-color: transparent;
//   .van-tab--active {
//     color: #fff;
//   }
//   .van-tab {
//     color: #fff;
//   }
//   .van-tabs__line {
//     background-color: #fff;
//   }
// }
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
