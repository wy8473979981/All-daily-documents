<template>
  <glp-section title="基础合同交易方">
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
    <el-row class="contract-info mt-4 mb-4">
      <el-col
        span="8"
        v-for="(item ,index) in dataSourceSeller"
        :key="index"
        :style="index>2?'padding-bottom: 0':''"
      >
        <label>{{item.label}}</label>
        <span>{{item.value}}</span>
      </el-col>
    </el-row>
  </glp-section>
</template>
<script lang='ts'>
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import { Getter, Mutation, namespace } from 'vuex-class'
const Plb = namespace('plb')
@Component
export default class ContractPartnerInfo extends Vue {
  @Plb.State('paperContract') paperContract!: any
  get dataSourceBuyer() {
    return [
      { label: '买方名称', value: this.paperContract.buyerName },
      { label: '买方联系人姓名', value: this.paperContract.buyerContactName },
      { label: '买方联系人电话', value: this.paperContract.buyerContactMobile },
      {
        label: '买方所在区域',
        value: this.paperContract.buyerContactLawFileSendAddr
      },
      { label: '买方联系人邮箱', value: this.paperContract.buyerContactEmail },
      {
        label: '买方法律文书送达地址',
        value: this.paperContract.buyerContactLawFileSendAddr
      }
    ]
  }

  get dataSourceSeller() {
    return [
      { label: '卖方名称', value: this.paperContract.sellerName },
      { label: '卖方联系人姓名', value: this.paperContract.sellerContactName },
      {
        label: '卖方联系人电话',
        value: this.paperContract.sellerContactMobile
      },
      {
        label: '卖方所在区域',
        value: this.paperContract.sellerContactLawFileSendAddr
      },
      { label: '卖方联系人邮箱', value: this.paperContract.sellerContactEmail },
      {
        label: '卖方法律文书送达地址',
        value: this.paperContract.sellerContactLawFileSendAddr
      }
    ]
  }
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
