<template>
   <div>
     <breadcrumb/>
      <query-form :def="formDefs" @query="onQuery" title="融资记录"></query-form>
      <query-table :columns="columns" ref="tb" title="还款列表" :postQuery="postQuery"  api="/clientend/clearing/listPage" class="mt-4">
           <template v-slot:extra="{ checkedRows }">
              <el-button type="primary" size="small" @click="exportExcel(checkedRows)" :disabled="result.length==0" plain>Excel导出</el-button>
          </template>
           <template v-slot:settlementNo="{row}">
              <a :href="`/loan/settlement/detail/${row.settlementNo}`" :class="[$style.onLink]">{{row.settlementNo}}</a>
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
  @Ref() tb!: any
  formDefs = formDefs
  columns = columns
  queryData={}
  result=[]
  onQuery (params: any = {}) {
    this.queryData = changeTime(params)
    this.tb.query(this.queryData)
  }

  postQuery(x: any) {
    this.result = x.items
  }

  onLink (row: any) {
    this.$router.push(`/loan/finance/detail/${row.id}`)
  }

  exportExcel () {
    download('/clientend/clearing/exportExcel', '', this.queryData, 'post')
  }

  mounted () {
    this.onQuery()
  }
}
</script>

<style lang="scss" module>
.onLink{
  color:#61cd9b;
  text-decoration:none;
}
</style>
