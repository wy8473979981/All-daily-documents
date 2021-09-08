<template>
  <!-- 标签页面 -->
  <van-tabs v-model="value" color="#32A5D1" title-active-color="#32A5D1" title-inactive-color="#908E94"
            :swipeable="swipeable" animated :class="{'app-tab-full': fullWidth,'app-tab-small': small}" @click="changeTab">
    <van-tab v-for="(sta,index) in options" :key="index" :title="sta.text">
      <slot :data="sta" :index="index"></slot>
    </van-tab>
  </van-tabs>
</template>
<script>

export default {
  data() {
    return {
      value: ''
    }
  },
  props: {
    options: {
      type: Array,
      default: function(){
        return []
      }
    },
    swipeable: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: true
    },
    model: {
      type: [Number, String],
      default: 0
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    model: {
      handler(n, o) {
        console.log('model ======= ',n)
        this.value = n
      },
      deep: true,
      immediate: true
    },
  },
  methods: {
    changeTab(){
      this.$emit('changeTab', {val: this.options[this.value].value, index: this.value})
    }
  },
  mounted() {},
}
</script>
<style lang="scss" scoped>
.app-tab-full {
  /deep/ .van-tabs__content {
    width: 100vw;
  }
}
.app-tab-small {
  /deep/ .van-tabs__wrap {
    padding-right: 45%;
    border-bottom: 1px solid #f2f2f2;
    background-color: #FFFFFF;
    .van-tab {
      border-bottom: none;
    }
  }
}
/deep/ .van-tabs__nav--line {
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 0;
}
/deep/ .van-tab {
  //border-bottom: 1px solid #F2F2F2;
  max-width: 112px;
}
/deep/ .van-tabs__wrap {
  height: 96px;
}

/deep/ .van-pull-refresh__track {
  height: 98%;
}
</style>
