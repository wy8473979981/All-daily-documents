<template>
  <!-- <div class="page"> -->
    <component v-bind:is="componentName"></component>
  <!-- </div> -->
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import { getSession } from 'utils/utils'
import BindStore from './modules/bindStore/index.vue'
import PersonManage from './modules/personManage/index.vue'
import StoreManage from './modules/storeManage/index.vue'
export default {
  name: 'RentalPlatformOfMainDetail',

  components: { BindStore, PersonManage, StoreManage },

  data() {
    return {
      pageData: {}
    }
  },

  computed: {
    componentName() {
      const pageType = {
        bind: BindStore,
        shop: StoreManage,
        person: PersonManage
      }
      return pageType[this.pageData.icon]
    }
  },

  created() {
    this.pageData = getSession('rp-rental-platform-main-detail')
    this.getLayoutListInfo()
    this.getDepartmentStaff(this.pageData.bisProjectId)
    this.modifyBisProjectId(this.pageData.bisProjectId)
  },

  methods: {
    ...mapMutations({ modifyBisProjectId: 'rentalPlatform/modifyBisProjectId' }),
    ...mapActions({ getLayoutListInfo: 'rentalPlatform/getLayoutListInfo', getDepartmentStaff: 'rentalPlatform/getDepartmentStaff' })
  }
}
</script>

<style lang="scss">
.text-primary.el-button--text {
  color: $font-word-color;
}
</style>
