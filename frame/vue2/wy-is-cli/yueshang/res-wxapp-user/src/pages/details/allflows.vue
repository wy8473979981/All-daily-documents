<template>
  <ui-main class="sp-allflows-wrapper" v-show="show">
    <van-pull-refresh
      v-model="isLoading"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
     <div>
      <label style="margin-left: 10px" class="btn default" @click="backDetail">返回</label>
      <p class="remark-title">注：前有<van-icon class="star" name="star" />属于会签节点</p>
      <div class="flows" v-for="(stepList,j) in flowData" :key="stepList.conditionId">
        <p class="title">{{j + 1 + '. '}}{{stepList.conditionName}}</p>
        <div class="flow-list"  v-if="stepList.processStepShowVoList.length > 0">
          <p class="list" v-for="(v,i) in stepList.processStepShowVoList" :key="i">
            <span v-if="v.nodeGroupName && v.nodeGroupName.includes('会签')">
              <span v-if="v.displayNumber != (stepList.processStepShowVoList[i-1] && stepList.processStepShowVoList[i-1].displayNumber)">{{v.displayNumber + '.'}}</span>
               <van-icon class="star" name="star" />
               <span>{{v.stepName}}</span>
            </span>
            <span v-else>
              {{(v.displayNumber ? v.displayNumber + '.' : '')+ (v.stepName)}}
            </span>
          </p>
        </div>
        <div v-else>该流程下暂无数据</div>
      </div>
    </div>
    </van-pull-refresh>

  </ui-main>
</template>

<script>
import { Toast } from 'vant';
import approval from '@/apis/apis/approval';
import { mapState } from "vuex"
export default {
  props: ['value'],
  data() {
    return {
      count: 0,
      isLoading: false,
      flowData: []
    };
  },
  watch: {
    show(val) {
      if(val) {
        this.getListNew()
      }
    }
  },
  computed: {
     ...mapState(['approveDetail']),
    show: {
      get() {
        return this.value
      }
    }
  },
  // created() {
  //   this.getListNew();
  // },
  methods: {
    // 获取流程列表数据
    async getListNew() {
      console.log(this.approveDetail)
      const params = {
        processId: this.approveDetail.pmApprove.processId,
        rows: 999
      };
      await approval.getPmProcessFlow(params).then(res => {
        if(res.code == 1 && res.data){
          // this.tableData = res.data;
          const data = res.data.content;
          this.flowData = data;
          // console.log(this.flowData,777)
        }
      });
    },
    backDetail() {
      this.$emit('input',false)
    },
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        Toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
  }
};
</script>
<style lang="scss" scoped>
@import "~@/scss/variables.scss";
$color: #26a2ff;
.sp-allflows-wrapper {
  padding: 5px 0 10px;
  background-color: #FFFFFF;
  z-index: 999;
  .star {
    color: #EF2941;
    vertical-align: text-top;
    margin: 0 3px;
  }
  .remark-title {
    font-size: 12px;
    padding: 0 10px 10px;
    color: #F5A623;
  }
  .flows {
    padding: 10px;
    border-top: 10px solid#ECF0F2;
    .title {
      font-size: 14px;
      color: #333;
      font-weight: 600;
    }
    .list {
      padding-left: 10px;
      font-size: 14px;
      color: #656565;
      line-height: 26px;
      p {
        padding-left: 13px;
      }
      p:first-child {
        padding: 0;
      }
    }
  }
}
</style>
