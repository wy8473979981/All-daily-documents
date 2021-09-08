<template>
  <div class="big-page scrollbar-custom" v-loading.lock="pageLoading">
    <div class="page-left">

      <modules-project></modules-project>
      <modules-floor></modules-floor>
    </div>

    <div class="page-right" v-loading.lock="rightLoading">
      <ys-n-title class="mt-9" underline size="medium" title="铺位概览"> </ys-n-title>
      <modules-base v-show="bisStoreId" :class="{ 'is-filter': !bisStoreId }"></modules-base>
      <modules-tabs v-show="bisStoreId" :class="{ 'is-filter': !bisStoreId }"></modules-tabs>
      <div v-show="!bisStoreId" class="no-content">请先在地图中选择铺位</div>
    </div>

  </div>
</template>

<script>
import ModulesProject from './modules/project/index.vue'
import ModulesFloor from './modules/floor/index.vue'
import ModulesBase from './modules/base/index.vue'
import ModulesTabs from './modules/tabs/index.vue'

import { mapState } from 'vuex'

export default {
  name: 'RentalPlatformOfMain',

  components: { ModulesProject, ModulesFloor, ModulesBase, ModulesTabs },

  computed: {
    ...mapState({
      pageLoading: state => state.rentalPlatform.pageLoading,
      rightLoading: state => state.rentalPlatform.rightLoading,
      bisStoreId: state => state.rentalPlatform.bisStoreId
    })
  },

  beforeCreate() {
    // document.body.style.zoom = window.innerWidth / 1850 
  },

  mounted() {
    // window.onresize = () => {
    //   this.resetZoom()
    // }
  },

  methods: {
    resetZoom() {
      // document.body.style.zoom = window.innerWidth < 1850 ? window.innerWidth / 1850 : 1
    }
  }

}
</script>

<style lang="scss" scoped>

.big-page {
  width: 100%;
  height: 100%;
  display: flex;
  box-sizing: border-box;
  padding: 24px;
  overflow: auto;
  background-color: $mainColor;
  // justify-content: center;
  
  .page-left{
    width: 886px;
    min-width: 886px;
    height: fit-content;
  }
}

.page-right {
  width: 886px;
  min-width: 886px;
  margin-left: 24px;
  height: fit-content;
  padding-top: 32px;
  position: relative;

  .no-content {
    position: absolute;
    top: 76px;
    left: 0;
    height: 1180px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    // color: $tipsColor;
    background: url('~assets/images/blur.png') no-repeat;
    background-size: cover;
  }
}


</style>
