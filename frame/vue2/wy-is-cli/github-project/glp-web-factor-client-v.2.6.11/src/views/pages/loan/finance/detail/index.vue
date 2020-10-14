<template>
    <div>
          <breadcrumb/>
          <apply-steps class="mt-4"></apply-steps>
          <glp-card title="融资信息" class="mt-4">
              <detail-form :def="financeDefs" :dataSource="finance" label-width="120px">
              </detail-form>
          </glp-card>
          <glp-card title="收款账户信息" class="mt-4">
              <detail-form :def="payeeDefs" :dataSource="receiptAccount" label-width="120px">
              </detail-form>
          </glp-card>
          <glp-card title="应收账款信息" class="mt-4">
              <detail-form :def="accountsDefs" :dataSource="debtReceivableRes" label-width="120px">
              </detail-form>
          </glp-card>
            <query-table :columns="columns" :dataSource="baseClaims" class="mt-4" :pageable="false" title="基础债权信息">
                <template v-slot:opt="{row}" >
                  <el-button type="text" size="mini" @click="onLink(row)">详 情</el-button>
              </template>
            </query-table>
      </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import ApplySteps from './components/apply-steps/index.vue'
import { financeDefs, payeeDefs, accountsDefs, columns } from './config'
@Component({
  components: { ApplySteps }
})
export default class FinanceDetail extends Vue {
  @Prop(String) id!: string
  financeDefs = financeDefs
  payeeDefs = payeeDefs
  accountsDefs = accountsDefs
  columns = columns
  debtReceivableRes={}
  receiptAccount={}
  baseClaims={}
  finance={}
  @Ref() tb!: any

  onLink (params: any = {}) {
    console.log(params)
    this.$router.push(`/finance/apply/detail/${params.id}`)
  }

  mounted () {
    this.$http.post<any>(
      '/backend/order/queryOrderDetail',
      { orderNumber: this.id }
    ).then(data => {
      this.baseClaims = data.baseClaims
      this.debtReceivableRes = data.debtReceivableRes
      const { receiptAccountName, receiptBankFiliale, receiptBankNumber, amount, repaymentType, rate, breakRate, submitTime, latestRepaymentDate, sellerCompanyName, buyerCompanyName, interestCalculationMethod, interestTime, dueTime, discountRate } = data
      this.receiptAccount = { receiptAccountName, receiptBankFiliale, receiptBankNumber }
      this.finance = { amount, repaymentType, rate, breakRate, submitTime, latestRepaymentDate, sellerCompanyName, buyerCompanyName, interestCalculationMethod, interestTime, dueTime, discountRate }
    })
  }
}
</script>

<style lang="scss" module>

</style>
