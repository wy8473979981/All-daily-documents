<template>
<div>
<modal title="已关联发票列表" width="70vw" ref="modal">
  <query-table :columns="columns" :pageable="false" :data-source="dataSource" :wrap="false" row-key="invoiceNo" v-loading="loading" class="mt-4" :class="[$style.table]">
    <template v-slot:opt="{row}">
      <el-button type="text" @click="onView(row)">详情</el-button>
    </template>
  </query-table>
</modal>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import { columns } from './config'

@Component
export default class InvoiceList extends Vue {
  @Ref() modal!: any

  @Ref() tb!: any

  row: any = null

  columns = columns

  dataSource: any[] = []

  loading = false

  get orderNumber () {
    return this.row?.orderNumber
  }

  view (row: any) {
    this.row = row
    this.loadData()
    return this.modal.open()
  }

  onView (row: any) {
    this.$message.warning('该功能正在开发中')
  }

  loadData () {
    this.loading = true
    this.$http.post('/clientend/order/queryInvoiceList', { orderNumber: this.orderNumber }).then(data => {
      this.dataSource = data || []
    }).finally(() => {
      this.loading = false
    })
  }
}
</script>

<style lang="scss" module>
.table {
  max-height: calc(70vh - 60px - 80px);
  overflow: auto;
}
</style>
