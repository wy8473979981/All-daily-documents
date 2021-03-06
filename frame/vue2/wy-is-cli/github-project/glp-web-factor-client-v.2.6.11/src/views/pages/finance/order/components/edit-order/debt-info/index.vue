<template>
<div>
<glp-section title="请选择应收账款">
  <div slot="extra">
    <el-select v-model="value" size="small" placeholder="请选择买方" clearable @change="onBuyerChange">
      <dict-options name="buyer-by-project" async reload :form="form"></dict-options>
    </el-select>
  </div>
  <query-table :columns="columns" :dataSource="dataSource" :pageable="false" :wrap="false" :checkedRows.sync="checkedRows" row-key="debtReceivableNumber">
     <template v-slot:opt="{row}">
      <el-button type="text" @click="onView(row)">详情</el-button>
    </template>
  </query-table>
</glp-section>
</div>
</template>

<script lang="ts">

import { Vue, Component, Ref, Prop, Emit, Watch } from 'vue-property-decorator'
import { columns } from './config'

@Component
export default class DebtInfo extends Vue {
  @Prop() project!: any

  @Prop(Array) debts!: any[]

  @Prop() buyerId!: any

  @Prop() order!: any

  @Emit('update:debts') updateDebts (debts: any[]) {}

  @Emit('update:buyerId') updateBuyerId (buyerId: any) {}

  columns = columns

  dataSource: any[] = []

  form = {
    buyerCompanyId: null,
    projectId: null
  }

  set value (value: any) {
    this.updateBuyerId(value)
  }

  get value () {
    return this.buyerId
  }

  get checkedRows () {
    return this.debts
  }

  set checkedRows (rows: any[]) {
    this.updateDebts(rows)
  }

  get projectId () {
    return this.project?.projectId
  }

  get formBuyerId () {
    return this.form.buyerCompanyId || null
  }

  onView (row: any) {
    window.open(location.origin + '/finance/debt/detail/' + row.id)
  }

  onBuyerChange () {
    this.$nextTick(() => {
      this.loadData()
    })
  }

  loadData () {
    if (!this.project || !this.value) {
      this.dataSource = []
      return
    }
    this.$http.post('/clientend/receive/getListOrderDebtList', { projectId: this.projectId, buyerCompanyId: this.value }).then(data => {
      this.dataSource = data || []
      if (this.order) {
        const debts = this.order?.debtReceivableRes || []
        // const ret = debts.map((v: any) => {
        //   const target = this.dataSource.find((w: any) => w.debtReceivableNumber === v.debtReceivableNumber)
        //   return target
        // }).filter((v: any) => !!v)
        this.checkedRows = debts
      } else {
        this.checkedRows = []
      }
    })
    // this.$http.post('/clientend/receive/getListPage', { page: 1, size: 100 }).then(data => {
    //   this.dataSource = (data?.items || []).slice(2)
    //   if (this.order) {
    //     const debts = this.order?.debtReceivableRes || []
    //     // const ret = debts.map((v: any) => {
    //     //   const target = this.dataSource.find((w: any) => w.debtReceivableNumber === v.debtReceivableNumber)
    //     //   return target
    //     // }).filter((v: any) => !!v)
    //     this.checkedRows = debts
    //   } else {
    //     this.checkedRows = []
    //   }
    // })
  }

  restore () {
    this.form.projectId = this.project?.projectId || null
    if (!this.order) return
    this.value = this.order.buyerId || null
    this.loadData()
  }

  @Watch('formBuyerId') projectChange () {
    if (!this.value && this.formBuyerId) {
      this.value = this.formBuyerId
      this.onBuyerChange()
    }
  }

  created () {
    this.restore()
  }
}
</script>
