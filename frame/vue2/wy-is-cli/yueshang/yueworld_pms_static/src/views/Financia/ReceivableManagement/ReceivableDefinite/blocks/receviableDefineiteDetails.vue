<!--
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description:应收明细
-->
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
        <ysn-flod :title="'账单信息'" :show-flod="false" />
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
  name: 'ReceviableDefineiteDetails',
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
      outClose: true,
      // 商家信息模块
      configDataOne: [
        // 详情配置
        {
          itemType: 'text',
          prop: 'contNo',
          label: '合同编号'

        },
        {
          itemType: 'text',
          prop: 'programName',
          label: '项目名称'
        },
        {
          itemType: 'text',
          prop: 'receivableNo',
          label: '应收编号'
        },
        {
          itemType: 'text',
          prop: 'brandName',
          label: '品牌名'
        },
        {
          itemType: 'text',
          prop: 'tenantName',
          label: '商家/企业'
        },
        {
          itemType: 'text',
          prop: 'leaseArea',
          label: '租赁区域'
        }
      ],
      configDataTwo: [
        // 详情配置
        {
          itemType: 'text',
          prop: 'receivableAmount',
          label: '应收金额(元)',

          type: 'money'
        },
        {
          itemType: 'text',
          prop: 'subAmount',
          label: '减免金额(元)',
          type: 'money'
        },
        {
          itemType: 'text',
          prop: 'actualReceivableAmount',
          label: '实际应收金额(元)',
          type: 'money'
        },
        {
          itemType: 'text',
          prop: 'isBeforVer',
          label: '是否提前核销'
        },
        {
          itemType: 'text',
          prop: 'beforeVerAmount',
          label: '提前核销金额(元)',
          type: 'money'
        },
        {
          itemType: 'text',
          prop: 'receivedAmount',
          label: '已核销金额(元)',
          type: 'money'
        },
        {
          itemType: 'text',
          prop: 'receivedAmount',
          label: '未核销金额(元)',
          type: 'money'
        },
        {
          itemType: 'text',
          prop: 'feeName',
          label: '费项'
        },
        {
          itemType: 'text',
          prop: 'tax',
          label: '税率(%)',
          type: 'money'
        },
        {
          itemType: 'text',
          prop: 'tataxAccountxId',
          label: '税额(元)',
          type: 'money'
        },
        {
          itemType: 'text',
          prop: 'receivableTime',
          label: '应收日期'
        },
        {
          itemType: 'text',
          prop: 'financialDate',
          label: '权责月'
        },
        {
          itemType: 'text',
          prop: 'receivableTime',
          label: '应收来源'
        },
        {
          itemType: 'text',
          prop: 'paymentStartDate',
          label: '账期开始'
        },
        {
          itemType: 'text',
          prop: 'paymentEndDate',
          label: '账期结束'
        },
        {
          itemType: 'text',
          prop: 'verificationStatusId',
          label: '核销状态'
        },
        {
          itemType: 'text',
          prop: 'nvoiceStatusId',
          label: '开票状态'
        },
        {
          itemType: 'text',
          prop: 'subStatusId',
          label: '减免状态'
        },
        {
          itemType: 'text',
          prop: 'isGeneratedBills',
          label: '是否生成账单'
        },
        {
          itemType: 'text',
          prop: 'makeInvoiceAmount',
          label: '已开票金额'
        },
        {
          itemType: 'text',
          prop: 'remark',
          label: '备注'
        }
      ]
    }
  },
  computed: {
    infoData() {
      console.log(this.formData)
      return this.formData
    }
  },
  methods: {
    closeDialog() {
      this.$emit('closeDialog')
    }
  }
}
</script>
