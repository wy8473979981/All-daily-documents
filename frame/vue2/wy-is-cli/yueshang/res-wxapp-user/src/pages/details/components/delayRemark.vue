<template>
  <!-- 延期意见录入 -->
  <van-popup
    v-model="fast"
    position="bottom"
    :style="{ height: '50%' }"
  >
    <div class="delayRemark-box">
      <h1>
        延期意见录入
        <span v-if="approveOptionCd == 'D'">同意延期</span>
        <span v-if="approveOptionCd == 'R'" class="delayRemark-no">拒绝延期</span>
      </h1>
      <p>审批意见</p>
      <van-field
        v-model="delayMsg"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入推送意见："
        show-word-limit
      />
    </div>
    <div class="delayRemark-btn">
      <van-button type="info" @click="submit">确定</van-button>
    </div>
  </van-popup>
</template>
<script>
import { mapState } from "vuex"
import approval from '@/apis/apis/approval'
export default {
  data() {
    return {
      delayMsg: null,
    }
  },
  props: ['open', 'approveOptionCd'],
  computed: {
    ...mapState(['userInfo', 'approveDetail']),
    fast: {
      get () {
        return this.open
      },
      set (val) {
        this.$emit('close', {fast: false})
      }
    }
  },
  components: {

  },
  created() {
    
  },
  mounted() {

  },
  methods: {
    // 确定
    submit () {
      if (!this.delayMsg) return this.$toast.fail('请填写审批意见')
      const param = {
        id: this.approveDetail.approveDelayId,
        approveOptionCd: this.approveOptionCd,
        approveUserId: this.userInfo.userid,
        approveRemark: this.delayMsg
      }
      approval.doDelayFlow(param).then(res => {
        if(res.code == 1){
          this.$toast.success('操作成功')
          this.$emit('close', {fast: true})
        } else {
          if(res.message) {
            this.$toast.fail(res.message)
          }
        }
      })
    },
    onSearch (val) {
      console.log(val)
    },
    onCancel (val) {
      console.log(val)
    },
  }
};
</script>
<style lang="scss" scoped>
@import "~@/scss/variables.scss";

.delayRemark-box {
  padding: 10px;
  h1 {
    font-size: 16px;
    color: #333333;
    font-weight: 400;
    height: 16px;
    line-height: 16px;
    margin: 12px 0;
    span {
      font-size: 14px;
      margin-left: 10px;
      color: #5AB46E;
    }
    .delayRemark-no {
      color: #EF2941;
    }
  }
  p {
    font-size: 14px;
    color: #696969;
    margin-bottom: 10px;
  }
}
.delayRemark-btn {
  width: 100%;
  padding: 0 12px;
  position: fixed;
  bottom: 25px;
}
</style>
<style>
.delayRemark-btn .van-button--info {
  width: 100%;
}
</style>
