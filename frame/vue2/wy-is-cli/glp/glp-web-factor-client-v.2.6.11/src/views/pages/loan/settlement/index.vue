<template>
   <div>
     <breadcrumb/>
      <query-form :def="formDefs" @query="onQuery" title="结算记录"></query-form>
      <query-table :columns="columns" ref="tb"  :postQuery="postQuery"  title="结算列表" api="/clientend/settlement/listPage" class="mt-4">
           <template v-slot:extra>
            <el-button type="primary" size="small" @click="exportExcel" :disabled="result.length==0" plain>Excel导出</el-button>
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
  formDefs = formDefs
  columns = columns
  queryData={}
  result=[]
  @Ref() tb!: any
  onQuery (params: any = {}) {
    this.queryData = changeTime(params)
    this.tb.query(this.queryData)
  }

  postQuery(x: any) {
    this.result = x.items
  }

  exportExcel (x: any) {
    download('/clientend/settlement/exportExcel', '', this.queryData, 'post')
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
