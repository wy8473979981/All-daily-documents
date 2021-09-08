<template>
  <section>
    <ys-n-title class="mt-24" underline size="medium" title="楼层概览">
      <template slot="right">
        <!-- <ys-n-icon class="ml-282" :config="iconConfig" @click="handleIconClick"></ys-n-icon> -->
        <ys-n-icon :class="['icon-custom', { 'is-not--full': (item.icon == 'bind' && !floorInfo.isBindAll) || (item.icon == 'person' && !floorInfo.isBindManagerAll)}]" v-for="item in iconConfig" :key="item.icon" :label="item.label" :icon="item.icon" @click="handleIconClick"></ys-n-icon>

        <!-- tips="必选，最多选3个" multiple  :multiple-limit="3" -->
        <ys-n-select class="icon-custom" tips="必选，最多选3个" multiple :multiple-min="1" :multiple-limit="3" :customDisplay="seeIcon" :options="seeOptions" v-model="showLabels"></ys-n-select>

        <!-- <ys-n-select class="icon-custom" :customDisplay="actionsIcon" :options="actionsOptions" v-model="actionsValue" @select-change="handleActionsChange"></ys-n-select> -->

      </template>
    </ys-n-title>
    <div class="page-block pt-15">
      <div class="search-area">
        <ys-n-form :config="formConfig" v-model="formData" inline @change="handleFormChange"></ys-n-form>

        <div class="btn-area">
          <x-pop-table :params="searchParams" v-model="formData" @click="handleSearch"></x-pop-table>
        </div>
      </div>

      <div class="map-area mt-20">
        <x-map ref="tmap" :map-config="mapConfig" :params="mapParams" @selected="handleMapSelect" @unSelected="handleMapUnSelect" @changeFloor="changeFloor"></x-map>
      </div>

      <ys-n-title size="small" title="铺位信息"> </ys-n-title>
      <ys-n-list :config="shopInfoConfig" :list="floorInfo" size="small" :margin="10"></ys-n-list>

      <div class="page-year mt-24">
        <div class="page-year--rent pr-24">
          <ys-n-title size="small" title="本年租金(万元)"> </ys-n-title>
          <ys-n-list :width="33.3" :config="rentThisYearConfig" :list="floorInfo" size="small"></ys-n-list>
        </div>
        <div class="page-year--pro">
          <ys-n-title size="small" title="本年物管费(万元)"> </ys-n-title>
          <ys-n-list :width="33.3" :config="propertyManagementFeeThisYearConfig" :list="floorInfo" size="small"></ys-n-list>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
