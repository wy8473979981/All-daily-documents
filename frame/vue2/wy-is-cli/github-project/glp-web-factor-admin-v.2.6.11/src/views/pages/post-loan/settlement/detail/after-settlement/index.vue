<template>
  <glp-card title="结算后信息" class="mt-5">
    <el-table :data="data" border show-summary :summary-method="summaryMethod" style="width: 100%">
      <el-table-column prop="orderNumber" label="融资申请单号" width="180" show-overflow-tooltip></el-table-column>
      <el-table-column prop="buyerCompName" label="买方企业" show-overflow-tooltip></el-table-column>
      <el-table-column prop="sellerCompName" label="卖方企业" show-overflow-tooltip></el-table-column>
      <el-table-column prop="surplusPrincipal" label="待还本金" show-overflow-tooltip align="right">
        <template slot-scope="scope">{{scope.row.surplusPrincipal | currency}}</template>
      </el-table-column>
      <el-table-column
        prop="surplusNormalInterest"
        label="待还利息"
        v-if="summary.productCode!='GLP_CHAIN_FACTORING'"
        show-overflow-tooltip
        align="right"
      >
        <template slot-scope="scope">{{scope.row.surplusNormalInterest | currency}}</template>
      </el-table-column>
      <el-table-column
        prop="surplusGraceInterest"
        label="待还宽限期利息"
        show-overflow-tooltip
        align="right"
      >
        <template slot-scope="scope">{{scope.row.surplusGraceInterest | currency}}</template>
      </el-table-column>
      <el-table-column prop="surplusBreakInterest" label="待还罚息" show-overflow-tooltip align="right">
        <template slot-scope="scope">{{scope.row.surplusBreakInterest | currency}}</template>
      </el-table-column>
      <el-table-column prop="surplusTotal" label="待还合计" show-overflow-tooltip align="right">
        <template slot-scope="scope">{{scope.row.surplusTotal | currency}}</template>
      </el-table-column>
    </el-table>
  </glp-card>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import number from '@/filters/number'
import currency from '@/filters/currency'
@Component
export default class AfterSettlement extends Vue {
  $style!: any

  @Prop(Array) data!: object

  @Prop(Object) summary!: object

  summaryMethod(params: any) {
    const { columns, data } = params
    const sums: any = []
    columns.forEach((column: any, index: any) => {
      if (index === 0) {
        sums[index] = '合计'
        return
      }
      if (index === 1 || index === 2) {
        sums[index] = '-'
        return
      }
      const values = data.map((item: any) => Number(item[column.property]))
      if (!values.every((value: any) => isNaN(value))) {
        sums[index] = values.reduce((prev: any, curr: any) => {
          const value = Number(curr)
          if (!isNaN(value)) {
            return prev + curr
          } else {
            return prev
          }
        }, 0)
        sums[index] = currency(sums[index])
      } else {
        sums[index] = '-'
      }
    })
    return sums
  }
}
</script>
<style lang="scss" module></style>
