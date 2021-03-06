<template>
  <div>
      <breadcrumb/>
      <div :class="[$style.ticketWrapper]">
          <div>累计已开票金额(元)：{{totalInvoicedSum|number}}</div>
      </div>
      <query-form :def="formDefs" @query="onQuery"></query-form>
      <query-table :columns="columns" ref="tb" title="发票管理列表" :checkedRows.sync="checkedRows" row-key="invoiceNo" api="/clientend/invoicing/getInvoiceListPage" class="mt-4">
          <template v-slot:extra="{ checkedRows }">
            <el-button type="primary" size="small" @click="batchDownload(checkedRows)"
            :disabled="checkedRows.length < 1" plain>批量下载</el-button>
          </template>
          <template v-slot:reverseInvoiceNo="{row}" >
              <span v-if="row.reverseInvoiceNo" :class="[$style.link]" @click="loadInvoice(row.reverseInvoiceNo)">{{row.reverseInvoiceNo}}</span>
              <span v-else>-</span>
         </template>
         <template v-slot:relateForwardInvoiceNo="{row}" >
              <span v-if="row.relateForwardInvoiceNo" :class="[$style.link]" @click="loadInvoice(row.relateForwardInvoiceNo)">{{row.relateForwardInvoiceNo}}</span>
              <span v-else>-</span>
         </template>
          <template v-slot:opt="{row}" >
            <el-button type="text" size="small" @click="loadInvoice(row.invoiceNumber)">下载发票</el-button>
         </template>
      </query-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop, Watch } from 'vue-property-decorator'
import { formDefs, columns } from './config'
import { changeTime } from '@/utils/changeTime'
import { format } from '@/utils/date'
import { download } from '@/utils/file'
@Component({})
export default class Apply extends Vue {
   formDefs = formDefs
   columns = columns
   totalInvoicedSum=0
   checkedRows: any[] = []
   @Ref() tb!: any
   onQuery (params: any = {}) {
     this.checkedRows = []
     const data = changeTime(params)
     this.getInvoiceSum({ beginTime: data.beginTime, endTime: data.endTime, settlementNo: data.settlementNo })
     this.tb.query(changeTime(params))
   }

   loadInvoice (id: any) {
     this.$http.post<any>(
       '/clientend/invoicing/downloadInvoice',
       { invoiceNumber: id }
     ).then((data: any) => {
       const result = data.split('?')[0]
       const arr = result.split('/')
       const pdfName = arr.pop()
       const downLoadUrl = data.replace(/http:/, 'https:')
       download(downLoadUrl, pdfName)
     })
   }

   batchDownload (rows: any) {
     this.$confirm(`批量下载${rows.length}笔`, '提示', {
       confirmButtonText: '确定',
       cancelButtonText: '取消',
       type: 'warning'
     }).then(() => {
       const invoiceNos = rows.map((item: any) => {
         return item.invoiceNo
       })
       download('/clientend/invoicing/batchDownload', '', invoiceNos, 'post')
       this.checkedRows = []
     })
   }

   getInvoiceSum (params: any) {
     const { invoiceStatus, ...rest } = params
     this.$http.post<any>(
       '/clientend/invoicing/getInvoiceSum',
       { ...rest }
     ).then(res => {
       this.totalInvoicedSum = res.totalInvoicedSum
     })
   }

   mounted () {
     this.onQuery()
   }
}
</script>

<style lang="scss" module>
@import "~@/styles/vars.scss";
.link {
  color: #67c23a;
  cursor: pointer;
  text-decoration: none;
}
.ticketWrapper{
   padding:30px 15px;
   background:#fff;
   margin-bottom:15px;
   display: flex;
   justify-content: space-between;
}
</style>