// import { getSession } from 'utils/utils'
import cloneDeep from 'lodash/cloneDeep'
// import debounce from 'lodash/debounce'
import { XMap } from '../../components'
import XPopTable from './_popTable.vue'
import { rentalPlatform } from 'api/modules/RentalPlatform'
import { mapState, mapActions, mapMutations } from 'vuex'
import { IconConfig, getShopInfoConfig, RentThisYearConfig, PropertyManagementFeeThisYearConfig, SeeOptions, ActionsOptions, getFormConfig } from './config'
export default {
  name: 'ModulesFloor',

  components: { XMap, XPopTable },

  data() {
    return {
      // 楼层概览
      iconConfig: IconConfig,
      // formData: {key1: ''},
      formConfig: getFormConfig.call(this),
      formOptions: [],
      // 铺位信息
      shopInfoConfig: getShopInfoConfig.call(this),

      // 本年租金
      rentThisYearConfig: RentThisYearConfig,
      // 本年物管费
      propertyManagementFeeThisYearConfig: PropertyManagementFeeThisYearConfig,

      // 显示偏好
      showLabels: ['cooperativeBrand'],
      seeOptions: SeeOptions,
      seeIcon: { label: '显示偏好', icon: 'see' },
      // 更多操作
      actionsValue: [],
      actionsOptions: ActionsOptions,
      actionsIcon: { label: '更多操作', icon: 'list' },

      // 表单查询
      defaultFormData: { poiId: '', managerIds: [], formatCds: [], layOut: '', owe: '', expiration: '' },
      formData: { poiId: '', managerIds: [], formatCds: [], layOut: '', owe: '', expiration: '' },

      timer: null,

      personList: [],

      floorId: 1,

      storeClickRecord: '', // 铺位信息点击记录
    }
  },

  computed: {
    ...mapState({
      floorInfo: state => state.rentalPlatform.floorInfo,
      bisProjectId: state => state.rentalPlatform.bisProjectId
    }),

    // 地图参数
    mapParams() {
      return { floorId: this.floorId, bisProjectId: this.bisProjectId }
    },

    mapConfig() {
      return { floorVal: this.floorId, showLabels: [...this.showLabels] }
    },

    // 搜索的条件
    searchParams() {
      return { bisProjectId: this.bisProjectId, storeStatus: '', ...this.formData, managerId: this.formData.managerIds[1], managerType: this.formData.managerIds[0], floorId: this.floorId }
    }
  },

  watch: {
    showLabels: {
      handler() {
        this.$refs?.tmap?.updateMapLabels([...this.showLabels])
      }
    }
  },
  
  created() {
    this.floorId = this.$store.state.rentalPlatform.floorId
    this.showLabels = this.$store.state.rentalPlatform.showLabels
    // this.showLabels = getSession('rp-rental-platform-main-detail').showLabels || ['cooperativeBrand']
    rentalPlatform
      .getManagerStoreInfo({
        bisProjectId: this.bisProjectId,
        floorId: this.floorId,
      })
      .then((managerStoreInfo) => {
        // 设置责任人 选项框
        this.personList = [
          {
            managerId: '1',
            managerName: '招商责任人',
            children: managerStoreInfo.enterpriseEstablishingList.filter(item => !(item.managerName === "未分配" && item.storeManagerNum == 0)).map(item => {
              if (item.managerName === "未分配") {
                return Object.assign(item, { managerId: 'wfp' })
              }
              return item
            })
          },
          {
            managerId: '2',
            managerName: '营运责任人',
            children: managerStoreInfo.serviceList.filter(item => !(item.managerName === "未分配" && item.storeManagerNum == 0)).map(item => {
              if (item.managerName === "未分配") {
                return Object.assign(item, { managerId: 'wfp' })
              }
              return item
            })
          }
        ]
      })
      .finally(() => (this.loading = false))
  },

  methods: {
    ...mapMutations({ modifyBisStoreId: 'rentalPlatform/modifyBisStoreId', modifyShowLabels: 'rentalPlatform/modifyShowLabels' }),
    ...mapActions({ getInfoByStoreId: 'rentalPlatform/getInfoByStoreId', getInfoByFloor: 'rentalPlatform/getInfoByFloor' }),
    // icon click
    handleIconClick(data) {
      this.modifyBisStoreId()

      window.sessionStorage.setItem('rp-rental-platform-main-detail', JSON.stringify(Object.assign({}, data, { bisProjectId: this.bisProjectId, floorId: this.floorId, showLabels: this.showLabels})));

      this.modifyShowLabels(this.showLabels)

      this.$router.push({ path: 'rp-rental-platform-main-detail' })
    },
    // 品牌搜索
    remoteMethod(query) {
      if (query !== '') {
        rentalPlatform.getRcStorePageMiniList({ likeName: query, pageSize: 10000, isBuilding: 1, floorId: this.floorId, bisProjectId: this.bisProjectId }).then((res) => {
          this.formOptions = res.list.map(item => ({ key: item.storeId, label: `${item.cooperativeBrand ? item.cooperativeBrand : ''} ${item.storeNo ? item.storeNo : ''}` }))
        })
      } else {
        this.formOptions = []
      }
    },
    // 表单改变
    handleFormChange(key, value) {
      // console.log('key: ' + key, value)
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        if (key === 'poiId' && value) {
          this.formData = Object.assign(this.formData, this.defaultFormData, { poiId: value })
          this.$refs.tmap?.highLightByBids([value])
        } else if (key === 'poiId' && !value) {
          this.$refs.tmap?.canceHighLight()
        } else if (key !== 'poiId' && !this.isEmpty()) {
          this.formData.poiId = ''
          this.getPoiIds()
        } else if (this.isEmpty()) {
          this.$refs.tmap?.canceHighLight()
        }
      }, 100)
    },

    // 欠费等按钮点击
    handleSearch() {
      this.formData.poiId = ''
      // console.log('poiId: ', this.formData)
      if (this.isEmpty()) {
        this.$refs.tmap?.canceHighLight()
      } else {
        this.getPoiIds()
      }
    },

    // 判断对象中所有的值是不是都是空
    isEmpty(hasPoiId = false) {
      let params = cloneDeep(this.defaultFormData)
      !hasPoiId && delete params.poiId

      return Object.keys(params).every(key => {
        const value = this.formData[key]
        return typeof value === 'string' ? !value : !value.length
      })
    },

    getPoiIds() {
      rentalPlatform.getPoiId(this.searchParams).then((res) => {
        console.log('search', res)
        this.$refs.tmap?.highLightByBids(res)
      })
    },
    
    // 更多操作
    handleActionsChange(...e) {
      console.log('handleActionsChange', e)
    },

    // map select
    handleMapSelect(data) {
      data[0].data && this.getInfoByStoreId(data[0].data.bisStoreId)
    },

    handleMapUnSelect() {
      this.modifyBisStoreId()
    },

    changeFloor(data) {
      this.floorId = data.newVal
      this.getInfoByFloor(data.newVal)

      if (!this.isEmpty(true)) {
        this.getPoiIds()
      }
    },

    // 铺位信息，高亮铺位
    highlightMap(key) {
      const MapKey = {
        emptyStoreNum: '1',
        rentedStoreNum: '2',
        rentedNoOpenStoreNum: '3'
      }
      
      if (Object.keys(MapKey).includes(key)) {
        if (this.storeClickRecord && (!this.formData.managerIds.length && !this.formData.poiId)) {
          this.$refs.tmap?.canceHighLight()
          this.storeClickRecord = ''
          return
        }
        this.storeClickRecord = key
        this.formData = Object.assign(this.formData, this.defaultFormData)
        rentalPlatform.getPoiId({ bisProjectId: this.bisProjectId, floorId: this.floorId, storeStatus: MapKey[key], ...this.defaultFormData }).then((res) => {
          this.$refs.tmap?.highLightByBids(res)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.map-area {
  height: 492px;
}

.page-block {
  background: #FDFCFA;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 23px;
}

.icon-custom {
  width: 80px;
  overflow: hidden;
  margin-left: 20px;
  position: relative;

  &.is-not--full{
    padding-right: 5px;
    margin-left: 15px;
  }
  &.is-not--full::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 8px;
    height: 8px;
    background-color: #F22222;
    border-radius: 50%;
  }
}

.btn-area {
  width: 200px;
  display: flex;
  justify-content: space-between;
}

.page-year {
  display: flex;

  >div {
    flex: 1;
  }
}

.search-area {
  display: flex;
  height: 32px;
  justify-content: space-between;
}
</style>