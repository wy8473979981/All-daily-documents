<template>
  <div id="app">
    <!-- <div v-if="$route.name === 'login'" class="ys-particle-wrapper" :class="winWidth>=1920?'page-bg-big':''"></div> -->
    <router-view />
  </div>
</template>

<script>
import GlobalApi from "./apis/apis/global";
import { mapMutations } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      src: '',
      result: '',
      username: '',
      winWidth: 1280
    }
  },
  created () {
    const winW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    this.winWidth = winW
    // this.getList()
  },
  methods: {
    ...mapMutations(['saveLandType', 'saveCityType', 'saveLandKind', 'saveCpaType', 'saveCpaKind']),
    async getList () {
      // await GlobalApi.getOptions({}).then(res => {
      //   console.log("全局下拉菜单List:", res)
      //   if (res.code === 200 && res.result && res.result.data) {
      //     const LAND = res.result.data
      //     if (LAND.LANDTYPE) {
      //       this.saveLandType(LAND.LANDTYPE)
      //     }
      //     if (LAND.CITYTYPE) {
      //       this.saveCityType(LAND.CITYTYPE)
      //     }
      //     if (LAND.LANDKIND) {
      //       this.saveLandKind(LAND.LANDKIND)
      //     }
      //     if (LAND.CPATYPE) {
      //       this.saveCpaType(LAND.CPATYPE)
      //     }
      //     if (LAND.CPAKIND) {
      //       this.saveCpaKind(LAND.CPAKIND)
      //     }
      //   }
      // })
    },
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
    background-color: #f3f5f7;
    // background-image: url('./assets/images/gradient-hero-bg-1920.png');
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
    width: 100vw;
  }
  .page-bg-big {
    background-color: #f3f5f7;
    // background-image: url('./assets/images/gradient-hero-bg-1920.png');
    background-size: cover;
    background-repeat: no-repeat;
  }
}
// .tool-bar {
//   padding-bottom: 10px;
//   margin-bottom: 0 !important;
//   background-color: #ffffff;
// }
// .table-header {
//   background-color: #f8fafb !important;
// }
.el-dialog__title {
	font-weight: 600;
	color: #1C1C1C;
	font-size:14px
}
.search-top {
	// padding-right: 20px;
}
// .popper__arrow {
// 	display: none !important;
// }
.start-date span,.end-date span{
	border-radius: 0 !important;
}
</style>
