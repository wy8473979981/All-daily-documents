<template>
  <!-- 驳回 -->
  <van-popup
    v-model="fast"
    position="bottom"
    :style="{ height: '50%' }"
  >
    <div class="reject-box">
      <h1>驳回到节点</h1>
      <p>请选择驳回节点(默认为发起人)</p>
      <van-radio-group v-model="rejectStepId">
        <van-radio name="">发起人</van-radio>
        <van-radio v-for="(item, index) in list" :key="index" :name="item.stepId">{{ index + 1 }} {{ item.showStepName }}</van-radio>
      </van-radio-group>
    </div>
    <div class="reject-btn">
      <van-button type="info" @click="submit">确定</van-button>
    </div>
  </van-popup>
</template>
<script>
import { mapState } from "vuex"
import approval from '@/apis/apis/approval';
export default {
  data() {
    return {
      rejectStepId: '',
      isSelect: false,
      list: []
    }
  },
  props: ['open','currApproveStepId'],
  computed: {
    // ...mapState(['approveDetail']),
    ...mapState(['userInfo']),
    fast: {
      get () {
        return this.open
      },
      set (val) {
        this.$emit('close', {fast: false, submit: false})
      }
    }
  },
   watch: {
    fast(val) {
      if(val) {
        this.getDenyStepList();
      }
    }
  },
  methods: {
    // 获取驳回人列表
    getDenyStepList() {
      const param = {
        approveId: this.userInfo.approveId,
        currApproveStepId: this.currApproveStepId
      }
      approval.getDenyStepList(param).then(res => {
        if (res.code == 1) {
          this.list = res.data;
        } else {
          if(res.message) {
            this.$message.error(res.message)
          }
        }
      })
    },
    // 确定
    submit () {
      this.$emit('close', {fast: false, submit: true,rejectStepId:this.rejectStepId})
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

.reject-box {
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
    color: #222222;
    margin-bottom: 10px;
  }
}
.reject-btn {
  width: 100%;
  padding: 0 12px;
  position: fixed;
  bottom: 25px;
}
</style>
<style>
.reject-box .van-radio {
  margin-bottom: 18px;
}
.reject-box .van-radio__label {
  font-size: 14px;
}
.reject-box .van-radio__label span {
  font-size: 12px;
}
.reject-btn .van-button--info {
  width: 100%;
}
</style>
