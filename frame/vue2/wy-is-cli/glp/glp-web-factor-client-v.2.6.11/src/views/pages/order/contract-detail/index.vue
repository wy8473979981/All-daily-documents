<template>
  <div class>
    <glp-card title="保理合同信息">
      <el-row class="contract-info mt-4 mb-6">
        <el-col
          span="8"
          v-for="(item ,index) in dataSourceBuyer"
          :key="index"
          :style="index>2?'padding-bottom: 0':''"
        >
          <label>{{item.label}}</label>
          <span>{{item.value}}</span>
        </el-col>
      </el-row>
    </glp-card>
    <glp-card title="还款信息">
      <el-row class="contract-info mt-4 mb-6">
        <el-col
          span="8"
          v-for="(item ,index) in repaymentInfo"
          :key="index"
          :style="index>5?'padding-bottom: 0':''"
        >
          <label>{{item.label}}</label>
          <span>{{item.value}}</span>
        </el-col>
      </el-row>
    </glp-card>
    <repay-plan></repay-plan>
  </div>
</template>
<script lang='ts'>
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import RepayPlan from './repay-plan/index.vue'
import { Getter, Mutation, namespace } from 'vuex-class'
const Plb = namespace('plb')
@Component({
  components: { RepayPlan }
})
export default class Attachment extends Vue {
  dataSourceBuyer = [
    { label: '订单编号', value: '1234567890123456' },
    { label: '保理融资本金', value: '￥12313' },
    { label: '保理融资费', value: '￥12313' },
    { label: '起息日', value: '2020/10/03/11' }
  ]

  repaymentInfo = [
    { label: '待还总额', value: '￥12313' },
    { label: '待还融资本金', value: '￥12313' },
    { label: '待还保理融资费', value: '￥12313' },
    { label: '待还违约金', value: '￥12313' },
    { label: '已还总额', value: '￥12313' },
    { label: '已还融资本金', value: '￥12313' },
    { label: '已还保理融资费', value: '￥12313' },
    { label: '已还违约金', value: '￥12313' }
  ]
}
</script>
<style lang='scss' scope>
.contract-info {
  .el-col {
    border-left: #eaeaea 1px solid;
    padding-left: 12px;
    padding-bottom: 20px;
    label {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      display: inline-block;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 20px;
    }
    span {
      height: 20px;
      margin-left: 12px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 20px;
    }
  }
}
</style>
