<template>
  <!-- 底部按钮列表 -->
  <div class="ysn-buttons">
    <van-button plain type="danger" v-if="del" class="ysn-button-del" :class="{'ysn-btn-full': ((!transmit && !reply) || userType === 1),'ysn-btn-min': (transmit && reply)}" @click="delf">删除</van-button>
    <van-button class="app-pl-box-s-btn ysn-btn-full" v-if="showCancel" square type="info" text="恢复" @click="cancelItem()" />
    <van-button type="info" :disabled="disTransmit" v-if="transmit" class="ysn-button-transmit" @click="transmitf">转发</van-button>
    <van-button type="info" :disabled="disReply" v-if="reply" class="ysn-button-reply" @click="replyf">回复</van-button>
  </div>
</template>
<script>

export default {
  data() {
    return {
    }
  },
  props: {
    del: {
      type: Boolean,
      default: false
    },
    transmit: {
      type: Boolean,
      default: false
    },
    reply: {
      type: Boolean,
      default: false
    },
    disReply: {
      type: Boolean,
      default: true
    },
    methodDel: {
      type: Function
    },
    methodTransmit: {
      type: Function
    },
    methodReply: {
      type: Function
    },
    mainId: {
      type: [Number, String]
    },
    disTransmit: {
      type: Boolean,
      default: true
    },
    pageType: {
      type: Number
    },
    source: {
      type: [String, Number]
    },
    showCancel: {
      type: Boolean,
      default: false
    },
  },
  created() {
  },
  methods: {
    async delf() {
      const {uiid, userName} = this.$store.state.userInfo
      // delType 删除类型,收件箱='5',已发送='2',草稿箱='1'
      let delType = ''
      if(this.pageType === 0)delType = '5'
      if(this.pageType === 2)delType = '1'
      if(this.pageType === 1)delType = '2'
      const query = {userId: uiid, userName: userName, mainId: this.mainId,source: this.source,delType:delType}
      if(this.methodDel) {
        console.log('Execute custom events')
        await this.methodDel(query).then(res => {
          console.log('custom-del：', res)
          this.$emit('delf', {mainId: this.mainId})
        })
      }else{
        await this.$axios.user.deleteMailBox(query).then(res => {
          console.log('删除：', res)
          this.$emit('delf', {mainId: this.mainId})
        })
      }
    },
    async cancelItem(item) {
      const {uiid, userName} = this.$store.state.userInfo
      let delType = ''
      if(this.pageType === 0)delType = '5'
      if(this.pageType === 2)delType = '1'
      if(this.pageType === 1)delType = '2'
      const query = {userId: uiid, userName: userName, mainId: this.mainId,source: this.source,delType: delType }
      await this.$axios.user.cancelDelete(query).then(res => {
        console.log('恢复删除草稿：', res)
        if(res && res.code === '1') {
          this.$emit('cancelItem',item)
        }
      })
    },
    transmitf() {
      this.$emit('transmitf', {})
    },
    async replyf() {
      this.$emit('replyf', {})
    }
  },
  mounted() {},
}
</script>
<style lang="scss" scoped>
.ysn-buttons {
  background-color: #FFFFFF;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 40px 34px;
  position: fixed;
  bottom: 0;
  left: 0;

  .ysn-button-del {
    width: 208px;
  }
  .ysn-btn-full {
    flex: 1;
  }
  .ysn-btn-min {
    min-width: 136px!important;
    width: 136px!important;
  }
  .ysn-button-transmit {
    flex: 1;
    margin-left: 20px;
  }
  .ysn-button-reply {
    flex: 1;
    margin-left: 20px;
  }
}
</style>
