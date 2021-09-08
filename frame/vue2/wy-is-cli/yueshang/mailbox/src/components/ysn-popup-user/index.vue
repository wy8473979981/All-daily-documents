<template>
  <!-- 通讯录用户信息弹窗 -->
  <van-overlay :show="showPop" @click="hidePopUser" class="overlayNo">
    <div class="app-pop-user" v-if="showPop">
      <div class="user-title">{{userInfo.userName}}</div>
      <div class="user-desc">岗位：<span>{{userInfo.positionName}}</span></div>
      <div class="user-desc">联系方式：<span>{{userInfo.mobilePhone}}</span></div>
    </div>
    <van-image class="app-pop-close" v-if="showPop" :src="iconCloseWhite" @click="hidePopUser"></van-image>
  </van-overlay>
</template>
<script>
import iconCloseWhite from "../../assets/images/icon-close-white.png"
export default {
  data() {
    return {
      userInfo: {},
      iconCloseWhite: iconCloseWhite
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    filterFull: {
      type: Number,
      default: 0
    },
    userId: {
      type: [Number,String]
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
  watch: {
    userId(n) {
      if(n) this.getUserInfo()
    }
  },
  mounted() {

  },
  methods: {
    hidePopUser() {
      this.$emit('hidePopUser',{})
    },
    savePopMsg() {
      this.$emit('savePopMsg',{})
    },
    sentPopMsg() {
      this.$emit('sentPopMsg',{})
    },
    async getUserInfo() {
      const {uiid, token} = this.$store.state.user
      await this.$axios.common.getUserInfo({uiid, token, queryUiid: this.userId}, null, false).then(res => {
        console.log('获取用户信息-pop：', res)
        if(res && res.data) {
          this.userInfo = res.data
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.van-popup {
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  background-color: transparent;
}
.van-overlay {
  display: -webkit-flex;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.app-pop-user {
  width: 408px;
  padding: 48px 32px;
  background-color: #FFFFFF;
  border-radius: 4px;
  .user-title {
    font-size: 32px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 24px;
    margin-bottom: 40px;
  }
  .user-desc {
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #908E94;
    line-height: 48px;
    color: #908E94;
    &:nth-child(2) {
      //margin-bottom: 24px;
    }
    span {
      color: #333333;
    }
  }
}
.app-pop-close {
  margin-top: 32px;
  width: 100%;
  text-align: center;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  /deep/ img {
    width: 80px;
    height: 80px;
  }
  image {
    width: 80px;
    height: 80px;
  }
}
</style>
