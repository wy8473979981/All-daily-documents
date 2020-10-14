<template>
<div>
<breadcrumb/>
<query-form :def="formDefs" @query="onQuery" ref="qf"></query-form>
<query-table :columns="columns" ref="tb" title="融资订单列表" api="/clientend/order/buyer/queryOrderList" row-key="id" class="mt-4">
  <template slot="extra">
    <el-button type="primary" size="small" plain @click="onExport">Excel导出</el-button>
  </template>
  <template v-slot:opt="{row}">
    <el-button type="text" size="small" @click="onView(row)">详情</el-button>
    <el-button type="text" size="small" @click="onConfirm(row)" v-if="canConfirm(row)">确权</el-button>
  </template>
</query-table>

</div>
</template>

<script lang="ts">

import { Vue, Component, Ref } from 'vue-property-decorator'
import { formDefs, columns } from './config'
import { download } from '@/utils/file'
import { affirm } from '@/utils/promp'
import { format } from '@/utils/date'

@Component
export default class PostConfirmation extends Vue {
  @Ref() tb!: any

  @Ref() qf!: any

  formDefs = formDefs

  columns = columns

  params: Record<string, any> = {}

  canConfirm (row: any) {
    return String(row.status) === '2'
  }

  onExport () {
    const stamp = format(new Date(), 'yyyyMMdd')
    download('/clientend/order/exportOrderData', `${stamp}.xlsx`, this.params, 'post')
  }

  onView (row: any) {
    this.$router.push(`/finance/order/detail/${row.orderNumber}`)
  }

  onConfirm (row: any) {
    this.$router.push(`/confirmation/post/affirm/${row.orderNumber}`)
  }

  onQuery (params: any = {}) {
    this.params = params
    this.tb.query(params)
  }

  onRefresh () {
    this.tb.refresh()
  }

  mounted () {
    this.qf.onQuery()
  }
}
</script>
