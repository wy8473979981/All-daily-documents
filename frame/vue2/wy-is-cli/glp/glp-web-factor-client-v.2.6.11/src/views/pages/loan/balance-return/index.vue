<template>
   <div>
     <breadcrumb/>
      <query-form :def="formDefs" @query="onQuery" title="融资记录"></query-form>
      <query-table :columns="columns" ref="tb" title="回款列表"  :postQuery="postQuery" api="/clientend/repayment/getRepaymentWaterClientListPage" class="mt-4">
           <template v-slot:extra>
             <span style="margin-right:50px;">未核销余额金额汇总(元)：{{balanceAmount|number}}</span>
            <el-button type="primary" size="small" @click="exportExcel" :disabled="result.length==0" plain>Excel导出</el-button>
          </template>
        </query-table>
   </div>
</template>

<script lang="ts">

import { Vue, Component, Ref } from 'vue-property-decorator'
import { formDefs, columns } from './config'
import { changeTime } from '@/utils/changeTime'
import { format } from '@/utils/date'
import { download } from '@/utils/file'
@Component({})
export default class Invoice extends Vue {
  formDefs = formDefs
  columns = columns
  queryData={}
  balanceAmount=0
  result=[]
  @Ref() tb!: any
  onQuery (params: any = {}) {
    this.queryData = changeTime(params)
    this.tb.query(this.queryData)
    this.getClientSumBalance(this.queryData)
  }

  postQuery(x: any) {
    this.result = x.items
  }

  onLink (row: any) {
    this.$router.push(`/loan/finance/detail/${row.id}`)
  }

  exportExcel () {
    download('/clientend/repayment/exportClientRepaymentWater', '', this.queryData, 'post')
  }

  getClientSumBalance (params: any) {
    this.$http.post<any>(
      '/clientend/repayment/getClientSumBalance',
      params
    ).then(data => {
      this.balanceAmount = data.sumBalance
    })
  }

  mounted () {
    this.onQuery()
  }
}
</script>

<style lang="scss" module>

</style>
