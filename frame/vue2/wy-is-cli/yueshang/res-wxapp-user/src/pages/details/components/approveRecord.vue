<template>
  <!-- 审批意见 -->
  <div class="content-box message-box">
    <p class="sub-title">审批意见<span>(请在这里填写有效审核/审批意见)</span></p>
    <van-field
      v-model="message"
      rows="4"
      autosize
      type="textarea"
      maxlength="300"
      show-word-limit
    />
    <div class="btn-box">
      <van-button v-if="approveAdmin.agreeBtnFlg" type="info" @click="saveMess(1)">{{ approveDetail.approveStepList[approveDetail.approveStepList.length - 1].approveUserId == '|' + userInfo.userid + '|' ? '完成' : '同意' }}</van-button>
      <van-button v-if="approveAdmin.disAgreeBtnFlg" type="danger" @click="saveMess(2)">不同意</van-button>
      <van-button v-if="approveAdmin.denyBtnFlg" type="danger" @click="saveMess(3)">驳回</van-button>
      <van-button v-if="approveAdmin.meetingBtnFlg" type="info" @click="saveMess(4)">上会</van-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Toast } from 'vant';
import approval from '@/apis/apis/approval';
export default {
  data() {
    return {
      message: ''
    }
  },
  props: ['approveAdmin'],
  computed: {
    ...mapState(['userInfo', 'approveDetail'])
  },
  created() {
  }, 
  methods: {
    // 留言
    saveMess(val) {
      console.log(this.approveAdmin)
      this.$emit('approve', val, this.message)
    }
  },
  filters: {}
};
</script>
<style lang="scss" scoped>
  .content-box {
    padding: 10px;
    border-bottom: 10px solid #ECF0F2;
  }
  .content-box.noborder {
    border: 0;
  }
  .message-box {
    .sub-title {
      font-size: 12px;
      color: #333;
      margin-bottom: 10px;
      span {
        color: #F5A623;
      }
    }
    .btn-box {
      display: flex;
      margin-top: 14px;
      .van-button {
        width: 100%;
        height: 34px;
        line-height: 34px;
        border-radius: 0;
        margin-right: 5px;
      }
      .van-button:last-child {
        margin-right: 0;
      }
    }
  }
</style>
