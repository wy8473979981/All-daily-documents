<template>
<div>
  <query-form :def="formDefs" @query="onQuery"></query-form>
  <query-table title="待处理订单" :columns="columns" ref="tb" api="/backend/order/queryOrderList" class="mt-4">
    <template v-slot:opt="{row}">
      <el-button type="text" size="small" @click="onView(row)">详情</el-button>
      <el-button type="text" size="small" @click="onApply(row)" v-if="row.showTodo">处理</el-button>
    </template>
  </query-table>
</div>
</template>

<script lang="ts">

import { Vue, Component, Ref } from 'vue-property-decorator'
import { formDefs, columns } from './config'

@Component
export default class List extends Vue {
  @Ref() tb!: any

  formDefs = formDefs

  columns = columns

  onQuery (params: any = {}) {
    this.tb.query(params)
  }

  onView (row: any) {
    this.$router.push(`/finance/order/detail/${row.orderNumber}`)
  }

  onApply (row: any) {
    if (String(row.step) === '1') {
      this.$router.push(`/finance/order/pre-audit/${row.orderNumber}`)
    } else {
      this.$router.push(`/finance/order/audit/${row.orderNumber}`)
    }
  }

  mounted () {
    this.onQuery()
  }
}
</script>
