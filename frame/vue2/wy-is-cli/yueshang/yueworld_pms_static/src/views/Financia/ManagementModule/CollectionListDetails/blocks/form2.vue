<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description:收款单-收款信息详情
-->

<template>
  <el-form ref="rulesForm" :model="currentFormData.formtwoData" label-position="top" size="small">
    <!-- 信息模块-->
    <ysn-formItem :form="currentFormData.formtwoData" :config="configData" :column="5" clearable text />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'

export default {
  name: 'From',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'formtwo',
    event: 'change'
  },
  props: {
    formtwo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      newConfig: [
        {
          itemType: 'text',
          prop: 'receivedAmount',
          label: '收款金额',
          type: 'money'
        },
        {
          itemType: 'text',
          prop: 'paymentTypeName',
          label: '收款方式'
        },
        {
          itemType: 'text',
          prop: 'bankFlowNumber',
          label: '银行流水号'
        },
        {
          itemType: 'text',
          prop: 'accountName',
          label: '收款单位'
        },
        {
          itemType: 'text',
          prop: 'bankName',
          label: '收款银行'
        },
        {
          itemType: 'text',
          prop: 'bankAccount',
          label: '收款账号'
        },
        {
          itemType: 'text',
          prop: 'receivedPerson',
          label: '收款人'
        },
        {
          itemType: 'text',
          prop: 'receivedDate',
          label: '收款日期'
        },
        {
          itemType: 'text',
          prop: 'remark',
          label: '备注'
        }
      ],
      configData: [
        // 详情配置
        {
          itemType: 'text',
          prop: 'receivedAmount',
          label: '收款金额',
          type: 'money'
        },
        {
          itemType: 'text',
          prop: 'paymentTypeName',
          label: '收款方式'
        },
        {
          itemType: 'text',
          prop: 'bankFlowNumber',
          label: '银行流水号'
        },
        {
          itemType: 'text',
          prop: 'accountName',
          label: '收款单位'
        },
        {
          itemType: 'text',
          prop: 'bankName',
          label: '收款银行'
        },
        {
          itemType: 'text',
          prop: 'bankAccount',
          label: '收款账号'
        },
        {
          itemType: 'text',
          prop: 'accountingEntity',
          label: '核算主体'
        },
        {
          itemType: 'text',
          prop: 'receivedPerson',
          label: '收款人'
        },
        {
          itemType: 'text',
          prop: 'receivedDate',
          label: '收款日期'
        },
        {
          itemType: 'text',
          prop: 'draweeName',
          label: '付款人姓名'
        },
        {
          itemType: 'text',
          prop: 'draweeBankAccount',
          label: '付款人账号'
        },
        {
          itemType: 'text',
          prop: 'remark',
          label: '备注'
        }
      ]
    }
  },
  created() {
    if (this.$route.query.unknownType === 2) {
      this.configData = this.newConfig
    }
  }
}
</script>
