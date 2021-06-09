<template>
  <!-- 延期历史 -->
  <ui-main class="delayHistory-box">
    <label class="btn default" style="margin: 5px 0 0 10px;" @click="$router.go(-1)">返回</label>
    <ul>
      <li v-for="(item, index) in tableData" :key="index">
        <p>
          <span class="span-title">申请人:</span>
          <span class="span-value">{{ item.applyUserName }}</span>
        </p>
        <p>
          <span class="span-title">申请延期:</span>
          <span class="span-value">{{ item.delayTime }}小时</span>
        </p>
        <p>
          <span class="span-title">发起时间:</span>
          <span class="span-value">{{ item.applyDate }}</span>
        </p>
        <p>
          <span class="span-title">审批人:</span>
          <span class="span-value">{{ item.approveUserName }}</span>
        </p>
        <p>
          <span class="span-title">审批状态:</span>
          <span class="span-value">{{ item.statusCd }}</span>
        </p>
        <p>
          <span class="span-title">审批意见:</span>
          <span class="span-value">{{ item.approveRemark }}</span>
        </p>
        <p>
          <span class="span-title">审批时间:</span>
          <span class="span-value">{{ item.approveDate }}</span>
        </p>
      </li>
    </ul>
  </ui-main>
</template>
<script>
import { mapState } from "vuex"
import approval from '@/apis/apis/approval'
export default {
  data() {
    return {
      tableData: [],
      pageInfo: {
        rows: 999,
        page: 1,
        sum_num: 0
      },
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  components: {

  },
  created() {

  },
  mounted() {
    this.findPmApproveDelayPage()
  },
  methods: {
    // 获取延期历史列表
    findPmApproveDelayPage() {
      const params = {
        ...this.pageInfo,
        // userId: this.userInfo.userid,
        approveId: this.userInfo.approveId,
        enterpriseId: this.userInfo.enterpriseId,
      }
      approval.findPmApproveDelayPage(params).then(res => {
        if(res.code == 1){
          this.tableData = res.data.content
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

.delayHistory-box {
  background-color: #FFFFFF;
  ul {
    padding: 0;
    li {
      padding: 20px 10px 0;
      border-bottom: 10px solid #ECF0F2;
      p {
        font-size: 14px;
        display: flex;
        margin-bottom: 8px;
        line-height: 20px;
        .span-title {
          flex: none;
          display: block;
          width: 75px;
          color: #757575;
        }
        .span-value {
          flex: 1;
          color: #333333;
        }
      }
    }
  }
}
</style>
