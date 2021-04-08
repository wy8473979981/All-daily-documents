<template>
  <glp-card title="本次结算信息" class="mt-5">
    <el-table :data="data" border show-summary :summary-method="summaryMethod" style="width: 100%">
      <el-table-column prop="orderNumber" label="融资申请单号" width="180" show-overflow-tooltip></el-table-column>
      <el-table-column prop="buyerCompName" label="买方企业" width="180" show-overflow-tooltip></el-table-column>
      <el-table-column prop="sellerCompName" label="卖方企业" width="180" show-overflow-tooltip></el-table-column>
      <el-table-column prop="realityPrincipal" label="已还本金" show-overflow-tooltip align="right">
        <template slot-scope="scope">{{scope.row.realityPrincipal | currency}}</template>
      </el-table-column>
      <el-table-column
        prop="realityNormalInterest"
        label="已还利息"
        show-overflow-tooltip
        align="right"
      >
        <template slot-scope="scope">{{scope.row.realityNormalInterest | currency}}</template>
      </el-table-column>
      <el-table-column
        prop="realityGraceInterest"
        label="已还宽限期利息"
        show-overflow-tooltip
        align="right"
      >
        <template slot-scope="scope">{{scope.row.realityGraceInterest | currency}}</template>
      </el-table-column>
      <el-table-column prop="realityBreakInterest" label="已还罚息" show-overflow-tooltip align="right">
        <template slot-scope="scope">{{scope.row.realityBreakInterest | currency}}</template>
      </el-table-column>
      <el-table-column prop="realityTotal" label="已还合计" show-overflow-tooltip align="right">
        <template slot-scope="scope">{{scope.row.realityTotal | currency}}</template>
      </el-table-column>
      <el-table-column prop="clearingRepaymentNos" label="还款记录" show-overflow-tooltip>
        <template slot-scope="scope">
          <div v-for="item in scope.row.clearingRepaymentNos" v-bind:key="item">{{item}}</div>
        </template>
      </el-table-column>
    </el-table>
  </glp-card>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import currency from '@/filters/currency'
@Component
export default class OnSettlement extends Vue {
  $style!: any

  @Prop(Array) data!: object

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
