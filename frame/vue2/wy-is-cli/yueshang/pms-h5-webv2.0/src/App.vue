<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
    }
  },
  watch: {
  },
  created() {
    this.connectWebViewJavascriptBridge();
    this.connectWebViewJavascriptBridge();
  },
  methods: {
    connectWebViewJavascriptBridge(callback) {
      console.log("准备与APP搭桥：");
      if (window.WebViewJavascriptBridge) {
        console.log("桥接：window.WebViewJavascriptBridge");
        callback(WebViewJavascriptBridge);
      } else {
        document.addEventListener(
          "WebViewJavascriptBridgeReady",
          function () {
            console.log("桥接：document.addEventListener");
            callback(WebViewJavascriptBridge);
          },
          false,
        );
        console.log("桥接失败！");
      }
    },
    connectWebViewJavascriptBridge(bridge) {
      try {
        console.log("执行：bridge.init！");
        bridge.init(function (message, responseCallback) {
          console.log("JS got a message", message);
          var data = {
            "Javascript Responds": "测试中文!",
          };

          if (responseCallback) {
            console.log("JS responding with", data);
            responseCallback(data);
          }
        });
      } catch (e) {
        console.log("ERROR：执行：bridge.init===失败！！！");
      }
    }
  }
}
</script>
<style lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #f2f2f2;
}
#app::after {
  box-sizing: border-box;
  display: block;
  padding: 12px 0px 28px;
  content: "宝龙商业系统 2021 V1.0\A周末客流数据默认含周五\A除客流数据按小时更新外，其他单元默认取前一日24:00数据";
  font-size: 20px;
  text-align: center;
  color: #acacac;
  white-space: pre;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app-header {
  padding: 40px 36px;
  //  background: linear-gradient(270deg, #1e5385 0%, #3a96bd 100%);
  color: #ffffff;
  font-size: 0.35rem;
  //   display: flex;
  //   align-items: center;
  //   justify-content: space-between;
  .app-header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.tab-container {
  //  background: linear-gradient(270deg, #1e5385 0%, #3a96bd 100%);
  color: #ffffff;
  font-size: 0.35rem;
}
.app-header-left {
  display: flex;
  align-items: center;
}
.app-header-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
}
img {
  width: 100%;
  height: 100%;
  display: block;
}
.ellipsis {
  overflow: hidden; //超出的文本隐藏
  text-overflow: ellipsis; //溢出用省略号显示
  white-space: nowrap; //溢出不换行
}
.list-mode-item {
  font-size: 28px;
  &.active {
    font-size: 32px;
    color: #3992ba;
    font-weight: bold;
  }
}
.header-top {
  background: linear-gradient(360deg, #3a96bd 0%, #1e5385 100%);
}
.list-mode {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-left: 60px;
  vertical-align: middle;
  line-height: 50px;
}
.head-actions {
  width: 100%;
}
.line {
  margin: 0 15px;
}
.list-mode-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-left: 60px;
  .list-mode-item {
    vertical-align: middle;
    line-height: 50px;
  }
}
.table-wrapper {
  margin-top: 60px;
}
</style>
