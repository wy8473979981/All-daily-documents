/*
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description:欠费明细
*/
<template>
  <div>
    <ysn-dialog
      :title="'详情'"
      :width="'920px'"
      :top="'120px'"
      :is-show-dialog="isShowDialog"
      :external="isShowDialog"
      :is-determine="false"
      :is-cancel="false"
      :out-close="outClose"
      @closeDialog="closeDialog"
    >
      <template #contain>
        <ysn-flod :title="'基本信息'" :show-flod="false" />
        <el-form :model="infoData" label-position="top" size="small">
          <!-- 信息模块-->
          <ysn-formItem :form="infoData" :config="configDataOne" :column="4" clearable text />
        </el-form>
        <ysn-flod :title="'费用信息'" :show-flod="false" />
        <el-form :model="infoData" label-position="top" size="small">
          <!-- 信息模块-->
          <ysn-formItem :form="infoData" :config="configDataTwo" :column="4" clearable text />
        </el-form>
      </template>
    </ysn-dialog>
  </div>
</template>
<script>
export default {
  name: 'DuePlatformInfo',
  components: { },
  props: {
    isShowDialog: { type: Boolean, default: false }, // 弹窗控制
    formData: {
      type: Object,
      default: () => {
        return { }
      }
    }
  },
  // 表单数据
  data() {
    return {
      // 关闭弹窗
      outClose: true,
      // 商家信息模块
      configDataOne: [
        // 详情配置
        { itemType: 'text', prop: 'contNo', label: '合同编号' },
        { itemType: 'text', prop: 'programName', label: '项目名称' },
        { itemType: 'text', prop: 'leaseArea', label: '租赁区域' },
        { itemType: 'text', prop: 'brandName', label: '品牌一' },
        { itemType: 'text', prop: 'tenantName', label: '商家/企业' },
        { itemType: 'text', prop: 'receivableSource', label: '应收来源' },
        { itemType: 'text', prop: 'receivableNo', label: '应收编号' },
        { itemType: 'text', prop: 'invoiceState', label: '发票状态' },
        { itemType: 'text', prop: 'verificationStatusId', label: '核销状态' },
        { itemType: 'text', prop: 'reductionStatus', label: '减免状态' },
        { itemType: 'text', prop: 'isPrintBill', label: '是否生成账单' },
        { itemType: 'text', prop: 'brandFormatName', label: '签约业态' }
      ],
      configDataTwo: [
        // 详情配置
        { itemType: 'text', prop: 'feeName', label: '费项' },
        { itemType: 'text', prop: 'receivableAmount', label: '应收金额(元)', type: 'money' },
        { itemType: 'text', prop: 'tax', label: '税率(%)', type: 'money' },
        { itemType: 'text', prop: 'taxAccount', label: '税额(元)', type: 'money' },
        { itemType: 'text', prop: 'receivedAmount', label: '已核销金额(元)', type: 'money' },
        { itemType: 'text', prop: 'oweAmount', label: '欠款(元)', type: 'money' },
        { itemType: 'text', prop: 'overdueDays', label: '过期天数' },
        { itemType: 'text', prop: 'receivableTime', label: '应收日期' },
        { itemType: 'text', prop: 'paymentStartDate', label: '账单开始' },
        { itemType: 'text', prop: 'paymentEndDate', label: '账单结束' },
        { itemType: 'text', prop: 'financialDate', label: '权责月' },
        { itemType: 'text', prop: 'businessDate', label: '业务月' },
        { itemType: 'text', prop: 'lateFee', label: '滞纳金' }
      ]
    }
  },
  computed: {
    // 详情数据
    infoData() {
      return this.formData
    }
  },
  methods: {
    // 关闭弹窗
    closeDialog() {
      this.$emit('closeDialog')
    }
  }
}
</script>
