<template>
  <!-- 首页列表模板 -->
  <div>
    <div class="app-main-list" v-for="(item,index) in list" :key="index" @click="callback(item)">
      <van-image class="list-icon" :src="item.icon"></van-image>
      <div class="list-title">{{item.title}}</div>
      <div class="list-right" v-show="item.num && item.num > 0">{{item.num}}</div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {

    }
  },
  props: {
    list: {
      type: Array,
      default: function(){
        return []
      }
    },
    dot: { // 是否显示小红点
      type: Boolean,
      default: false
    },
    badge: { // 显示角标，数值
      type: [Number, String],
      default: ''
    }
  },
  methods: {
    callback(item) {
      if(!item.url || item.call) {
        return this.$emit('callback',item)
      }
      this.$router.push(item.url)
    }
  },
  mounted() {},
}
</script>
<style lang="scss" scoped>
.app-main-list {
  background-color: #FFFFFF;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  padding-left: 46px;

  .list-icon {
    width: 48px;
    height: 48px;
    margin-right: 28px;
  }

  .list-title {
    flex: 1;
    border-bottom: 1px solid #F2F2F2;
    height: 136px;
    line-height: 136px;
    font-size: 32px;
    width: 96px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
  }
  .list-right {
    background: #EC4032;
    border-radius: 16px;
    height: 32px;
    font-size: 22px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 32px;
    min-width: 48px;
    max-width: 300px;
    text-align: center;
    position: absolute;
    right: 32px;
  }
}
</style>
