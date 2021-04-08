<template>
  <glp-section title="基础合同信息">
    <el-row class="contract-partner-info mt-4 mb-6">
      <el-col span="8" v-for="(item ,index) in dataSourceBuyer" :key="index">
        <label>{{item.label}}</label>
        <span>{{item.value}}</span>
      </el-col>
      <el-col span="16">
        <label>应收账款描述</label>
        <span>{{debtDescripton || '-'}}</span>
        <!-- <span>这是一个超长的段落描述，总计字符数不超过五十个汉子，不对应该是汉字，你怎么这么马虎，汉字都能写作，你可真心，我晕写错写成了写做，不对是写作</span> -->
      </el-col>
    </el-row>
  </glp-section>
</template>
<script lang='ts'>
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import { Getter, Mutation, namespace } from 'vuex-class'
import { format } from '@/utils/date'
const Plb = namespace('plb')
@Component
export default class ContractInfo extends Vue {
  @Plb.State('paperContract') paperContract!: any
  get dataSourceBuyer() {
    return [
      { label: '合同名称', value: this.paperContract.contractName },
      { label: '合同编号', value: this.paperContract.contractCode },
      {
        label: '合同到期日',
        value: format(new Date(this.paperContract.contractEndDate))
      },
      { label: '合同金额', value: '-' }
    ]
  }

  get debtDescripton() {
    return this.paperContract.debtDescripton
  }
}
</script>
<style lang='scss' scope>
.contract-partner-info {
  .el-col {
    border-left: #eaeaea 1px solid;
    padding-left: 12px;
    margin-bottom: 20px;
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
