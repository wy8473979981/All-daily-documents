<template>
  <!-- 申请延期 -->
  <ui-main class="delay-box">
    <div class="delay-tip">
      <van-notice-bar
        wrapable
        :scrollable="false"
        text="友情提示：请联系“发起中心总经理”进行处理。"
      />
    </div>
    <div class="delay-operate">
      <div class="delay-date">
        <div class="delay-date-label">
          <span>延期申请：</span>
        </div>
        <div class="delay-date-num">
          <van-field v-model="info.delayTime" maxlength="2" type="digit" />
          <span>小时（最多24小时）</span>
        </div>
      </div>
      <div class="delay-date">
        <div class="delay-date-label">
          <span>审批方式：</span>
        </div>
        <div class="delay-date-num">
          <van-radio-group v-model="info.applyTypeCd">
            <van-radio :name="2">表单发起人</van-radio>
            <van-radio :name="0">经发起中心总经理</van-radio>
          </van-radio-group>
        </div>
      </div>
      <div v-if="info.applyTypeCd == 0" class="delay-date">
        <div class="delay-date-label" style="width: 120px;">
          <span>发起中心总经理：</span>
        </div>
        <div class="delay-date-num">
          <van-field :value="selectUserList[0]? selectUserList[0].userName: ''" @focus="showUserList" />
        </div>
      </div>
      <div class="delay-date">
        <div class="delay-date-label">
          <span>申请原因：</span>
        </div>
        <div class="delay-date-num">
          <van-field
            v-model="info.applyRemark"
            rows="2"
            autosize
            type="textarea"
            maxlength="50"
            placeholder="请输入申请原因"
            show-word-limit
          />
        </div>
      </div>
    </div>
    <div class="delay-btn">
      <van-button type="info" @click="submit">确定</van-button>
      <van-button plain type="info" @click="$router.go(-1)">取消</van-button>
    </div>
    <!-- 组织架构 -->
    <search-user :open="fast" @close="closeFast"></search-user>
  </ui-main>
</template>
<script>
import approval from '@/apis/apis/approval'
import searchUser from './components/searchUser'
import { mapState, mapMutations } from "vuex"
export default {
  data() {
    return {
      fast: false,
      info: {
        delayTime: null, //延期时间
        applyTypeCd: 0, //审批方式
        approveUserId: null, //发起中心总经理
        applyRemark: null, //申请原因
      }
    }
  },
  components: {
    searchUser
  },
  computed: {
    ...mapState(['userInfo', 'selectUserList'])
  },
  watch: {
    'info.delayTime' (val) {
      if (val > 24) {
        this.info.delayTime = 24
      }
    }
  },
  created() {

  },
  mounted() {
    // 清除推送共享等页面储存选中人员
    this.$store.state.selectUserList = []
  },
  methods: {
    ...mapMutations(['saveBlOrgTreeList']),
    // 获取宝龙机构人员树
    findBlOrgTree() {
      approval.findBlOrgTree().then(res => {
        if (res.code == 1) {
          this.saveBlOrgTreeList(res.data)
        } else {
          this.$toast.fail(res.message)
        }
      })
    },
    showUserList () {
      this.fast = true
      if (!this.$store.state.bljtOrgTreeList.text) {
        this.findBlOrgTree()
      }
    },
    closeFast (res) {
      this.fast = res.fast
      if (this.selectUserList[0]) {
        this.info.approveUserId = this.selectUserList[0].userCd
      } else {
        this.info.approveUserId = ''
      }
    },
    submit() {
      if (!this.info.delayTime) return this.$toast.fail('请填写延期时间')
      if (this.info.applyTypeCd == 0 && !this.info.approveUserId) return this.$toast.fail('请填写发起中心总经理')
      if (this.info.applyTypeCd == 2) this.info.approveUserId = ''
      if (!this.info.applyRemark) return this.$toast.fail('请填写申请原因')
      const params = {
        ...this.info,
        applyUserId: this.userInfo.userid,
        applyUserName: this.userInfo.username,
        approveId: this.userInfo.approveId
      }
      approval.savePmApproveDelay(params).then(res => {
        if(res.code == 1){
          this.$toast.success('申请成功')
          this.$router.push('/detail')
        } else {
          this.$toast.fail(res.message)
        }
      })
    },
  }
};
</script>
<style lang="scss" scoped>
@import "~@/scss/variables.scss";

.delay-box {
  background-color: #FFFFFF;
  .delay-tip {
    border-bottom: 10px solid #ECF0F2;
  }
  .delay-operate {
    padding: 10px;
    .delay-date {
      display: flex;
      margin-bottom: 15px;
      .delay-date-label {
        flex: none;
        width: 80px;
        font-size: 14px;
        line-height: 26px;
        color: #333333;
      }
      .delay-date-num {
        display: flex;
        width: 100%;
        font-size: 14px;
        span {
          width: 150px;
          padding-left: 10px;
          line-height: 26px;
          color: #999999;
        }
      }
    }
  }
  .delay-btn {
    width: 100%;
    padding: 0 12px;
  }
}
</style>
<style>
.delay-box .van-field {
  flex: 1;
}
.delay-box .van-radio:first-child {
  margin-bottom: 10px;
}
.delay-btn .van-button--info {
  width: 100%;
}
.delay-btn .van-button--plain.van-button--info {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  margin-top: 15px;
}
</style>
