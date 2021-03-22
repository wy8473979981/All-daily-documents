<template>
  <div id="app">
    <div v-if="$route.name === 'login'" class="ys-particle-wrapper" :class="winWidth>=1920?'page-bg-big':''"></div>
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import GlobalApi from './apis/apis/global'
// import { mapMutations } from 'vuex'
export default {
  name: 'App',
  data() {
    return {
      src: '',
      result: '',
      username: '',
      winWidth: 1280
    }
  },
  created() {
    const winW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    this.winWidth = winW
    // this.getList()
    this.saveMenus('rent_way');
    this.saveMenus('wgPayWay');
    this.saveMenus('cyclePayWay');
    this.saveMenus('cyclePayWayStore');
    this.saveMenus('sellWay');
    this.saveMenus('bizFormat');
    this.saveMenus('contractType');
    this.saveMenus('houseType');
    this.saveMenus('storeChargeType');
    this.saveMenus('isNewStore');
    this.saveMenus('multiType');
    this.saveMenus('saleInitialStatus');
    this.saveMenus('issuingLayoutCd');
    this.saveMenus('oweType');
    this.saveMenus('contType');
    this.saveMenus('zxMultiType');
    this.saveMenus('chargeType');
    this.saveMenus('wyBizType');
  },
  methods: {
    ...mapActions([
      'saveMenus'
    ]),
    // ...mapMutations(['saveLandType','saveCityType','saveLandKind','saveCpaType']),
    async getList() {
      await GlobalApi.getSelectList({}).then(res => {
        console.log('全局下拉菜单List:', res)
        if (res.code === 200 && res.result && res.result.data) {
          const LAND = res.result.data
          // if(LAND.LANDTYPE){
          //   this.saveLandType(LAND.LANDTYPE)
          // }
          // if(LAND.CITYTYPE){
          //   this.saveCityType(LAND.CITYTYPE)
          // }
          // if(LAND.LANDKIND){
          //   this.saveLandKind(LAND.LANDKIND)
          // }
          // if(LAND.CPATYPE){
          //   this.saveCpaType(LAND.CPATYPE)
          // }
          // if(LAND.CPAKIND){
          //   this.saveCpaKind(LAND.CPAKIND)
          // }
        }
      })
    }
  }
}
</script>

<style type="text/css" lang="scss">
html,
body {
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
    background-color: #3e3051;
    background-image: url("./assets/images/gradient-hero-bg-1920.png");
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
    width: 100vw;
  }
  .page-bg-big {
    background-color: #3e3051;
    background-image: url("./assets/images/gradient-hero-bg-1920.png");
    background-size: cover;
    background-repeat: no-repeat;
  }
}
.tool-bar {
  padding-bottom: 10px;
  margin-bottom: 0 !important;
  background-color: #ffffff;
}
.table-header {
  // background-color: #F2F4F6!important;
}
.el-form-item__label {
  color: #606266 !important;
}

</style>
