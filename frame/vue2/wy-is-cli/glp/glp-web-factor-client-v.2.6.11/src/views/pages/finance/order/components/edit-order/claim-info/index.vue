<template>
<div>
<glp-section title="请选择基础债权">
  <template v-slot:extra="" v-if="selected">
    <el-tag>已选择基础债权笔数：{{claims.length}}</el-tag>
    <el-tag type="danger" class="ml-4">已选择基础债权金额：{{amount | currency}}</el-tag>
    <el-button size="small" plain class="ml-5" @click="onBack">重新选择</el-button>
  </template>
  <div :class="[$style.query]" class="mt-2">
    <query-form :def="formDefs" @query="onQuery" :form="form" inline :span="12" :xl="12" :class="[$style.form]">
      <template v-slot:range="">
        <div>
          <glp-number v-model="form.min"></glp-number>
          <span class="text-secondary mx-2">至</span>
          <glp-number v-model="form.max"></glp-number>
        </div>
      </template>
    </query-form>
    <div :class="[$style.extra]">
      <el-button size="small" class="px-5 mx-5" @click="onConfirm">确 定</el-button>
    </div>
  </div>
  <query-table :columns="columns" :wrap="false" :checkedRows.sync="checkedRows" ref="tb" api="/clientend/claim/queryEffectiveClaim" row-key="claimNumber" class="mt-4" key="1" v-if="!selected">
    <template v-slot:opt="{row}">
      <el-button type="text" @click="onView(row)">详情</el-button>
    </template>
  </query-table>
  <query-table :columns="selectedColumns" :wrap="false" :data-source="claims" row-key="claimNumber" class="mt-4" key="2" v-else>
    <template v-slot:opt="{row}">
      <el-button type="text" @click="onView(row)">详情</el-button>
    </template>
  </query-table>
</glp-section>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Watch, Ref, Emit } from 'vue-property-decorator'
import { formDefs, columns, selectedColumns } from './config'

@Component
export default class ClaimInfo extends Vue {
  @Prop(Array) claims!: any[]

  @Prop(Array) debts!: any[]

  @Prop() order!: any

  @Ref() tb!: any

  @Emit('update:claims') updateClaims (claims: any[]) {}

  formDefs = formDefs

  columns = columns

  selectedColumns = selectedColumns

  form = {
    claimType: '',
    min: null,
    max: null
  }

  dataSource: any[] = []

  selected = false // 确认

  get checkedRows () {
    return this.claims
  }

  set checkedRows (rows: any[]) {
    this.updateClaims(rows)
  }

  get amount () {
    return this.claims.reduce((sum, n) => sum + Number(n.tradeAmount), 0)
  }

  onConfirm () {
    if (this.claims.length < 1) {
      this.$message.warning('请至少选择一条记录')
      return
    }
    this.selected = true
  }

  onBack () {
    this.selected = false
  }

  onView (row: any) {
    this.$router.push(`/certificate/business/detail/${row.claimNumber}`)
  }

  onQuery (params: any = {}) {
    if (this.debts.length < 1) {
      this.$message.warning('请至少选择一条应收账款记录')
      return
    }
    this.selected = false
    // this.checkedRows = []
    this.$nextTick(() => {
      const debts = this.debts.map(v => v.debtReceivableNumber)
      this.tb.query(Object.assign({}, params, { debts }))
    })
  }

  restore () {
    if (!this.order) return
    const claims = this.order?.baseClaims || []
    if (claims.length < 1) return
    this.selected = true
    this.checkedRows = claims
  }

  // @Watch('project', { immediate: true }) projectChange () {
  //   this.loadData()
  // }
  created () {
    this.restore()
  }

  @Watch('debts') debtsChange () {
    if (this.debts.length > 0) {
      this.onQuery()
    }
  }
}
</script>

<style lang="scss" module>
.query {
  display: flex;
  align-items: flex-end;
}

.extra {
  flex: 0 0 auto;
  padding-bottom: 18px;
}

.form {
  flex: 1 1 auto;
}
</style>
