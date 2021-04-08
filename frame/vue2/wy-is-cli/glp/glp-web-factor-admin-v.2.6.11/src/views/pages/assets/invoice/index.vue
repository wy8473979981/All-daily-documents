<template>
<div>
  <query-form :def="formDefs" @query="onQuery"></query-form>
  <query-table checkable :columns="columns" :checkedRows.sync="checkedRows" row-key="id" ref="tb" api="/backend/invoice/getInvoiceInfoBackPage" class="mt-4">
    <template v-slot:extra="{ checkedRows }">
      <el-button type="primary" size="small" @click="onInvalid(checkedRows)" :disabled="checkedRows.length < 1" plain>作废</el-button>
    </template>
    <template v-slot:opt="{row}">
      <el-button type="text" @click="onView(row)">详情</el-button>
    </template>
  </query-table>

  <el-dialog title="发票作废" :visible.sync="invalid" width="600px" class="invoicezf">
      <div :class="[$style.title]">
        <div :class="[$style.tip]">您是否确定共作废{{checkedRows.length}}笔发票，发票号码如下：</div>
        <div :class="[$style.nos]">{{checkedRows.map(item=>item.invoiceNo).join(',')}}</div>
      </div>
      <div :class="[$style.desc]">
        <div :class="[$style.label]"><span style='color:red'>*</span>作废原因</div>
        <div :class="[$style.textarea]">
          <el-input type="textarea" :rows="2" v-model.trim="cancelCause" placeholder="请输入作废原因"/>
        </div>
      </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="invalid=false" size="small">取 消</el-button>
      <el-button type="primary" @click="onConfirm" size="small" :disabled="!cancelCause">确 定</el-button>
    </span>
  </el-dialog>

</div>
</template>

<script lang="ts">

import { Vue, Component, Ref } from 'vue-property-decorator'
import { formDefs, columns, changeTime } from './config'
import { format } from '@/utils/date'
@Component({})
export default class Invoice extends Vue {
  formDefs = formDefs
  checkedRows: any[] = []
  columns=columns
  invalid: any=false
  cancelCause=''
  @Ref() tb!: any
  onQuery (params: any = {}) {
    this.tb.query(changeTime(params))
  }

  onView (row: any) {
    this.$router.push(`/assets/invoice/detail/${row.invoiceNo}`)
  }

  onInvalid() {
    this.cancelCause = ''
    this.invalid = true
  }

  onConfirm() {
    const cancelCause = this.cancelCause
    const invoiceNo = this.checkedRows.map(item => item.invoiceNo)
    this.$http.post<any>(
      '/backend/invoice/cancelInvoiceInfo',
      {
        cancelCause,
        invoiceNo
      }
    ).then(data => {
      this.invalid = false
      this.checkedRows = []
      this.tb.refresh()
    })
  }

  mounted () {
    this.onQuery()
  }
}
</script>
<style lang="scss" module>
  .title{
    padding-left:75px;
    .tip{
       padding-bottom:10px;
    }
  }
  .desc {
    display: flex;
    margin-top: 10px;
    margin-bottom: 30px;
    .label {
      width:75px;
      line-height: 50px;
      font-size: 14px;
      white-space: nowrap;
    }
    .textarea {
      flex: 1;
    }
  }
</style>
<style lang="scss">
.invoicezf{
  .el-dialog__body{
      padding-top:10px;
      padding-bottom:0px;
    }
}
</style>
