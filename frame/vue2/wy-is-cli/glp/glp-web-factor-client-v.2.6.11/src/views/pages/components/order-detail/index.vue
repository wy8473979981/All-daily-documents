<template>
<div :class="[$style.container]" v-loading="loading">

  <audit-steps :current="status" name="_orderSteps" class="mt-7"></audit-steps>

  <glp-section title="融资信息" class="mt-7">
    <detail-form :def="financeDetailDef" label-width="100px" :data-source="dataSource" class="mt-2" v-if="dataSource"></detail-form>
  </glp-section>

  <query-table title="应收账款信息" :data-source="debts" :columns="debtColumns" :pageable="false">
    <template v-slot:opt="{row}">
      <el-button type="text" @click="onViewDebt(row)">详情</el-button>
    </template>
  </query-table>

  <glp-section title="收款账户信息">
    <detail-form :def="accountDetailDef" label-width="100px" :data-source="dataSource" class="mt-2" v-if="dataSource"></detail-form>
  </glp-section>

  <query-table title="基础债权信息" :data-source="claims" :columns="claimColumns" :pageable="false">
    <template v-slot:opt="{row}">
      <el-button type="text" @click="onViewClaim(row)">详情</el-button>
    </template>
  </query-table>

  <glp-section title="审批信息" class="mt-4" v-if="status === 9">
    <detail-form :def="auditDetailDef" label-width="100px" :data-source="dataSource" class="mt-2" v-if="dataSource"></detail-form>
  </glp-section>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import { financeDetailDef, accountDetailDef, auditDetailDef, debtColumns, claimColumns } from './config'

@Component
export default class Detail extends Vue {
  @Prop(String) id!: string

  financeDetailDef = financeDetailDef

  accountDetailDef = accountDetailDef

  auditDetailDef = auditDetailDef

  debtColumns = debtColumns

  claimColumns = claimColumns

  dataSource: any = null

  loading = false

  get debts () {
    return this.dataSource?.debtReceivableRes || []
  }

  get claims () {
    return this.dataSource?.baseClaims || []
  }

  get status () {
    // TODO 等待后端添加字段
    return Number(this.dataSource?.status || 3)
  }

  onViewDebt (row: any) {
    window.open(location.origin + '/finance/debt/detail/' + row.id)
  }

  onViewClaim (row: any) {
    this.$router.push(`/certificate/business/detail/${row.claimNumber}`)
  }

  loadData () {
    if (!this.id) {
      this.dataSource = null
      return
    }
    this.loading = true
    this.$http.post('/clientend/order/queryOrderDetail', { orderNumber: this.id }).then(data => {
      this.dataSource = data || null
    }).finally(() => {
      this.loading = false
    })
  }

  @Watch('id', { immediate: true }) idChange () {
    this.loadData()
  }
}
</script>

<style lang="scss" module>
.container {
  min-height: 80vh;
}
</style>
