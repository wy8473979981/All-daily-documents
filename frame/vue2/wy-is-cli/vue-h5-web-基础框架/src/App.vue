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
    } catch (e) {
      console.log('e', e)
    }
    this.getToken();
    this.getAllDict();
  },
  mounted () {
  },
  methods: {
    async getToken () {
      this.setCookie("uiid", '')
      this.setCookie("token", '')
      this.$store.commit('setHasToken', false)
      // 在企业微信环境中获取用户信息逻辑
      try {
        const ua = navigator.userAgent.toLowerCase();
        const isWxwork = ua.match(/wxwork/i) == 'wxwork'
        let uiid = this.$route.query.uiid
        let token = this.$route.query.token
        if (!isWxwork) {
          if (uiid && token) {
            this.setCookie("uiid", uiid)
            this.setCookie("token", token)
          }
          return
        }
        const code = this.$util.getQueryString('code', window.location.href)
        if (!code) {
          return
        }
       
        let source = 'testyy'
        let operStatus = '2'

        if (process.env.VUE_APP_ENV === "prod") {
          source = 'yysj'
          operStatus = 2
        } else if (process.env.VUE_APP_ENV === "prodSyys") {
          if (process.env.NODE_ENV === 'development') {
            source = 'testyy'
          } else {
            source = 'syys'
          }
        }
        if (!source) return
        await this.$axios.commonServe.getToken({ source: source, code: code, operStatus: operStatus }, false).then(res => {
          if (res && res.data && res.data.token) {
            const { token, uiid, userName } = res.data
            this.setCookie("uiid", uiid)
            this.setCookie("token", token)
            this.$store.commit('setUser', { uiid, token })
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
</style>
