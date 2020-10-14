<template>
<div>
<query-table title="还款信息" :columns="columns" :data-source="payments" :pageable="false" class="mt-4">
</query-table>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Watch, Emit } from 'vue-property-decorator'
import { columns } from './config'

@Component
export default class PaymentInfo extends Vue {
  @Prop() dataSource!: any

  columns = columns

  get paymentInfo () {
    return this.dataSource?.orderClearingRepayment || {}
  }

  get payments () {
    return this.paymentInfo?.clearingRepayments || []
  }
}
</script>
