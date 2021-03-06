<template>
  <div>
    <el-row>
      <el-col span="12">
        <div class="mt-2">
          <span class="money-title">融资企业：</span>
          <span class="money-amount">{{dataS.saleCompany|empty}}</span>
        </div>
      </el-col>
      <el-col span="12">
        <div class="mt-2">
          <span class="money-title">拨付记录生成时间：</span>
          <span class="money-amount">{{dataS.payTime|empty}}</span>
        </div>
      </el-col>
      <el-col span="12">
        <div class="mt-2">
          <span class="money-title">拨出总金额：</span>
          <span class="money-amount">{{dataS.applyAmount|currency}}</span>
        </div>
      </el-col>
      <el-col span="12">
        <div class="mt-2">
          <span class="money-title">拨出银行流水：</span>
          <span class="money-amount">{{dataS.bankSerialNo|empty}}</span>
        </div>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col span="12">
        <div class="mt-2">
          <span class="money-title">拨付到账账号：</span>
          <span class="money-amount">{{dataS.receiptAccountNumber|empty}}</span>
        </div>
        <div class="mt-2">
          <span class="money-title">账户户名：</span>
          <span class="money-amount">{{dataS.receiptAccountName|empty}}</span>
        </div>
        <div class="mt-2">
          <span class="money-title">开户行：</span>
          <span class="money-amount">{{dataS.receiptAccountBank|empty}}</span>
        </div>
      </el-col>
      <el-col span="12">
        <div class="mt-2">
          <span class="money-title">拨付出账账号：</span>
          <span class="money-amount">{{dataS.payAccountNumber|empty}}</span>
        </div>
        <div class="mt-2">
          <span class="money-title">账户户名：</span>
          <span class="money-amount">{{dataS.payAccountName|empty}}</span>
        </div>
        <div class="mt-2">
          <span class="money-title">开户行：</span>
          <span class="money-amount">{{dataS.payAccountBank|empty}}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import { formDefs } from './config'
@Component
export default class ReturnRecord extends Vue {
  $style!: any

  formDefs = formDefs

  @Prop() dataSource!: any

  get dataS() {
    const { receiptAccount = {}, payAccount = {} } = this.dataSource || {}
    const data = Object.assign({}, this.dataSource)
    data.payAccountName = payAccount.accountName
    data.payAccountNumber = payAccount.accountNumber
    data.payAccountBank = payAccount.accountBank
    data.receiptAccountName = receiptAccount.accountName
    data.receiptAccountNumber = receiptAccount.accountNumber
    data.receiptAccountBank = receiptAccount.accountBank
    return data
  }

  mounted() {}
}
</script>

<style lang="scss" module>
</style>
