<template>
  <div>
    <query-form :def="formDefs" @query="onQuery" :mappingOptions="{dateType: 'F'}">
      <template v-slot:amount="{proxy, options}">
        <el-input-number v-model="proxy.value" :max="options.max" style="width: 100%;"></el-input-number>
      </template>
    </query-form>
    <glp-card class="mt-4">
      <template slot="title">
        <span>放款记录</span>
        <span class="money-title">
          放款总金额：
          <span
            class="money-amount"
          >{{backendLoanRecordTotal.totalRealityLoanAmount|number('￥')}}</span>
        </span>
      </template>
      <template v-slot:extra="{ checkedRows }">
        <el-button
          type="primary"
          size="small"
          @click="onExport(checkedRows)"
          plain
          :loading="exportLoading"
        >导出</el-button>
      </template>
      <query-table
        checkable
        :columns="columns"
        :wrap="false"
        ref="tb"
        api="/backend/loan/getBackendLoanRecordPage"
      >
        <template v-slot:orderPaySerialNo="{row}">
          <el-link type="primary" @click="onView(row)">{{row.orderPaySerialNo}}</el-link>
        </template>
      </query-table>
    </glp-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import { formDefs, columns } from './config'
import { getBackendLoanRecordTotal, batchExportLoan } from '@/api/loan'
import { resp } from '@/utils/file'
import { format } from '@/utils/date'
@Component
export default class Loan extends Vue {
  @Ref() tb!: any

  formDefs = formDefs

  columns = columns

  exportLoading = false

  backendLoanRecordTotal = {}

  queryParams = {}

  onQuery(params: any = {}) {
    this.queryParams = params
    this.tb.query(params)
  }

  onView(row: any) {
    this.$router.push(`/finance/loan/detail/${row.id}`)
  }

  onExport(rows: any[]) {
    const data = this.queryParams
    this.exportLoading = true
    batchExportLoan(data)
      .then((res) => {
        this.exportLoading = false
        resp(res.data, `FP${format(new Date(), 'yyyyMMddHHmmss')}.xlsx`)
      })
      .catch(() => {
        this.exportLoading = false
      })
  }

  loadBackendLoanRecordTotal() {
    getBackendLoanRecordTotal().then((res) => {
      this.backendLoanRecordTotal = res || {}
    })
  }

  mounted() {
    this.onQuery()
    this.loadBackendLoanRecordTotal()
  }
}
</script>
