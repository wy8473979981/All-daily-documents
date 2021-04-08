<template>
   <div>
     <breadcrumb/>
      <query-form :def="formDefs" @query="onQuery" title="融资记录"></query-form>
      <query-table :columns="columns" ref="tb" title="放款记录列表" :postQuery="postQuery" api="/clientend/loan/getClientLoanRecordPage" class="mt-4">
           <template v-slot:extra="{ checkedRows }">
            <el-button type="primary" size="small" @click="toLinkUpload(checkedRows)" :disabled="result.length==0" plain>Excel导出</el-button>
          </template>
            <template v-slot:opt="{row}">
              <el-button type="primary" size="mini" @click="onLink(row)">详 情</el-button>
            </template>
        </query-table>
   </div>
</template>

<script lang="ts">

import { Vue, Component, Ref } from 'vue-property-decorator'
import { formDefs, columns } from './config'
import { changeTime } from '@/utils/changeTime'
@Component({})
export default class Invoice extends Vue {
  formDefs = formDefs
  columns = columns
  currentId=''
  result=[]
  @Ref() tb!: any
  onQuery (params: any = {}) {
    this.tb.query(changeTime(params))
  }

  postQuery(x: any) {
    this.result = x.items
  }

  onLink (row: any) {
    this.$router.push(`/loan/loan/detail/${row.id}`)
  }

  toLinkUpload () {
    this.$router.push('/certificate/invoice/upload')
  }

  mounted () {
    this.onQuery()
  }
}
</script>

<style lang="scss" module>

</style>
