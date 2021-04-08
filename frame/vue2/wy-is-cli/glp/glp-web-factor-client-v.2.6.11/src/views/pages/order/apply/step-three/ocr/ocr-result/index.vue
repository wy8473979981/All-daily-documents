<template>
  <div>
    <span class="ocr dib">OCR结果</span>
    <span class="fc-tip dib">若有误，请修改，每修改完一张点击“保存”</span>
    <el-button type="primary" size="mini" @click="onSave">保存</el-button>
    <el-form
      :label-position="labelPosition"
      size="small"
      class="mt-3"
      label-width="120px"
      :model="formLabelAlign"
    >
      <el-form-item label="卖方名称">
        <el-input v-model="formLabelAlign.sellerCompName"></el-input>
      </el-form-item>
      <el-form-item label="买方名称">
        <el-input v-model="formLabelAlign.buyerCompName"></el-input>
      </el-form-item>
      <el-form-item label="发票代码">
        <el-input v-model="formLabelAlign.invoiceCode"></el-input>
      </el-form-item>
      <el-form-item label="发票号码">
        <el-input v-model="formLabelAlign.invoiceNo"></el-input>
      </el-form-item>
      <el-form-item label="开票日期">
        <el-date-picker class="w298" v-model="formLabelAlign.invoicingTime"></el-date-picker>
      </el-form-item>
      <el-form-item label="发票不含税金额">
        <el-input v-model="formLabelAlign.invoiceTaxExclusiveMoney">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="发票税额">
        <el-input v-model="formLabelAlign.invoiceTaxMoney">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="价税合计">
        <el-input v-model="formLabelAlign.invoiceMoney"></el-input>
      </el-form-item>
      <el-form-item label="普票验证码">
        <el-input v-model="formLabelAlign.invoiceCheckCode"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang='ts'>
import { Vue, Component, Ref, Prop, Watch } from 'vue-property-decorator'
import { saveInvoiceInfo } from '@/api/plb-invoice'
import { Getter, Mutation, namespace } from 'vuex-class'
const Plb = namespace('plb')
@Component
export default class OcrResult extends Vue {
  labelPosition = 'right'
  formLabelAlign: any = {}

  @Plb.State('invoiceItem') invoiceItem: any

  @Watch('invoiceItem')
  watchInvoiceItem(newValue: any, oldValue: any) {
    this.formLabelAlign = newValue
  }

  onSave() {
    const data = Object.assign({}, this.formLabelAlign)
    delete data.invoiceFileUrl
    delete data.recognizeFailCause
    delete data.recognizeStatus
    delete data.verifyFailCause
    delete data.verifyStatus
    saveInvoiceInfo(data).then(res => {})
  }
}
</script>
<style lang='scss' scope>
.ocr {
  width: 68px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 28px;
}
.w298 {
  width: 298px !important;
}
.fc-tip {
  width: 247px;
  font-size: 12px;
  margin-left: 4px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 400;
  margin-right: 43px;
  color: rgba(255, 144, 42, 1);
  line-height: 28px;
}
</style>
