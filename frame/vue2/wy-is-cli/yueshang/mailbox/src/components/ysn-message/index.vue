<template>
  <!-- 回复列表 -->
  <div class="ysn-message">
    <van-row class="msg-row" v-for="(item,index) in list" :key="index" :class="{'msg-show-more': (index > 2 && !more)}">
      <van-cell v-if="list && list.length > 0">
        <div>{{ (item.senderName === userName?'我': item.senderName)}}（{{item.createTime | ftime}}）：</div>
        <div style="white-space: pre-line;">{{item.content}}</div>
      </van-cell>
      <div v-if="index === 0 && list.length > 3" class="msg-row-s" @click="showMore">
        <span>{{showText}}</span>
        <van-image class="msg-row-s-img" :class="{'msg-img-active': more}" :src="iconUp"></van-image>
      </div>
    </van-row>
    <div class="msg-email-box">
      <div class="msg-email" style="white-space: pre-line;" :class="{'msg-email-box-e': list.length === 0}">{{emialText}}</div>
    </div>
  </div>
</template>
<script>
import iconUp from "../../assets/images/icon-up.png"

export default {
  data() {
    return {
      iconUp: iconUp,
      more: false,
      showText: '展开',
      userName: this.$store?this.$store.state.userInfo.userName : null
    }
  },
  props: {
    list: {
      type: Array,
      default: function(){
        return []
      }
    },
    emialText: {
      type: String,
      default: ''
    }
  },
  watch: {
    '$store.state.userInfo'(n) {
      this.userName = n.userName
    }
  },
  activated() {
    this.more = false
    this.showText = '展开'
  },
  methods: {
    showMore() {
      this.more = !this.more
      this.showText = this.showText === '展开'?'收起':'展开'
    }
  },
  mounted() {},
}
</script>
<style lang="scss" scoped>
.msg-row {
  position: relative;
}
.msg-row-s {
  position: absolute;
  top: 20px;
  right: 38px;
  font-size: 24px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #32A5D1;
  line-height: 52px;
  display: flex;
  align-items: center;
  .msg-row-s-img {
    width: 16px;
    margin-left: 12px;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: -webkit-transform 0.3s;
    transition: -webkit-transform 0.3s;
    transition: transform 0.3s;
    transition: transform 0.3s, -webkit-transform 0.3s;
  }
  .msg-img-active {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
    -webkit-transition: -webkit-transform 0.3s;
    transition: -webkit-transform 0.3s;
    transition: transform 0.3s;
    transition: transform 0.3s, -webkit-transform 0.3s;
  }
}
.msg-show-more {
  display: none;
}
.msg-email-box {
  width: 100%;
  background-color: #FFFFFF;
  padding-top: 12px;
  .msg-email {
    border-top: 1px solid #F2F2F2;
    padding: 32px 36px 22px 0;
    margin-left: 36px;
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 60px;
  }
  .msg-email-box-e {
    border-top: none!important;
  }
}

.van-cell::after {
  border: none;
}
</style>
