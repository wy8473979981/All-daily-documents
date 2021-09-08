<template>
  <!-- 写信 模版 -->
  <!-- 挂载到 #app 节点下 -->
  <van-popup v-model="showPop" round position="bottom" :style="{ height: '95%' }" :get-container="ele"
             safe-area-inset-bottom close-on-click-overlay @click-overlay="hidePop">
    <van-row type="flex" justify="center" align="center" @click="hidePop">
      <div class="app-popup-holder-line"></div>
    </van-row>
    <van-row type="flex" justify="center" align="center">
      <van-col span="4">
        <van-button class="app-handle-btn" @click.stop="hidePop" v-if="2 != zType">取消</van-button>
        <van-button class="app-handle-btn" v-if="2 == zType"></van-button>
      </van-col>
      <van-col span="12">
      </van-col>
      <van-col class="van-col-but-r" span="4" v-if="2 != zType">
        <van-button class="app-handle-btn app-handle-btn-m app-handle-btn-o"  v-prevent-re-click @click.stop="savePopMsg">存草稿</van-button>
      </van-col>
      <van-col span="4" v-if="2 == zType">
        <van-button class="app-handle-btn app-handle-btn-m" :class="{'app-handle-btn-o': filterFull >= 1}" @click.stop="hidePop">取消</van-button>
      </van-col>
      <van-col class="van-col-but-r" span="4">
        <van-button class="app-handle-btn app-handle-btn-m app-button-blue" :class="{'app-handle-btn-o': filterFull === 2}" v-prevent-re-click @click.stop="sentPopMsg">发送</van-button>
      </van-col>
    </van-row>
    <slot></slot>
  </van-popup>
</template>
<script>
export default {
  props: {
    show: { // 是否显示左侧箭头
      type: Boolean,
      default: false
    },
    filterFull: {
      type: Number,
      default: 0
    },
    zType: {
      type: [Number, String]
    },
    ele: {
      type: String,
      default: '#app'
    }
  },
  computed: {
    showPop: {
      get() {
        return this.show
      },
      set(val) {
        // console.log('val==',val)
      }
    }
  },
  data() {
    return {}
  },
  watch: {},
  mounted() {

  },
  methods: {
    hidePop() {
      this.$emit('hidePop',{})
      return
    },
    savePopMsg() {
      this.$emit('savePopMsg',{})
    },
    sentPopMsg() {
      this.$emit('sentPopMsg',{})
    }
  }
}
</script>
<style lang="scss" scoped>
.van-popup {
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
}
.app-popup-holder-line {
  width: 100px;
  height: 12px;
  background-color: #D8D8D8;
  border-radius: 7px;
  margin: 20px 0 4px;
}
.van-popup--bottom.van-popup--round {
  border-radius: 26px 26px 0 0;
}
.app-handle-btn {
  text-indent: 32px;
  color: #333333!important;
  font-size: 30px;
  font-weight: 500;
  line-height: 42px;
  &:last-child {
    color: #32A5D1;
  }
}
.van-row {
  margin-bottom: 32px;
}
.app-handle-btn-m {
  opacity: .4;
}
.app-handle-btn-o {
  opacity: 1;
}
.app-button-blue {
  color: #32A5D1!important;
}
/* button */
.van-button--default {
  border: none;
  background-color: transparent;
}
.van-button--normal {
  padding: 0;
}
.van-col-but-r {
  text-align: left;

  /deep/ .van-button__text {
  }
}
</style>
