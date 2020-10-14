<template>
  <div>
    <breadcrumb />
    <query-form :def="formDefs" @query="onQuery" title="查询列表"></query-form>
    <query-table
      :columns="columns"
      :class="{'showAllSelect':!this.showAllSelect}"
      :postQuery="postQuery"
      ref="tb"
      title="发票列表"
      :checkedRows.sync="checkedRows"
      :showCheckedInfo="authStatus!==0"
      row-key="invoiceNo"
      api="/clientend/invoice/getInvoiceInfoClientPage"
      class="mt-4"
    >
      <template v-slot:extra="{ checkedRows }">
        <span style="margin-right:25px;" v-if="authStatus!==0">已选发票剩余关联总额：{{totalBalance|number}}</span>
        <el-button
          type="primary"
          size="mini"
          :disabled="checkedRows.length>0?false:true"
          @click="onRelativeOrder(checkedRows)"
          v-if="authStatus!==0"
        >关联订单</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="exportExcel()"
          :disabled="queryRows.length===0"
           plain
        >Excel导出</el-button>
      </template>
      <template v-slot:opt="{row}">
        <el-button type="text" size="mini" @click="onLink(row)" plain>详 情</el-button>
      </template>
    </query-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Watch } from 'vue-property-decorator'
import { formDefs, columns, columns1, changeTime } from './config'
import { format } from '@/utils/date'
import { download } from '@/utils/file'
@Component({})
export default class Invoice extends Vue {
  formDefs = formDefs
  excelQuery = {}
  totalBalance = 0
  invoiceNo = ''
  checkedRows: any[] = []
  queryRows: any[] = []
  authStatus: any=0
  columns: any=[]
  showAllSelect=true

  @Ref() tb!: any
  @Watch('checkedRows')
  totalBalancecalc (val: any) {
    if (val.length > 0) {
      this.totalBalance = val.map((item: any) => item.invoiceUsableMoney).reduce((pre: number, next: number) => pre + next)
    }
  }

  onQuery (params: any = {}) {
    this.checkedRows = []
    this.excelQuery = changeTime(params)
    this.tb.query(this.excelQuery)
  }

  postQuery (params: any) {
    this.queryRows = params.items
    this.showAllSelect = this.queryRows.some((item: any) => {
      return item.isValid === 1 && item.useStatus === 2
    })
  }

  exportExcel (params: any) {
    download('/clientend/invoice/exportInvoiceList', '', this.excelQuery, 'post')
  }

  onRelativeOrder (params: any) {
    // todo
    const money = params
      .map((item: any) => item.invoiceMoney)
      .reduce((pre: number, next: number) => pre + next)
    const invoiceNos = params.map((item: any) => item.id).join(',')
    this.$router.push({
      path: '/certificate/invoice/relative',
      query: { money, invoiceNos }
    })
  }

  onLink (row: any) {
    this.$router.push(`/certificate/invoice/detail/${row.invoiceNo}`)
  }

  created () {
    this.authStatus = this.$auth?.principle?.user.realnameStatus
    this.columns = this.authStatus !== 0 ? columns : columns1
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
