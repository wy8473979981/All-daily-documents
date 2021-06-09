<template>
  <ui-main class="sp-templist-wrapper">
    <van-pull-refresh
      v-model="isLoading"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
    <div>
      <van-cell-group>
        <van-field v-model="message" label="审批编号" placeholder="请输入审批id" />
      </van-cell-group>
      <van-button type="primary" @click="viewDetail">查看详情</van-button>
    </div>
    </van-pull-refresh>

  </ui-main>
</template>

<script>
import formList from '@/apis/apis/formList';
import { mapState } from 'vuex';
import { Toast } from 'vant';
export default {
  data() {
    return {
      ptitle: '地产公司月预算外支出申请表(地产公司资金支付)',
      message: '',
      count: 0,
      isLoading: false,
      showWechatDialog: false,
      lsitData: []
    };
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created() {
    // this.getList();
  },
  methods: {
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        Toast('刷新成功');
        this.isLoading = false;
        this.count++;
        this.aaa = 111;
        console.log(this.aaa)
      }, 1000);
    },
    // 查看详情
    viewDetail() {
      const { message } = this;
      console.log(message)
      this.$router.push({path: 'detail', query: {id: message}});
    },
    // 获取列表
    async getList() {
      let params = {
        ...this.params,
        enterpriseId: this.userInfo.enterpriseId,
        userId: this.userInfo.userid,
      }
      await formList.getList(params).then(res => {
        console.log(res)
        if(res.message === 'success') {
          this.listData = res.data.content;
        }
      });
    },
  }
};
</script>
<style lang="scss" scoped>
@import "~@/scss/variables.scss";
$color: #26a2ff;
.sp-templist-wrapper {
  
}
</style>
