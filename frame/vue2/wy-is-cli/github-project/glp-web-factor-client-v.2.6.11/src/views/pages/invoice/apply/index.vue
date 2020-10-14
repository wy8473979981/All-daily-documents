<template>
  <div>
     <breadcrumb/>
     <glp-section title="开票信息" class="mt-4">
       <el-row style="margin-left:10px; margin-top:10px;">
          <el-col :span="8">发票抬头：{{companyInvoiceTitle}}</el-col>
          <el-col :span="8">税号：{{companyTaxNumber}}</el-col>
      </el-row>
     </glp-section>
     <glp-section title="开票申请" class="mt-4">
         <el-row style="margin-left:10px;margin-top:10px;">
          <el-col :span="8">累计可开票金额(元)：{{totalCanInvoicingSum|number}}</el-col>
          <el-col :span="8">累计开票中金额(元)：{{totalInvoicingSum|number}}</el-col>
         </el-row>
     </glp-section>
      <query-form :def="formDefs" @query="onQuery"></query-form>
      <query-table :columns="columns" :class="{'showAllSelect':!this.showAllSelect}" ref="tb" :checkedRows.sync="checkedRows" :postQuery="postQuery" row-key="settlementNo" title="可开票申请列表" api="clientend/invoicing/getApplyListPage" class="mt-4">
          <template v-slot:extra="{ checkedRows }">
            <span style="color:#3AC082;margin-right:30px;">注：单张发票可开8行类目，单张上限金额10万元</span>
            <el-button type="primary" size="mini" @click="batchApply(checkedRows)" :disabled="checkedRows.length < 1" plain>批量申请</el-button>
          </template>
          <template v-slot:opt="{row}" >
            <el-button type="text" size="mini" @click="applyInvoice(row)" :disabled="row.isApply?false:true">申请开票</el-button>
         </template>
      </query-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop, Watch } from 'vue-property-decorator'
import { formDefs, columns } from './config'
import { changeTime } from '@/utils/changeTime'
import { filter } from '@/filters'
@Component
export default class Apply extends Vue {
   formDefs = formDefs
   columns = columns
   checkedRows: any[] = []
   companyInvoiceTitle=''
   companyTaxNumber=''
   totalCanInvoicingSum=0
   totalInvoicingSum=0
   showAllSelect=true
   queryData={}
   @Ref() tb!: any
   onQuery (params: any = {}) {
     this.checkedRows = []
     this.queryData = changeTime(params)
     this.getApplySumData(this.queryData)
     this.tb.query(this.queryData)
   }

   selectAll () {
     this.tb.clearSelection()
   }

   postQuery (params: any) {
     this.showAllSelect = params.items.some((item: any) => {
       return item.isApply === 1
     })
   }

   openInvoice (settlementNos: string) {
     this.$http.post<any>(
       'clientend/invoicing/applyInvoices',
       {
         settlementNos
       }
     ).then(data => {
       this.$message({
         type: 'success',
         message: '开票成功'
       })
       this.getApplySumData(this.queryData)
       this.tb.refresh()
       this.checkedRows = []
     })
   }

   batchApply (rows: any) {
     const total = rows.map((row: any) => row.canInvoicingSum).reduce((pre: any, next: any) => {
       return pre + next
     }, 0)
     const totalMoney = filter('number', total)
     this.$confirm(`批量申请：${rows.length}笔，累计开票金额${totalMoney}（元）`, '提示', {
       confirmButtonText: '确定',
       cancelButtonText: '取消',
       type: 'warning'
     }).then(() => {
       const settlementNos = rows.map(function (item: any) {
         return item.settlementNo
       }).join(',')
       this.openInvoice(settlementNos)
     })
   }

   applyInvoice (row: any) {
     this.$confirm('您确定申请开票', '提示', {
       confirmButtonText: '确定',
       cancelButtonText: '取消',
       type: 'warning'
     }).then(() => {
       return this.openInvoice(row.settlementNo)
     })
   }

   getApplySumData (params: any) {
     const { invoiceStatus, ...rest } = params
     this.$http.post<any>(
       '/clientend/invoicing/getApplySumData',
       { ...rest }
     ).then(res => {
       this.totalCanInvoicingSum = res.totalCanInvoicingSum
       this.totalInvoicingSum = res.totalInvoicingSum
       this.companyInvoiceTitle = res.companyInvoiceTitle
       this.companyTaxNumber = res.companyTaxNumber
     })
   }

   mounted () {
     this.onQuery()
   }
}
</script>

<style lang="scss">
.showAllSelect{
  th{
    .el-checkbox{
      .el-checkbox__input{
        .el-checkbox__inner{
              background-color: #edf2fc;
              border-color: #DCDFE6;
              cursor: not-allowed;
        }
        .el-checkbox__original{display: none;}
      }
    }
  }
}

</style>
