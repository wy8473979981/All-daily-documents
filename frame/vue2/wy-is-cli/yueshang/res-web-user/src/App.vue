<template>
  <div id="app">
    <div v-if="isIe" class="guide-page">
      <div class="content-box">
        <h2 class="title">抱歉，网站打开遇到了一些问题，请您阅读以下帮助手册</h2>
        <div class="help-box">
          <h3>1.您的浏览器为ie浏览器，请使用chrome,edge，360等现代浏览器打开本网站</h3>
          <h3>2.如您的浏览器为360浏览器，QQ浏览器等支持兼容模式的浏览器，请您切换为极速模式</h3>
          <h3>3.切换极速模式如下图所示,切换后请刷新本页面或者重新打开</h3>
        </div>
        <div class="img-box"></div>
      </div>
    </div>
    <div v-if="$route.name === 'login' && !isLoginSSO" class="ys-particle-wrapper" :class="winWidth>=1920?'page-bg-big':''"></div>
    <router-view v-if="isRouterAlive && !isIe" />
  </div>
</template>

<script>
import GlobalApi from "./apis/apis/global";
import { mapMutations } from 'vuex';
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      src: '',
      result: '',
      username: '',
      winWidth: 1280,
      isRouterAlive: true,
      isLoginSSO: false,
      isIe: false
    }
  },
  created(){
    console.log('created')
    if (this.getQueryString('loginName') != null || this.getQueryString('type') == 'ssoLogin') {
      this.isLoginSSO = true
    }
    const winW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    this.winWidth = winW
    // this.getList()
    var browser = '';
    browser = this.getExploreName();
    console.log(browser,11)
    if(browser == 'IE') {
      this.isIe = true;
    }
  },
  methods: {
    ...mapMutations(['saveLandType','saveCityType','saveLandKind','saveCpaType','saveCpaKind']),
    async getList() {
      await GlobalApi.getOptions({}).then(res => {
        console.log("全局下拉菜单List:",res)
        if(res.code === 200 && res.result && res.result.data){
          const LAND = res.result.data
          if(LAND.LANDTYPE){
            this.saveLandType(LAND.LANDTYPE)
          }
          if(LAND.CITYTYPE){
            this.saveCityType(LAND.CITYTYPE)
          }
          if(LAND.LANDKIND){
            this.saveLandKind(LAND.LANDKIND)
          }
          if(LAND.CPATYPE){
            this.saveCpaType(LAND.CPATYPE)
          }
          if(LAND.CPAKIND){
            this.saveCpaKind(LAND.CPAKIND)
          }
        }
      })
    },
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
    // 获取地址参数
    getQueryString(name) {
      let href = window.location.href
      let reg = new RegExp(name + "=([^&]+)")
      let march = reg.exec(href)
      if(march != null){
        return march[1]
      }
      return null
    },
   getExploreName(){
     var userAgent = navigator.userAgent;
     console.log("userAgent=",userAgent)
     if(userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1){
       return 'Opera';
     }
     else if(userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1){
       return 'IE';
     }
     else if(userAgent.indexOf("Edge") > -1){
        return 'Edge';
     }
     else if(userAgent.indexOf("Firefox") > -1){
        return 'Firefox';
     }
     else if(userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1){
       return 'Safari';
     }
     else if(userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1){
        return 'Chrome';
     }
     else if(!!window.ActiveXObject || "ActiveXObject" in window){
        // return 'IE'; IE11 不应该在IE过滤范围
     }else{
      return 'Unkonwn';
     }
   }
  }
}
</script>

<style type="text/css" lang="scss">
.guide-page {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: #fff;
  .content-box {
    margin-top: 100px;
    height: calc(100vh - 100px);
    overflow: auto;
    .title {
      text-align: center;
      font-size: 18px;
      font-weight: 600;
    }
    .help-box {
      margin: 20px auto 0;
      width: 50%;
      line-height: 30px;
      font-size: 16px;
    }
  }
  .img-box {
    background-image: url('./assets/images/help.png');
    background-size: cover;
    background-repeat: no-repeat;
    height: 600px;
    width: 60%;
    margin: 20px auto 0;
  }
}
html,body{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#app {
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  font-family: '微软雅黑';
  .ys-particle-wrapper {
    background-color: #3e3051;
    background-image: url('./assets/images/gradient-hero-bg-1920.png');
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
    width: 100vw;
  }
  .page-bg-big {
    background-color: #3e3051;
    background-image: url('./assets/images/gradient-hero-bg-1920.png');
    background-size: cover;
    background-repeat: no-repeat;
  }
}
.tool-bar{
  padding-bottom: 20px;
  margin-bottom: 0!important;
  background-color: #FFFFFF;
}
.table-header{
  background-color: #F2F4F6 !important;
}
.el-table--border th {
  background-color: #F2F4F6;
}
.el-table th > .cell {
  color: #333333;
  font-size: 14px;
  font-weight: 400;
}
</style>
