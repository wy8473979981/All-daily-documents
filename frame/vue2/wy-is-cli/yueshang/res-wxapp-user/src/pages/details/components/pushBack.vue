<template>
  <!-- 推送退回意见录入 -->
  <van-popup
    v-model="fast"
    position="bottom"
    :style="{ height: '50%' }"
  >
    <div class="pushBack-box">
      <h1>推送退回</h1>
      <p>请输入退回原因</p>
      <van-field
        v-model="backMsg"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入退回原因："
        show-word-limit
      />
    </div>
    <div class="pushBack-btn">
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
      backMsg: null,
    }
  },
  props: ['open'],
  computed: {
    ...mapState(['userInfo']),
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
      if (!this.backMsg) return this.$toast.fail('请输入退回原因')
      const param = {
        approveId: this.userInfo.approveId,
        userId: this.userInfo.userid,
        backMsg: this.backMsg
      }
      approval.doPushBack(param).then(res => {
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

.pushBack-box {
  padding: 10px;
  h1 {
    font-size: 16px;
    color: #333333;
    font-weight: 400;
    height: 16px;
    line-height: 16px;
    margin: 12px 0;
  }
  p {
    font-size: 14px;
    color: #696969;
    margin-bottom: 10px;
  }
}
.pushBack-btn {
  width: 100%;
  padding: 0 12px;
  position: fixed;
  bottom: 25px;
}
</style>
<style>
.pushBack-btn .van-button--info {
  width: 100%;
}
</style>
