<template>
<div>
<breadcrumb/>
<query-form :def="formDefs" @query="onQuery"></query-form>
<query-table :columns="columns" ref="tb" title="融资申请列表" api="/clientend/order/queryOrderList" row-key="id" class="mt-4">
  <template slot="extra">
    <el-button type="primary" size="small" plain @click="onExport">Excel导出</el-button>
  </template>
  <template v-slot:opt="{row}">
    <el-button type="text" size="small" @click="onView(row)">详情</el-button>
    <el-button type="text" size="small" @click="onClose(row)" v-if="canClose(row)">关闭</el-button>
    <el-button type="text" size="small" @click="onReapply(row)" v-if="canReapply(row)">重新发起</el-button>
    <el-button type="text" size="small" @click="onViewInvoice(row)" v-if="row.invoiceStatus == 1">查看发票</el-button>
  </template>
</query-table>

<invoice-list ref="il"></invoice-list>
</div>
</template>

<script lang="ts">

import { Vue, Component, Ref } from 'vue-property-decorator'
import InvoiceList from './components/invoice-list/index.vue'
import { formDefs, columns } from './config'
import { download } from '@/utils/file'
import { affirm } from '@/utils/promp'
import { format } from '@/utils/date'

@Component({
  components: { InvoiceList }
})
export default class Order extends Vue {
  @Ref() tb!: any

  @Ref() il!: InvoiceList

  formDefs = formDefs

  columns = columns

  params: Record<string, any> = {}

  canReapply (row: any) {
    return String(row.status) === '9'
  }

  canClose (row: any) {
    return String(row.status) === '9'
  }

  onExport () {
    const stamp = format(new Date(), 'yyyyMMdd')
    download('/clientend/order/exportOrderData', `${stamp}.xlsx`, this.params, 'post')
  }

  onView (row: any) {
    this.$router.push(`/finance/order/detail/${row.orderNumber}`)
  }

  onClose (row: any) {
    affirm(`您确定是要关闭订单号为 [${row.orderNumber}]的订单吗?`, '确认').then(() => {
      this.$message.warning('该功能正在开发中')
    })
  }

  onReapply (row: any) {
    this.$router.push(`/finance/order/edit/${row.orderNumber}`)
  }

  onViewInvoice (row: any) {
    this.il.view(row).catch(() => {
      // ignore
    })
  }

  onQuery (params: any = {}) {
    this.params = params
    this.tb.query(params)
  }

  onRefresh () {
    this.tb.refresh()
  }

  mounted () {
    this.onQuery()
  }
}
</script>
