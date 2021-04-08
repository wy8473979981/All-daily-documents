<template>
   <div>
     <breadcrumb/>
      <query-form :def="formDefs" @query="onQuery"></query-form>
      <query-table :columns="columns" ref="tb" title="发票上传信息列表"  api="/clientend/invoice/getInvoiceInfoUploadPage" class="mt-4">
          <template v-slot:extra="">
            <el-button type="primary" size="small" @click="toLinkUpload()" plain>上传发票</el-button>
          </template>
           <template v-slot:opt="{ row }">
            <el-button type="text" size="mini" @click="onView(row)">详情</el-button>
            <el-button type="text" size="mini" @click="onConfirm(row)" v-if="row.status!==0&&(row.invoiceUploadNumber!==row.recognizeFailNumber)">确认并验证</el-button>
          </template>
      </query-table>
      <pop-up ref="PopUp" :onQuery="onQuery" @onfail="onfail"></pop-up>
   </div>
</template>

<script lang="ts">

import { Vue, Component, Ref } from 'vue-property-decorator'
import { formDefs, columns, changeTime } from './config'
import PopUp from './components/popup/index.vue'
@Component({
  components: { PopUp }
})
export default class Upload extends Vue {
  formDefs = formDefs
  columns = columns
  @Ref() tb!: any
  @Ref() PopUp!: PopUp
  onQuery (params: any = {}) {
    this.tb.query(changeTime(params))
  }

  onfail(x: any) {
    this.tb.refresh()
  }

  onView (params: any) {
    this.$router.push(`/certificate/upload/detail/${params.uploadBatchId}`)
  }

  toLinkUpload (params: any) {
    this.PopUp.dialogVisible = true
  }

  onConfirm (params: any) {
    this.$router.push(`/certificate/upload/confirm/${params.uploadBatchId}`)
  }

  mounted () {
    this.onQuery()
  }
}
</script>

<style lang="scss" module>

</style>
