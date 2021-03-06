<template>
   <div>
     <breadcrumb/>
      <query-form :def="formDefs" @query="onQuery" title="融资记录"></query-form>
      <query-table :columns="columns" ref="tb" title="融资记录列表" :postQuery="postQuery" api="/clientend/order/queryOrderList" class="mt-4">
           <template v-slot:extra>
            <el-button type="primary" size="small" @click="exportExcel" :disabled="result.length==0" plain>Excel导出</el-button>
          </template>
            <template v-slot:opt="{row}">
              <el-button type="text" size="mini" @click="onLink(row)">详 情</el-button>
            </template>
        </query-table>
   </div>
</template>

<script lang="ts">

import { Vue, Component, Ref } from 'vue-property-decorator'
import { formDefs, columns } from './config'
import { format } from '@/utils/date'
import { download } from '@/utils/file'
@Component({})
export default class Invoice extends Vue {
  formDefs = formDefs
  columns = columns
  currentId=''
  queryData={}
  result=[]
  @Ref() tb!: any
  onQuery (params: any = {}) {
    this.queryData = params
    this.tb.query(params)
  }

  postQuery(x: any) {
    this.result = x.items
  }

  onLink (row: any) {
    this.$router.push(`/finance/order/detail/${row.orderNumber}`)
  }

  exportExcel () {
    download('/clientend/order/exportOrderData', '', this.queryData, 'post')
  }

  mounted () {
    this.onQuery()
  }
}
</script>

<style lang="scss" module>

</style>
