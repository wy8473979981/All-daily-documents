<template>
  <div class="page store-manage" v-loading.lock="loading">
    <ys-n-title underline title="铺位管理" class="mb-10">
      <template slot="right">
        <el-button class="text-primary" type="text" size="small" @click="$router.back()">退出</el-button>
      </template>
    </ys-n-title>
    <x-map :params="mapParams" :mapConfig="mapConfig" class="store-manage--map"></x-map>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getSession } from 'utils/utils'
import { XMap } from 'views/RentalPlatform/RentalPlatformOfMain/components'
export default {
  name: 'StoreManage',

  components: { XMap },

  data() {
    return {
      loading: false,
      floorId: '', 
      showLabels: ['cooperativeBrand'],
    }
  },

  created() {
    this.floorId = getSession('rp-rental-platform-main-detail').floorId
    this.showLabels = getSession('rp-rental-platform-main-detail').showLabels
  },

  computed: {
    ...mapState({
      bisProjectId: state => state.rentalPlatform.bisProjectId,
    }),

    // 地图参数
    mapParams() {
      return {
        bisProjectId: this.bisProjectId,
      }
    },

    mapConfig() {
      return {
        floorVal: this.floorId,
        editorModel: true,
        tools:  {
          backBtn: true, // 是否显示回退按钮
          forwardBtn: true, // 是否显示前进按钮
          selectBtn: true, // 是否显示单|多选按钮
          mergeBtn: true, // 是否显示合并按钮
          splitBtn: true, // 是否显示拆分按钮
          publishBtn: false, // 是否显示发布按钮
        },
        showLabels: this.showLabels
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.store-manage {
  overflow: hidden;
}
.store-manage--map {
  flex: 1;
  height: 0;
}
</style>