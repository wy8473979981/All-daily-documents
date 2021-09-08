<!--
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description:详情页
-->

<template>
  <div class="app-page-main">
    <ysn-pageAccorDetail
      ref="pageDetail"
      v-model="formData"
      :config="pageConfig"
      :has-menu="hasMenu"
      :update="update"
      @comChange="comChange"
    >
      <template #topLeft>
        <span class="title">状态：</span>
        {{ title }}
        <span v-if="showId" class="invoice-id">{{ $route.query.invoiceId }}</span>
      </template>
      <!-- 操作按钮 -->
      <template #btn>
        <ysn-btn v-if="upload" class="mr-8" @click="uploadInvoice">上传发票</ysn-btn>
        <ysn-btn v-if="invalid" class="mr-8" type="danger" @click="invalidInvoice">作废</ysn-btn>
        <ysn-btn v-if="redDash" class="mr-8" type="danger" @click="redDashInvioce">红冲</ysn-btn>
      </template>
    </ysn-pageAccorDetail>
  </div>
</template>

<script>
import PUBFN from '@/utils/pubFn'
import { getOptionsLabel } from '@/filters/index'
import { pageConfig, getInvoiceOfListDetail } from './config'
export default {
  name: 'InvoiceListDetail',
  data() {
    return {
      update: 0, // 更新视图用
      hasMenu: false, // 是否显示左侧菜单
      //   左侧按钮导航配置
      pageConfig: pageConfig.call(this),
      formData: {
        detailInfo: { // 详情数据
          id: '',
          fuzzyEnquiry: true,
          invoiceNumber: '', // 发票编号
          invoiceDate: '', // 开票日期
          invoiceType: '', // 发票类型
          makeInvoiceAmount: 0, // 开票金额
          programName: '', // 项目
          status: '', // 状态
          tenantName: '', // 商家
          taxAccount: 0, // 税额
          billMonth: '', // 账单月份
          brandName: '', // 品牌
          receivableNo: '', // 应收编号
          contNo: '', // 合同编号
          feeName: '', // 费项
          receivableTime: '', // 应收日期
          receivableAmount: '', // 应收金额
          receivedAmount: '', // 已核销金额
          makeInvoiceAmountOne: '', // 已开票金额
          makeInvoiceAmountTwo: '', // 可开票金额
          remark: '', // 备注
          limit: '', // 限额
          makeInvoiceAmountThr: '', // 申请开票金额
          untaxAccount: '', // 不含税金额
          buyer: '', // 购买方
          seller: '', // 销售方
          amount: '' // 价税合计
        },
        invoiceId: ''
      },
      upload: true, // 上传按钮显示
      invalid: true, // 作废按钮显示
      redDash: false, // 红冲按钮显示
      showId: false,
      title: ''
    }
  },
  created() {
    switch (Number(this.$route.query.status)) {
      case 1: // 待上传
      case 2:
        // 上传失败
        this.upload = true
        this.invalid = true
        this.redDash = false
        this.showId = false
        break
      case 3:
        // 已上传当月
        this.upload = false
        this.invalid = true
        this.redDash = false
        this.showId = true
        break
      case 4:
        // 已上传跨月
        this.upload = false
        this.invalid = false
        this.redDash = true
        this.showId = true
        break
      case 5:
        // 已红冲
        this.upload = false
        this.invalid = false
        this.redDash = false
        this.showId = true
        break
      case 6:
        // 已作废
        this.upload = false
        this.invalid = false
        this.redDash = false
        this.showId = true
        break
    }
    if (this.$route.query.id) {
      const datas = {
        id: this.$route.query.id,
        status: this.$route.query.status
      }
      this.title = getOptionsLabel(Number(this.$route.query.status), PUBFN.getOptionsList('invoiceStatusTypes'))
      this.editOrAddStatus = false// 编辑页面状态
      this.invoiceOfListDetail(datas) // 详情数据接口
    }
  },
  methods: {
    /**
    * @method invoiceOfListDetail
    * @returns  null
    * @desc 详情数据接口
    */
    async invoiceOfListDetail(datas) {
      const res = await getInvoiceOfListDetail(datas)
      this.formData.detailInfo = res
      this.formData.invoiceId = res.id
      this.update++
    },
    /**
     * @method invalidInvoice
     * @returns  null
     * @desc 作废发票事件
     */
    invalidInvoice() {
      this.$message.success('发票作废成功')
      this.$router.push({ name: 'InvoiceList' })
    },
    /**
     * @method redDashInvioce
     * @returns  null
     * @desc 红冲发票事件
     */
    redDashInvioce() {
      this.$message.success('发票红冲成功')
      this.$router.push({ name: 'InvoiceList' })
    },
    /**
     * @method uploadInvoice
     * @returns  null
     * @desc 上传发票事件
     */
    uploadInvoice() {
      this.$message.success('发票上传成功')
      this.$router.push({ name: 'InvoiceList' })
    },
    comChange(val) {
      const that = this
      that.formData = JSON.parse(JSON.stringify(val))
      that.formData.detailInfo = { ...val }
      that.update++
    }
  }
}
</script>
<style lang="scss" scoped>
.title{
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: #848382;
}
.invoice-id {
  font-size: 14px;
  font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
  font-weight: bold;
  color: #1C4C7F;
}
</style>
