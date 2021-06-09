<template>
  <!-- 申请延期组件 -->
  <div v-if="approveDetail.approveDelay.approveUserId == userInfo.userid" class="delayModule-box">
    <h1>延期申请</h1>
    <div class="delayModule-data">
      <p>
        <span class="span-title">申请时间:</span>
        <span class="span-value">{{ approveDetail.approveDelay.applyDate }}</span>
      </p>
      <p>
        <span class="span-title">申请延期:</span>
        <span class="span-value">{{ approveDetail.approveDelay.delayTime }}小时</span>
      </p>
      <p>
        <span class="span-title">发起人:</span>
        <span class="span-value">{{ approveDetail.approveDelay.approveUserName }} -> [{{ approveDetail.approveDelay.applyUserName }}] {{ approveDetail.approveDelay.statusCdName }}</span>
      </p>
      <p>
        <span class="span-title">申请事由:</span>
        <span class="span-value">{{ approveDetail.approveDelay.applyRemark }}</span>
      </p>
      <p class="delayModule-btn">
        <van-button type="info" @click="agree">同意延期</van-button>
        <van-button type="danger" @click="refuse">拒绝延期</van-button>
      </p>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      
    }
  },
  computed: {
    ...mapState(['userInfo', 'approveDetail'])
  },
  created() {
    
  },
  mounted() {
  },
  methods: {
    agree () {
      this.$emit('submit', 'D')
    },
    refuse () {
      this.$emit('submit', 'R')
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/scss/variables.scss";
$color: #468CEB;
$color-border: #F4F5F5;

.delayModule-box {
  padding: 10px;
  background-color: #FFFFFF;
  border-bottom: 10px solid $color-border;
  h1 {
    font-size: 16px;
    color: #333333;
    font-weight: 400;
    height: 16px;
    line-height: 16px;
    border-left: 3px solid $color;
    padding-left: 5px;
    margin: 0 0 10px;
  }
  .delayModule-data {
    p {
      font-size: 14px;
      display: flex;
      margin-bottom: 8px;
      line-height: 20px;
      .span-title {
        flex: none;
        display: block;
        width: 108px;
        color: #757575;
      }
      .span-value {
        flex: 1;
        color: #333333;
      }
    }
    .delayModule-btn {
      display: flex;
      justify-content: flex-end;
      .van-button {
        height: 34px;
        font-size: 14px;
        margin-left: 10px;
      }
    }
  }
}
</style>
