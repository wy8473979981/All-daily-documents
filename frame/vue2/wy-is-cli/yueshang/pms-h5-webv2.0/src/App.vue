<template>
  <div id="app">
<!--     <div>{{url}}</div>-->
    <!-- <ys-n-watermark :text="watermarkText"></ys-n-watermark> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      watermarkText: this.$store.state.watermarkText,
      // routerParams: this.$route.query,
    }
  },
  watch: {

  },
  created () {
    try {
      this.connectWebViewJavascriptBridge();
      this.connectWebViewJavascriptBridge();
    }catch(e){
      console.log('e',e)
    }
    this.getToken();
    this.getAllDict();
  },
  mounted () {
  },
  methods: {
    async getToken () {
      this.setCookie("uiid", null)
      this.setCookie("token", null)
      this.$store.commit('setHasToken', false)
      // 在企业微信环境中获取用户信息逻辑
      try {
        if (!this.$isWxwork) {
          const { uiid, token } = this.$route.query
          this.setCookie("uiid", uiid)
          this.setCookie("token", token)
          return
        }
        const code = this.$util.getQueryString('code',window.location.href)
        if(!code) {
          return
        }
        let source = ''
        let operStatus = 0
        if (process.env.VUE_APP_ENV === "prod") {
          source = 'yysj'
          operStatus = 2
        }else if(process.env.VUE_APP_ENV === "prodSyys") {
          if(process.env.NODE_ENV === 'development') {
            source = 'testyy'
          }else {
            source = 'syys'
          }
        }
        await this.$axios.commonServe.getToken({ source: source, code: code, operStatus: operStatus }, false).then(res => {
          if (res && res.data && res.data.token) {
            const { token, uiid, userName } = res.data
            this.setCookie("uiid", uiid)
            this.setCookie("token", token)
            this.$store.commit('setUser', {uiid,token})
            this.$store.commit('setHasToken', true)
            this.$store.commit('setWatermarkText', userName)
          }
        }).catch(e => {
          this.refreshCode()
        })
      } catch (e) {
        console.log(e);
      }
    },
    async getAllDict () {
      if (!this.$store.state.dictAssemble && (process.env.VUE_APP_ENV == 'prod' || process.env.VUE_APP_ENV == undefined)) {
        try {
          this.$axios.commonServe.getAllDict({}, false).then(res => {
            if (res.code == 1) {
              let dictAssemble = {};
              Object.entries(res.data).forEach((k, v) => {
                let obj = {};
                let children = k[1].children.map(item => {
                  return { code: item.code, name: item.detail, children: item.children }
                })
                obj[k[0]] = children;
                Object.assign(dictAssemble, obj);
              });
              this.$store.commit('setDictAssemble', dictAssemble)
            }
          }).catch(() => {

          }).finally(() => {

          })
        } catch (e) {
          console.log(e)
        }
      }
    },
    refreshCode () {
      try {
        let source = ''
        let level = ''
        if (process.env.VUE_APP_ENV === "prod") {
          source = 'yysj'
        }else if(process.env.VUE_APP_ENV === "prodSyys") {
          level = 'syys/index.html'
          if(process.env.NODE_ENV === 'development') {
            source = 'testyy'
          }else {
            source = 'syys'
          }
        }
        let authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd3281eb4d49935a7&redirect_uri=https://pms.powerlong.com/plapp_static/${level}/#/&response_type=code&scope=snsapi_base&source=${source}&state=#wechat_redirect`
        window.location.href = authUrl
      } catch (e) {
        console.log(e);
      }
    },
    connectWebViewJavascriptBridge (callback) {
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
    connectWebViewJavascriptBridge (bridge) {
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
  // padding: 40px 36px;
  //  background: linear-gradient(270deg, #1e5385 0%, #3a96bd 100%);

  height: 111.9998px;
  // line-height: 111.9998px;
  padding-top: 6px;
  color: #ffffff;
  font-size: 0.35rem;

  //   display: flex;
  //   align-items: center;
  //   justify-content: space-between;
  .app-header-container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.tab-container {
  //  background: linear-gradient(270deg, #1e5385 0%, #3a96bd 100%);
  color: #ffffff;
  font-size: 0.35rem;
  margin-top: 24px;
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
  line-height: 1;
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
  position: relative;
  padding: 0 30px;
  padding-top: 96px;
  // background: linear-gradient(360deg, #3a96bd 0%, #1e5385 100%);
  background: linear-gradient(270deg, #1e5385 0%, #3a96bd 100%);
}
.header-top-padding-top {
  padding-top: 0px;
}

.list-mode {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-left: 40px;
  vertical-align: middle;
  line-height: 50px;
}

.head-actions {
  width: 100%;
}

.line {
  margin: 0 12px;
}

.list-mode-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-left: 40px;

  .list-mode-item {
    vertical-align: middle;
    line-height: 50px;
  }
}

.table-wrapper {
  margin-top: 60px;
}

.van-toast {
  width: 96px;
  min-height: 96px;
  .van-loading__spinner {
    width: 48px;
    height: 48px;
  }
}
.van-pull-refresh__head {
  display: none;
}
.van-nav-bar__left {
  padding-left: 0px;
}
</style>
