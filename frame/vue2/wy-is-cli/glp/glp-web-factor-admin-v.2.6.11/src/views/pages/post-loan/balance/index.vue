<template>
  <div>
    <query-form :def="formDefs" @query="onQuery"></query-form>
    <query-table
      :columns="columns"
      ref="tb"
      api="/backend/repayment/getRepaymentInfoListPage"
      class="mt-4"
    >
      <template v-slot:opt="{row}">
        <el-button type="text" @click="tradeFlow(row)">交易流水</el-button>
      </template>
    </query-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import { formDefs, columns } from './config'
@Component
export default class Index extends Vue {
  $style!: any

  @Ref() tb!: any

  formDefs = formDefs

  columns = columns

  onQuery(params: any = {}) {
    this.tb.query(params)
  }

  tradeFlow(row: any) {
    this.$router.push({
      path: `/post-loan/balance/transfer-flow/${row.repaymentAccountBalanceId}`,
      query: {
        sellerName: row.sellerName,
        projectName: row.projectName,
        clearWay: row.clearWay,
        sellId: row.sellId,
        projectId: row.projectId
      }
    })
  }

  mounted() {
    this.onQuery()
  }
}
</script>

<style lang="scss" module>
</style>
