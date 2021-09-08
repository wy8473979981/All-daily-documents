<template>
  <div class="page" v-loading.lock="loading">
    <ys-n-title underline title="绑定铺位" class="mb-10">
      <template slot="right">
        <el-button class="text-primary" type="text" size="small" @click="$router.back()">退出</el-button>
      </template>
    </ys-n-title>

    <div class="bind-store--content">
      <div class="left">
        <div class="store-list mb-8">
          <section>
            <div class="store-list--title mr-8">项目地图</div>
            <div class="store-list--detail">
              <span>(项目铺位绑定进度</span>
             
              <span :class="{'unequal': bindInfo.isBindNum !== bindInfo.sumNum }"> {{bindInfo.isBindNum}}</span>
              <span> / </span>
              <span :class="{'unequal': bindInfo.isBindNum !== bindInfo.sumNum }">{{bindInfo.sumNum}}</span>

              <span>, 本层铺位绑定进度</span>

              <span :class="{'unequal': bindInfo.floorNum !== bindInfo.bindFloorNum }"> {{bindInfo.bindFloorNum}}</span>
              <span> / </span>
              <span :class="{'unequal': bindInfo.floorNum !== bindInfo.bindFloorNum }">{{bindInfo.floorNum}}</span>
              <span>)</span>
            </div>
          </section>

          <el-tooltip v-show="!storeId" class="item" effect="dark" content="请先选择要解绑的铺面元素" placement="top-start">
            <el-button type="text">解绑</el-button>
          </el-tooltip>
          <el-button v-show="storeId" type="text" @click="handleRmClick">解绑</el-button>
        </div>
        
        <div class="map-area">
          <x-map ref="txmap" :params="mapParams" :mapConfig="mapConfig" @selected="handleMapSelect" @unSelected="handleMapUnSelect" @changeFloor="handleMapChangeFloor"></x-map>
        </div>
      </div>

      <div class="right">
        <div class="store-list mb-8">
          <div class="store-list--title mr-8">铺位列表</div>
          <div class="store-list--detail mr-80">
            <span>(项目铺位绑定进度</span>
            <span :class="{'unequal': bindingCountInfo.projectBindingStoreCount !== bindingCountInfo.projectStoreCount }"> {{bindingCountInfo.projectBindingStoreCount}}</span>
            <span> / </span>
            <span :class="{'unequal': bindingCountInfo.projectBindingStoreCount !== bindingCountInfo.projectStoreCount }">{{bindingCountInfo.projectStoreCount}}</span>
             <span>)</span>
          </div>
          
          <el-tooltip class="item" effect="dark" content="开启跨楼层，可查看项目所有铺位并可实现跨楼层绑定铺位；否则只能查看和绑定本楼层铺位" placement="top-start">
            <el-switch
              v-model="isThisFloor"
              active-text="跨楼层"
              inactive-text=""
              @change="handleSearch">
            </el-switch>
          </el-tooltip>
        </div>

        <div class="search-area mt-14">
          <el-input class="search-area--input mr-8" clearable v-model="searchValue" size="mini" placeholder="铺位号/品牌" prefix-icon="el-icon-search"></el-input>
          <el-button size="mini" type="primary" @click="handleSearch">搜索</el-button>
          <el-button size="mini" type="text" :disabled="!searchValue" @click="handleSearchReset">重置</el-button>
        </div>

        <div class="tab-area mt-18 mb-12">
          <div class="tab-list">
            <div :class="['tab-list--item', { active: active === ''}]"  @click="handleChangeType()">全部({{bindingCountInfo.allCount}})</div>
            <div :class="['tab-list--item', { active: active === '1' }]"  @click="handleChangeType('1')">已绑定({{bindingCountInfo.bindingCount}})</div>
            <div :class="['tab-list--item', { active: active === '0' }]"   @click="handleChangeType('0')">未绑定({{bindingCountInfo.noBindingCount}})</div>
          </div>
        </div>

        <ys-n-table v-model="tableData" :config="tableConfig" height="auto" hasPagination :queryParams="tableParams" :queryApi="tableApi" :initialize="initialize" @asyncDone="handleAsyncDone" :page-size="20" :pagerCount="5" page-layout="total, prev, pager, next"></ys-n-table>
      </div>
    </div>

    <!-- 解除绑定  提示 -->
    <x-dialog-alert v-model="unbindVisible" content="确定解除该铺位绑定关系？" width="484px" @change="handleDialogChange" :buttonConfig="unbindtBtns">
      <template slot="content">
        <div class="exit-tips">解除后可再次绑定</div>
      </template>
    </x-dialog-alert>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getSession } from 'utils/utils'
