<!-- 审批单选择商铺组件 -->
<template>
  <div class="selectShop-box">
    <el-dialog
      title=""
      :visible.sync="fast"
      width="800px"
      v-dialogDrag
      >
      <el-row class="top-row">
        <dl-col :span="8" title="楼(层)号" place="title-auto"></dl-col>
        <el-col :span="8">
          <div class="d-min">
            <span style="display: flex; flex-basis: calc(100% - 12px);">
              商铺
              <el-input v-model="info.bankType" @input="bankTypeInput" placeholder="请输入" style="margin: 0 10px;" />
            </span>
          </div>
        </el-col>
        <dl-col :span="8" title="已选商铺" place="title-auto right"></dl-col>
        <dl-col :span="8">
          <ul class="shop-ul">
            <li v-for="(item, index) in floorOptions" :key="index" @click="selectFloor(item, index)" :class="{active: index == isActiveFloor}">{{ item.numBuilding }}</li>
          </ul>
        </dl-col>
        <dl-col :span="8">
          <ul class="shop-ul">
            <li v-for="(item, index) in storeOptionsFilter" :key="index" @click="selectStore(item, index)" :class="{active: index == isActiveStore}">{{ item.storeNo }}</li>
          </ul>
        </dl-col>
        <dl-col :span="8" place="right">
          <ul class="shop-ul">
            <li>{{ info.storeNo }}</li>
          </ul>
        </dl-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'selectShop',
  props: ['open', 'projectCd', 'rentArea2'],
  data() {
    return {
      loading: false,
      info: {
        storeNo: '',
        bisStoreId: ''
      },
      floorOptions: [], // 楼(层)号列表
      storeOptions: [], // 商铺列表
      storeOptionsFilter: [], // 商铺过滤列表
      isActiveFloor: -1,
      isActiveStore: -1,
    }
  },
  created() {
  },
  computed: {
    ...mapState(['userInfo']),
    fast: {
      get() {
        if (this.open) {
          if (!this.rentArea2) {
            this.info = {}
            this.storeOptions = []
            this.storeOptionsFilter = []
          }
          this.getList()
        }
        return this.open
      },
      set(val) {
        this.$emit('close')
      }
    }
  },
  watch: {
    'info.province'(val) {
      if (!val) {
        this.info.city = ''
        this.cityOptions = []
      }
    }
  },
  mounted() {

  },
  beforeDestroy() {
    
  },
  methods: {
    getList() {
      this.$approval.doStoreSelectWithProjectId({projectCd: this.projectCd}).then(res => {
        if(res.code == 1) {
          if (res.data && res.data.length > 0) {
            this.floorOptions = res.data
          } else {
            this.floorOptions = []
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 模糊搜索过滤商铺
    bankTypeInput(val) {
      if (val) {
        const str = new RegExp(val, 'i')
        this.storeOptionsFilter = this.storeOptions.filter(item => str.test(item.storeNo))
      } else {
        this.storeOptionsFilter = this.storeOptions
      }
    },
    selectFloor(item, index) {
      this.isActiveFloor = index
      const param = {
        floorType: 1,
        bisFloorId: item.bisFloorId,
        storeNo: ''
      }
      this.$approval.loadStoreList(param).then(res => {
        if(res.code == 1) {
          if (res.data.bisfollor.length > 0) {
            this.storeOptions = res.data.bisfollor
            this.storeOptionsFilter = res.data.bisfollor
          } else {
            this.storeOptions = []
            this.storeOptionsFilter = []
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    selectStore(item, index) {
      this.isActiveStore = index
      this.info.storeNo = item.storeNo
      this.info.bisStoreId = item.bisStoreId
    },
    submit() {
      this.$message.closeAll()
      if (!this.info.bisStoreId) return this.$message.error('请选择商铺')
      this.$emit('close', this.info)
    },
    cancel() {
      this.fast = false
    }
  }
}
</script>

<style lang="scss" scoped>
.shop-ul {
  width: 100%;
  height: 500px;
  overflow-y: auto;
  li {
    height: 32px;
    line-height: 32px;
    padding: 0 12px;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  li:hover {
    background-color: #f0f7ff;
  }
  .active {
    background-color: #f0f7ff;
    color: #409EFF;
    font-weight: 500;
  }
}
</style>
