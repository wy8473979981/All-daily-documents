<template>
     <div class="invoiceUploadDetail">
       <breadcrumb/>
       <query-table :columns="columns" ref="tb" :api="`/clientend/invoice/getInvoiceDetail`" title="发票上传详情" class="mt-4">
          <template v-slot:extra>
            <el-button type="primary" size="small" @click="exportExcel()" plain>Excel导出</el-button>
          </template>
          <template v-slot:opt="{ row }">
            <el-button type="text" size="mini" @click="onView(row)">查看</el-button>
          </template>
      </query-table>
      <el-dialog
        title=""
        :visible.sync="dialogTableVisible"
        width="1000px"
        >
        <div class="preview"><img class="pic" :src="currentPic" el-loading/></div>
     </el-dialog>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import { columns } from './config'
import { format } from '@/utils/date'
import { download } from '@/utils/file'
@Component
export default class Detail extends Vue {
  @Prop(String) id!: string
  @Ref() tb!: any
  columns = columns
  $style!: any
  dialogTableVisible=false
  currentPic=''
  queryData={}
  onQuery (params: any = {}) {
    this.queryData = params
    this.tb.query(this.queryData)
  }

  exportExcel () {
    const uploadBatchId = this.id
    const stamp = format(new Date(), 'yyyyMMdd')
    download('/clientend/invoice/exportUploadDetail', '', this.queryData, 'post')
  }

  onView (params: any) {
    this.dialogTableVisible = true
    this.currentPic = params.invoiceFileUrl
  }

  mounted () {
    const uploadBatchId = this.id
    this.onQuery({ uploadBatchId })
  }
}
</script>
<style>

</style>
<style lang="scss">
.invoiceUploadDetail{
  .el-dialog__body{
     padding:18px 20px 16px;
  }
  .preview{
    max-height:600px;
    text-align:center;
    overflow: auto;
  }
}
</style>
