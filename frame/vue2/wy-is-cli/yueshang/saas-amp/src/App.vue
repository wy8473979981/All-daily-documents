<template>
  <div id="app">
    <div v-if="$route.name === 'login' && fromBl === false" class="ys-particle-wrapper" :class="winWidth>=1920?'page-bg-big':''"></div>
    <router-view />
  </div>
</template>

<script>
// import GlobalApi from "./apis/apis/global";
// import { mapMutations } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      src: '',
      result: '',
      username: '',
      winWidth: 1280,
      fromBl: false
    }
  },
  created () {
    if (this.getQueryString('loginName') != null && this.getQueryString('timestamp') != null && this.getQueryString('ticket') != null) {
      this.fromBl = true
    }
    const winW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    this.winWidth = winW
    // this.getList()
  },
  methods: {
    // 获取地址参数
    getQueryString (name) {
      const href = window.location.href
      const reg = new RegExp(name + '=([^&]+)')
      const march = reg.exec(href)
      if (march != null) {
        return march[1]
      }
      return null
    }
    // ...mapMutations(['saveLandType','saveCityType','saveLandKind','saveCpaType']),
    // async getList() {
    //   await GlobalApi.getOptions({}).then(res => {
    //     console.log("全局下拉菜单List:",res)
    //     if(res.code === 200 && res.result && res.result.data){
    //       const LAND = res.result.data
    //       if(LAND.LANDTYPE){
    //         this.saveLandType(LAND.LANDTYPE)
    //       }
    //       if(LAND.CITYTYPE){
    //         this.saveCityType(LAND.CITYTYPE)
    //       }
    //       if(LAND.LANDKIND){
    //         this.saveLandKind(LAND.LANDKIND)
    //       }
    //       if(LAND.CPATYPE){
    //         this.saveCpaType(LAND.CPATYPE)
    //       }
    //       if(LAND.CPAKIND){
    //         this.saveCpaKind(LAND.CPAKIND)
    //       }
    //     }
    //   })
    // },
  }
}
</script>

<style type="text/css" lang="scss">
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
  .ys-particle-wrapper {
    background-color: #FFFFFF;
    background-image: url('./assets/images/gradient-hero-bg-1920.png');
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
    width: 100vw;
  }
  .page-bg-big{
    background-color: #3e3051;
    background-image: url('./assets/images/gradient-hero-bg-1920.png');
    background-size: cover;
    background-repeat: no-repeat;
  }
}
.tool-bar{
    padding-bottom: 10px;
    margin-bottom: 0!important;
    background-color: #FFFFFF;
    .el-select {
      margin-bottom: 5px;
      .el-input {
        margin-bottom: 0!important;
      }
    }
    .el-cascader {
      margin-bottom: 0px;
    }
    .el-date-editor {
      margin-bottom: 5px;
    }
    .el-input {
      margin-bottom: 5px;
    }
    .el-button {
      margin-bottom: 5px;
    }

}
.table-header{
    // background-color: #F2F4F6!important;
}
.el-input__inner {
  border-radius: 0!important;
}
</style>
