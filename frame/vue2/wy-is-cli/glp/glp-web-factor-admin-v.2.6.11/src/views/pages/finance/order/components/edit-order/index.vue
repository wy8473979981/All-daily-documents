<template>
<div :class="[$style.container]" v-loading="loading">
  <process-steps :current="status" process :name="stepName"></process-steps>
  <glp-tabs v-model="tab" class="mt-4">
    <glp-tab-pane label="融资申请基本信息" name="order"> <order-info :data-source="dataSource" :type="type" ref="order"></order-info> </glp-tab-pane>
    <glp-tab-pane label="基础债权信息" name="claim"> <claim-info :data-source="dataSource" :type="type"></claim-info> </glp-tab-pane>
    <glp-tab-pane label="融资合同等附件" name="contract"> <contract-info :data-source="dataSource"></contract-info> </glp-tab-pane>
    <glp-tab-pane label="还款信息" name="payment" v-if="type === 'view'"> <payment-info :data-source="dataSource"></payment-info> </glp-tab-pane>
  </glp-tabs>
</div>
</template>

<script lang="ts">

import { Vue, Component, Ref, Prop, Watch, Emit } from 'vue-property-decorator'
import OrderInfo from './order-info/index.vue'
import ClaimInfo from './claim-info/index.vue'
import ContractInfo from './contract-info/index.vue'
import PaymentInfo from './payment-info/index.vue'

@Component({
  components: { OrderInfo, ClaimInfo, ContractInfo, PaymentInfo }
})
export default class EditOrder extends Vue {
  @Prop(String) id!: any

  @Prop(String) type!: 'view' | 'audit'

  @Emit() load (data: any) {}

  @Ref() order!: OrderInfo

  tab = 'order'

  dataSource: any = null

  loading = false

  get status () {
    return this.dataSource?.status
  }

  get stepName () {
    return String(this.dataSource?.confirm) === '0' ? '_order5Steps' : '_orderSteps'
  }

  submit (): Promise<any> {
    return this.order.submit()
  }

  loadData () {
    if (!this.id) {
      this.dataSource = null
      return
    }
    this.loading = true
    this.$http.get(`/backend/order/queryOrderDetail/${this.id}`).then(data => {
      this.dataSource = data || null
      this.load(this.dataSource)
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
