<template>
  <div class="list-page">
    <div class="tab-label">
      <label :class="{'active':tab===1}" @click="tabSwitch(1)">投资</label>|
      <label :class="{'active':tab===2}" @click="tabSwitch(2)">管理</label>
    </div>
    <!-- 投资 -->
    <invest v-if="tab===1" :data="investData"></invest>
    <!-- 管理 -->
    <manage v-if="tab===2" :data="manageData"></manage>
  </div>
</template>

<script>
  import Risk from '@/apis/apis/risk';
  import Invest from './invest';
  import Manage from './manage';

  export default {
    components: {
      Invest,
      Manage,
    },
    data() {
      return {
        pro_id: null,
        pr_month: null,
        tab: 1,
        investData: null,
        manageData: null,
      }
    },
    watch: {},
    created() {
      this.pro_id = this.$route.query.pro_id;
      this.pr_month = this.$route.query.pr_month;
      this.getData()
    },
    mounted() {
      
    },
    methods: {
      tabSwitch(n) {
        this.tab = n;
      },
      getData() {
        Risk.getDetail({pro_id: this.pro_id, pr_month: this.pr_month}).then(res => {
          console.log(res)
          if(res.code === 200 && res.result){
            this.investData = { ...res.result.invest, pr_month: this.pr_month };
            this.manageData = { ...res.result.manage, pr_month: this.pr_month };
          }
        })
      }
    }
  }
</script>
<style type="text/css" lang="scss" scoped>
  @import '~@styles/common.scss';
  .list-page{
    >div{
      margin-bottom: 30px;
    }
  }
</style>
