/*
*author: wjh
*date：2020-11-16
*desc：发起微信群
*/

<template>
  <confirmDialog :show="isOpen" @close="isOpen=false">
    <div class="wechat-dialog">
      <p class="wechat-dialog-title">确定发起微信群吗？</p>
      <p>企业微信群将有如下成员：<span v-for="(v,i) in wechatUserList" :key="i">{{v + ';'}}</span></p>
      <p class="wechat-dialog-confirm" @click="confirmWechat">确定</p>
    </div>
  </confirmDialog>
</template>

<script>
  import approval from '@/apis/apis/approval';
  import { Toast } from 'vant';
  import confirmDialog from '@/components/confirmDialog'; // 公共确认框
  import { mapState } from 'vuex'
  export default {
    components: {confirmDialog},
    props: {
      isOpenWechat: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        wechatUserList: [], // 微信群成员列表
      }
    },
    watch: {
      isOpenWechat(val) {
        if(val) {
          this.getWeChatUserList();
        }
      }
    },
    computed: {
      ...mapState(['userInfo']),
      isOpen: {
        get (val) {
          return this.isOpenWechat
        },
        set(val) {
          this.$emit('closeWechat', {isOpenWechat: false})
        }
      }
    },
    methods: {
      // 获取微信群成员
      getWeChatUserList() {
        approval.getWeChatUserList(this.userInfo.approveId).then(res => {
          if (res.code == 1) {
            this.wechatUserList = res.data;
          } else {
            if(res.message) {
              Toast(res.message)
            }
          }
        })
      },
      // 确定发起微信群
      confirmWechat() {
        approval.createWeChat({approveId:this.userInfo.approveId,userId:this.userInfo.userid}).then(res => {
          if (res.code == 1) {
            Toast('发起企业微信群成功')
          } else {
            if(res.message) {
              Toast(res.message)
            }
          }
          this.isOpen = false;
        })
      },
    }
  }
</script>

<style lang='scss' scoped>
  .wechat-dialog {
    .wechat-dialog-title {
      font-size: 16px;
      color: #333;
      margin: 10px 0 10px 0;
    }
    .wechat-dialog-confirm {
      height: 34px;
      line-height: 34px;
      text-align: center;
      color: #fff;
      margin-top: 10px;
      background: linear-gradient(298deg, #468CEB 0%, #35ABFF 100%);
    }
  }
</style>