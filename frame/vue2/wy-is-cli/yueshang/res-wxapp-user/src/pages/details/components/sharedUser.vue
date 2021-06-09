<template>
  <!-- 共享人员列表组件 -->
  <div v-if="userList.length > 0" class="sharedUser-box">
    <h1>已共享给</h1>
    <div class="sharedUser-list">
      <span v-for="(item, index) in userList" :key="index">{{ item.userName }}；</span>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
import approval from '@/apis/apis/approval'
export default {
  data() {
    return {
      userList: []
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created() {
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取共享人员列表
    getList () {
      const param = {
        approveId: this.userInfo.approveId,
        enterpriseId: this.userInfo.enterpriseId,
        userId: this.userInfo.userid
      }
      approval.sharedFindUserByApproveId(param).then(res => {
        if(res.code == 1){
          if (res.data) {
            this.userList = res.data
          } else {
            this.userList = []
          }
        } else {
          this.$toast.fail(res.message)
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/scss/variables.scss";
$color: #468CEB;
$color-border: #F4F5F5;

.sharedUser-box {
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
  .sharedUser-list {
    span {
      font-size: 14px;
      color: #0167a2;
      word-break: break-all;
    }
  }
}
</style>
