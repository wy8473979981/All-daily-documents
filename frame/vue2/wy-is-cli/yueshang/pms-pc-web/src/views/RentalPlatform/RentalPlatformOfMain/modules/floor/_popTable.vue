<template>
  <el-popover
    placement="top"
    trigger="manual"
    v-model="visible">
    <div class="x-pop--table">
      <div class="x-dialog--table-title mb-10">
        <div class="title">{{popData.title}}</div>
        <div class="tips" v-if="popData.tips">{{popData.tips}}</div>
        <div class="close" @click="handleClose"></div>
      </div>
      <ys-n-table v-loading="loading" :config="tableConfig" v-model="tableData" :max-height="110"></ys-n-table>
    </div>

    <div class="btn-list" slot="reference">
      <div v-for="(item, index) in btnTextList" :class="['btn-item', { active: selectedList.includes(item.type) }]"   :key="index" @click="e => handleSelect(e, item)">{{item.label}}</div>
    </div>
    
  </el-popover>
</template>

<script>
import { rentalPlatform } from 'api/modules/RentalPlatform'
import { ArrearsTableConfig, LayoutTableConfig, ExpireTableConfig } from './config'
export default {
  name: "PopTable",

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    value: Object,

    params: { // 接口请求参数
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      loading: false,
      tableData: [{}, {}],
      active: '',
      selectedList: [],

      btnTextList: [
        { type: 'layOut', label: '业态偏差', title: '业态偏差', api: '/plpms-rent-control/rc/bis_LayoutDeviance/getLayoutDeviance' },
        { type: 'expiration', label: '即将到期', title: '即将到期', tips: '(距离合同结束日不超过3个月）', api: '/plpms-rent-control/rc/bis-cont-expiration/getExpirationContList' },
        { type: 'owe', label: '欠费', title: '欠费(合同)', api: '/plpms-rent-control/rc/bis_oweStoreInfo/getOweStoreInfo' }
      ],

      visible: false,

      checked: false,

      // 业态偏差弹窗
      layOut: LayoutTableConfig,
      // 即将到期弹窗
      expiration: ExpireTableConfig,
      // 欠费弹窗
      owe: ArrearsTableConfig,
    };
  },

  computed: {
    tableConfig() {
      return this[this.active] || []
    },

    popData() {
      return this.btnTextList.find(item => item.type === this.active) || {}
    },
    
    api() {
      return this.popData.api
    }
  },

  mounted() {
    document.body.addEventListener('click', this.handleClose)
  },

  beforeDestroy() {
    document.body.removeEventListener('click', this.handleClose)
  },

  methods: {
    fetchData() {
      this.loading = true;
      rentalPlatform.getDialogTableList(this.api, this.getCurrentData()).then(res => {
        // console.log(res)
        this.tableData = res
        this.$emit('done')
      }).finally(() => {
        this.loading = false
      })
    },

    getCurrentData() {
      let params = { layOut: '', owe: '', expiration: '' }
      this.selectedList.forEach(item => {
        params[item] = item
      })
      return Object.assign({}, this.params, params)
    },

    handleClose() {
      this.visible = false
    },

    handleSelect(e, item) {
      e.preventDefault()
      e.stopPropagation()
      this.active = item.type
      if (this.selectedList.includes(item.type)) {
        // this.selectedList.splice(this.selectedList.indexOf(item.type), 1)
        this.selectedList = []
        this.visible = false
        this.$emit('change', this.getCurrentData())
        this.$emit('click')
      } else {
        // this.selectedList.push(item.type)
        this.selectedList = [item.type]
        this.visible = true
        this.$emit('change', this.getCurrentData())
        this.$emit('click')
        this.fetchData()
      }

    },
  },

  watch: {
    value: {
      handler() {
        let arr = ['layOut', 'owe', 'expiration']
        let list = []
        arr.forEach(key => {
          this.value[key] && list.push(key)
        })

        this.selectedList = list
      },
      deep: true,
    }
  }

};
</script>

<style lang="scss" scoped>
.x-dialog--table {
  &-title {
    display: flex;
    align-items: baseline;
    position: relative;

    .title {
      font-size: 18px;
      margin-right: 5px;
    }
    .tips {
      font-size: 12px;
    }

    &:after {
      content: '';
      position: absolute;
      bottom: -5px;
      right: 0;
      left: 0;
      height: 1px;
      background: $subMenuBg;
    }

    .close {
      position: absolute;
      top: 6px;
      right: 0;
      height: 14px;
      width: 14px;
      border: 1px solid #848382;
      border-radius: 50%;
      background-image: url(~assets/icons/close.png);
      background-size: cover;
      cursor: pointer;
    }
  }
}
.x-pop--table {
  padding: 24px 24px 31px;
  height: 140px;
  ::v-deep.el-table__body-wrapper tr {
    background-color: $popBg;
  }
  ::v-deep .el-table, .el-table__fixed {
    background-color: $popBg;
  }
}

.btn-list {
  display: flex;
  height: 100%;
  width: 200px;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;

  .btn-item {
    color: $subMenuHover;
    padding: 5px 6px;
    border-radius: 12px;
    text-align: center;
    line-height: 14px;
    cursor: pointer;

    &.active {
      background-color: $subMenuHover;
      color: #fff;
    }
  }
}

</style>
