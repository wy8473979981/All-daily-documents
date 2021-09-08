<template>
  <!-- 导航栏 -->
  <van-sticky v-if="showNav">
    <van-nav-bar class="navbar" v-bind="$attrs" :title="title" :left-text="leftText" :right-text="rightText" :left-arrow="leftArrow"
                 :border="border" :fixed="fixed" :placeholder="placeholder" :z-index="zIndex" :safe-area-inset-top="safeAreaInsetTop"
                 @click-left="onClickLeft" @click-right="onClickRight">
      <template slot="title">
        <slot name="title"></slot>
      </template>
      <template slot="left">
        <slot name="left"></slot>
      </template>
      <template slot="right">
        <slot name="right"></slot>
      </template>
    </van-nav-bar>
  </van-sticky>
</template>
<script>
import iconSearch from "../../assets/images/icon-search.png";
export default {
  props: {
    title: { // 标题
      type: String,
      default: ''
    },
    leftText: { // 左侧文案
      type: String,
      default: ''
    },
    rightText: { // 右侧文案
      type: String,
      default: ''
    },
    leftArrow: { // 是否显示左侧箭头
      type: Boolean,
      default: true
    },
    border: { // 是否显示下边框
      type: Boolean,
      default: true
    },
    fixed: { // 是否固定在顶部
      type: Boolean,
      default: true
    },
    placeholder: { // v2.5.9 固定在顶部时，是否在标签位置生成一个等高的占位元素
      type: Boolean,
      default: true
    },
    zIndex: {
      type: [Number, String],
      default: 499
    },
    safeAreaInsetTop: { // v2.10.13 是否开启顶部安全适配
      type: Boolean,
      default: false
    },
    autoClose: { // 点击后退是否直接返回上一页
      type: Boolean,
      default: true
    },
    backgroundColor: { // 背景色
      type: String,
      default: '#32A5D1'
    },
    iconColor: { // icon颜色
      type: String,
      default: '@white'
    }
  },
  computed: {},
  data() {
    return {
      showNav: true,
      iconSearch: iconSearch
    }
  },
  watch: {},
  mounted() {
    if(process.env.NODE_ENV === "production") {
      this.showNav = false
    }
  },
  methods: {
    onClickLeft() {
      const contactIndex = this.$store.state.contactIndex
      if(this.autoClose && !contactIndex){
        this.$router.go(-1)
        this.$emit('close',{})
      }else{
        this.$emit('close',{})
      }
    },
    onClickRight() {
      this.$emit('clickRight',{})
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .van-nav-bar__placeholder {
  background-color: #3891B9;
}
/deep/ .van-nav-bar,/deep/ .van-nav-bar--fixed{
  //background-color: #32A5D1;
  background: linear-gradient(270deg, #286B97 0%, #3891B9 100%);
  border-radius: 10px 10px 0 0;
}
/deep/ .van-nav-bar__content {
  background: linear-gradient(270deg, #286B97 0%, #3891B9 100%);
}
/deep/ .van-nav-bar .van-icon {
  color: #ffffff;
}
/deep/ .van-nav-bar__title {
  color: #ffffff;
}
/deep/ .van-nav-bar__arrow {
  font-size: 40px;
}
.navbar {
  //position: sticky;
  //position: -webkit-sticky;
  //z-index: 1023;
}
/deep/ .van-hairline--bottom:after {
  border: none;
  display: none;
}
</style>