import { getTableConfig } from './config'
import XDialogAlert from '../personManage/_dialogAlert.vue'
import { rentalPlatform } from 'api/modules/RentalPlatform'
import { XMap } from 'views/RentalPlatform/RentalPlatformOfMain/components'

export default {
  name: 'BindStore',

  components: { XMap, XDialogAlert },

  data() {
    return {
      loading: false,
      floorId: 1,
      showLabels: ['cooperativeBrand'],
      // 绑定进度信息
      bindInfo: {},

      bindingCountInfo: {},
      searchValue: '',

      active: '',
      isThisFloor: false,

      tabData: {},

      tableData: [],
      tableConfig: getTableConfig.call(this),
      tableApi: rentalPlatform.getRcStorePageList,

      storeId: '',
      pid: '',

      initialize: 1,

      unbindVisible: false,
      unbindtBtns: [
        { text: '解 绑', type: 'primary', action: 'success'},
        { text: '取 消', type: '', action: 'close'},
      ],
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

    tableParams() {
      return { bisProjectId: this.bisProjectId , floorId: this.floorId, likeName: this.searchValue, isThisFloor: !this.isThisFloor, isBuilding: this.active }
    },

    // 地图参数
    mapParams() {
      return {
        bisProjectId: this.bisProjectId,
      }
    },

    mapConfig() {
      return { floorVal: this.floorId, showLabels: this.showLabels}
    },
  },

  mounted() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      this.loading = true
      rentalPlatform.storeBindInfo({ bisProjectId: this.bisProjectId, floorId: this.floorId }).then((bindInfo) => {
        this.bindInfo = bindInfo;
      }).finally(() => this.loading = false)
    },

    // 地图选中
    handleMapSelect(event) {
      console.log('handleMapSelect', [...event])
      this.storeId = event[0].bid || ''
      this.poiId = event[0].poiId || event[0]
    },

    // 地图取消选中
    handleMapUnSelect() {
      this.storeId = ''
      this.poiId = ''
    },

    // 地图 楼层改变
    handleMapChangeFloor(data) {
      console.log('val: ', data)
      this.floorId = data.newVal;
      if (data.newVal !== data.oldVal) {
        this.initialize++;
        this.fetchData();
      }
    },

    // tab 切换
    handleChangeType(type = '') {
      this.active = type
      this.initialize++;
    },

    // table 绑定
    handleBind(scope) {
      if (!this.poiId) {
        this.$message.error('请先选择要绑定的铺面元素');
      } else {
        this.loading = true
        rentalPlatform.bindStore({ floorId: this.floorId, storeId: this.poiId, bisStoreId: scope.row.bisStoreId }).then(res => {
          this.$message.success('绑定成功')
          this.$refs.txmap.updatePoi({ poiId: res.poiId, bid: res.bid, data: res.vo })
          this.storeId = res.bid
          this.poiId = res.poiId
          this.initialize++;
          this.fetchData();
        }).finally(() => this.loading = false)
      }
    },

    // 解绑弹窗点击
    handleRmClick() {
      this.unbindVisible = true
    },
    handleDialogChange(action) {
      if (action === 'success') {
        this.rmvBindStore()
      }
    },

    // 解绑
    rmvBindStore() {
      this.loading = true
      rentalPlatform.rmvBindStore({ floorId: this.floorId, storeId: this.poiId, bisStoreId: this.storeId }).then(() => {
        this.$refs.txmap.updatePoi({ poiId: this.poiId, bid: this.storeId, data: {} }, false)
        this.storeId = ''
        this.initialize++;
        this.fetchData();
        this.$message.success('解绑成功')
      }).finally(() => this.loading = false)
    },

    // 搜索
    handleSearch() {
      this.initialize++;
    },
    // 重置
    handleSearchReset() {
      this.searchValue = '';
      this.handleSearch();
    },

    // table 加载完成
    handleAsyncDone(res) {
      // console.log('res', res)
      this.bindingCountInfo = res.countObj
    },
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>