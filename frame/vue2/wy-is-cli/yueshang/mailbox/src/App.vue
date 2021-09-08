<template>
  <div id="app" class="app-main-home">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>
<script>
export default {
  created() {
    /* Note: Test data, Do not commit and publish */
    // const uu = {token: 'c7dcec389deec67e557b5799e24ce63a',uiid: 'tuhp'}
    // const uu = {token: 'e176e71ab31c060ec49a6a30e99f5da7',uiid: 'tuhp'}
    // const uu = {token: 'd386516eabb8584d9d140b44f6c81934',uiid: 'wangjt2',type: 'test'}
    // const uu = {token: '001daa5aea1b64e0cc55ccd771dfc8f3',uiid: 'wangjt2',type: 'product'}
    // const uu = {token: '4081eec7622f2d227880df96a6cf90c5',uiid: 'tangmj2',type: 'test'}
    // const uu = {token: 'a711b026ce048130166ad6b7b8af487f',uiid: 'tangmj2',type: 'product'}
    // const uu = {token: '685d84cd1637553510fb02885f0084f0',uiid: 'chenxy23'}
    // this.$store.commit('setUser', uu)

    this.connectWebViewJavascriptBridge();
    this.connectWebViewJavascriptBridge();

    this.mailBoxEnum()
    if(this.$route.path === '/getDetail' || this.$route.path === '/' || this.$route.path === '') {
      if( this.$route.path === '/' || this.$route.path === '') {
        this.getToken() // 获取token
        return
      }
      if( this.$store && this.$store.state.userInfo && this.$store.state.userInfo.uiid ) {
        return
      }
      this.getToken() // 获取token
      const query = this.$route.query
      if(query && query.token && query.uiid) {
        this.$store.commit('setUser', {token: query.token, uiid: query.uiid})
        this.getUserInfo()
      }
    }
  },
  methods: {
    async getToken() {
      // const query = this.$route.query
      const code = this.$util.getQueryString('code')
      if(!code) {
        return
      }
      await this.$axios.common.getToken({source: 'lxzcyx',code: code,operStatus: 1}, null, false).then(res => {
        // console.log('通过code获取信息：', res)
        if(res && res.data && res.data.token) {
          const {token, uiid} = res.data
          this.$store.commit('setUser', {token, uiid})
        }
        this.mailBoxEnum()
      }).catch(err => {
        localStorage.clear()
        // this.$route.go(0)
        this.refreshCode()
        // this.$Error('error='+JSON.stringify(err))
      })
    },
    async getUserInfo() {
      const {uiid, token} = this.$store.state.user
      await this.$axios.common.getUserInfo({uiid, token, queryUiid: uiid}, null, false).then(res => {
        // console.log('获取用户信息：', res)
        if(res && res.data) {
          res.data.uiid = uiid
          if(!this.$store || !this.$store.state.userInfo){
            this.$store.commit('setUserInfo', res.data)
            // this.$router.go(0)
          }else{
            this.$store.commit('setUserInfo', res.data)
          }
          if(this.$store && this.$store.state.opList) {
            const user = this.$store.state.opList.admin[uiid]
            if(user) {
              this.userType = 2
              this.$store.commit('setUserType', 2)
            }else{
              this.userType = 1
              this.$store.commit('setUserType', 1)
            }
          }
        }
      }).catch(error => {
        this.refreshCode()
      })
    },
    async mailBoxEnum() {
      await this.$axios.common.mailBoxEnum({}).then(res => {
        console.log('获取字典表：', res)
        if(res && res.data) {
          let ops = []
          ops.push({text: '全部职能', value: ''})
          Object.keys(res.data.depart).forEach(key => {
            ops.push({text: res.data.depart[key], value: key})
          })
          res.data.options = ops
          this.$store.commit('setOpList', res.data)
          this.getUserInfo()
        }
      })
    },
    refreshCode() {
      let authUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd3281eb4d49935a7&redirect_uri=https://pmstest.powerlong.com/h5_box/mailbox/#/\n' +
          '&response_type=code&scope=snsapi_base&state=#wechat_redirect'
      // 环境的切换
      if (process.env.NODE_ENV === "production") {
        authUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd3281eb4d49935a7&redirect_uri=https://pms.powerlong.com/h5_box/mailbox/#/\n' +
            '&response_type=code&scope=snsapi_base&state=#wechat_redirect'
      }
      window.location.href = authUrl
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
<style lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow: auto;
  //background-color: #f2f2f2;
  background-color: #F2F2F2;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,body {
  font-family: PingFang SC, SourceHanSansCN-Normal, SourceHanSansCN,'Microsoft Yahei', '微软雅黑', sans-serif;
}
.app-border-top {
  border-top: 1px solid #F2F2F2;
}
.app-border-before {
  &:before {
    content: '';
    height: 1px;
    background-color: #F2F2F2;
    position: absolute;
    left: 36px;
    width: 100%;
    top: 0;
  }
}
.cut-line1{
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 1; /** 显示的行数 **/
  overflow: hidden;
}
.cut-line2{
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden;
}
.cut-line3{
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 3; /** 显示的行数 **/
  overflow: hidden;
}
.app-fec {
  display: -webkit-flex;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
/* overwrite button style */
.van-button--danger {
  background-color: #F51D1B;
  border: 1px solid #F51D1B;
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
}
.van-button--warning {
  background-color: #DDDDDD;
  border: 1px solid #DDDDDD;
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
}
.van-button--info {
  background-color: #32A5D1;
  border: 1px solid #32A5D1;
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #FFFFFF;
  opacity: 1;
}
.van-button--plain {
  background-color: #FFFFFF;
}
.van-button--disabled {
  background-color: #D2CFCF;
  border: 1px solid #D2CFCF;
}
.van-hairline--bottom {
  &:after{
    border-color: #f2f2f2;
    border-width: 1px;
  }
}
.app-search-box {
  align-items: center!important;
  //background-color: #FFFFFF;
  background: linear-gradient(270deg, #286B97 0%, #3891B9 100%);
}
/* 隐藏下拉刷新文字 */
.van-pull-refresh__head {
  display: none;
}
/deep/ .van-dialog__confirm, .van-dialog__confirm:active {
  color: #ee0a24;
}

/* .van-dialog */
.van-dialog {
  border-radius: 4px;
}
</style>
