<template>
  <div>
    <query-form :def="formDefs" @query="onQuery" ref="searchForm" :mappingOptions="{dateType: 'F'}"></query-form>
    <glp-card>
      <template slot="title">
        <span class="mr-4">开票列表</span>
        <span class="mr-4 money-title">
          累计已开票金额(元):
          <span class="money-amount">{{summary.totalInvoicedSum | number('￥')}}</span>
        </span>
        <span class="mr-4 money-title">
          累计可开票金额(元):
          <span class="money-amount">{{summary.totalCanInvoicingSum | number('￥')}}</span>
        </span>
        <span class="mr-4 money-title">
          累计开票中金额(元):
          <span class="money-amount">{{summary.totalInvoicingSum | number('￥')}}</span>
        </span>
      </template>
      <template slot="extra">
        <el-button type="primary" size="small" plain @click="onBatchDownload">批量下载</el-button>
      </template>
      <query-table
        :columns="columns"
        ref="tb"
        :wrap="false"
        api="/backend/invoicing/getInvoiceListPage"
        class="mt-4"
      >
        <template v-slot:relateForwardInvoiceNo="{row}">
          <el-button
            type="text"
            @click="()=>onDownload(row.relateForwardInvoiceNo,row)"
          >{{row.relateForwardInvoiceNo || '-'}}</el-button>
        </template>
        <template v-slot:reverseInvoiceNo="{row}">
          <el-button
            type="text"
            @click="()=>onDownload(row.reverseInvoiceNo,row)"
          >{{row.reverseInvoiceNo || '-'}}</el-button>
        </template>
        <template v-slot:companyInvoiceTitle="{row}">
          <el-tooltip
            class="item"
            effect="dark"
            :content="row.companyTaxNumber"
            placement="top-start"
          >
            <span>{{row.companyInvoiceTitle || '-'}}</span>
          </el-tooltip>
        </template>
        <template v-slot:opt="{row}">
          <el-button v-if="row.reverseTag === 1" type="text" @click="()=>onReverse(row)">红冲</el-button>
          <el-button type="text" v-if="row.newForwardTag === 1" @click="()=>onNewInvoice(row)">开新正票</el-button>
          <el-button type="text" @click="()=>onDownload(row.invoiceNumber,row)">下载发票</el-button>
        </template>
      </query-table>
    </glp-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import { formDefs, columns, getMessageHtml, getMessageNewHtml } from './config'
import {
  getInvoiceSum,
  redDashedInvoice,
  afreshInvoice,
  downloadInvoice,
  batchExportInvoice,
  queryInvoiceBySettlement
} from '@/api/invoce'
import { download, resp } from '@/utils/file'
import { format } from '@/utils/date'
@Component
export default class Index extends Vue {
  $style!: any

  @Ref() tb!: any

  @Ref() searchForm!: any

  formDefs = formDefs

  columns = columns

  params: any = {}

  summary = {}

  onQuery(params: any = {}) {
    getInvoiceSum({}).then((res) => {
      this.summary = res
    })
    this.params = params
    this.tb.query(params)
  }

  onReverse(row: any) {
    const isExceedTag = row.isExceedTag
    const data = {
      invoiceNumber: row.invoiceNumber
    }

    if (isExceedTag === 1) {
      queryInvoiceBySettlement({
        settlementNo: row.settlementNos
      }).then((res) => {
        this.$confirm(getMessageHtml(res), '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString: true
        })
          .then(() => {
            redDashedInvoice(data).then((res) => {
              this.onQuery(this.params)
            })
          })
          .catch(() => {})
      })
    } else {
      this.$confirm('确认开具红冲发票?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          redDashedInvoice(data).then((res) => {
            this.onQuery(this.params)
          })
        })
        .catch(() => {})
    }
  }

  onNewInvoice(row: any) {
    const isExceedTag = row.isExceedTag
    const data = {
      invoiceNumber: row.invoiceNumber
    }
    if (isExceedTag === 1) {
      queryInvoiceBySettlement({
        settlementNo: row.settlementNos
      }).then((res) => {
        this.$confirm(getMessageNewHtml(res), '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString: true
        })
          .then(() => {
            afreshInvoice(data).then((res) => {
              this.onQuery(this.params)
            })
          })
          .catch(() => {})
      })
    } else {
      this.$confirm('确认开具新的正票?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          afreshInvoice(data).then((res) => {
            this.onQuery(this.params)
          })
        })
        .catch(() => {})
    }
  }

  onDownload(invoiceNumber: any, row: any) {
    const isExceedTag = row.isExceedTag
    const data = { invoiceNumber }
    if (!invoiceNumber) {
      return
    }
    downloadInvoice(data).then((res) => {
      download(res, `${invoiceNumber}.pdf`)
    })
  }

  onBatchDownload() {
    const form = this.searchForm.form
    const data = {
      beginTime: form.Time ? form.Time[0] : undefined,
      endTime: form.Time ? form.Time[1] : undefined,
      invoiceNumber: form.invoiceNumber,
      invoiceTitle: form.invoiceTitle,
      invoiceType: form.invoiceType,
      page: 1,
      settlementNo: form.settlementNo,
      size: 1000000000,
      source: form.source
    }
    batchExportInvoice(data).then((res) => {
      resp(res.data, res.headers['content-disposition'].split('=')[1])
    })
  }

  mounted() {
    this.onQuery()
  }
}
</script>

<style lang="scss" module></style>
