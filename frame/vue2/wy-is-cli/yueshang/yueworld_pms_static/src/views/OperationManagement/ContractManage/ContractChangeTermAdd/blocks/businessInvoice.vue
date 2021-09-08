<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description:合同变更-新增-商家开票信息
-->

<template>
  <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small" :rules="rulesForm">
    <!-- 信息模块-->
    <ysn-formItem :form="currentFormData" :config="configData" :column="4" clearable />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@mixins/pageAccorDetailCom'
import { contractChangeApi } from '@/api'

export default {
  name: 'BusinessInvoice',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'businessInvoice',
    event: 'change'
  },
  props: {
    businessInvoice: {
      type: Object,
      default: () => {
      }
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      rulesForm: {
        tenantName: [{ required: true, message: '请输入必填项' }]
      }
    }
  },
  computed: {
    configData() {
      return [
        {
          itemType: 'select',
          prop: 'tenantLetterhead',
          required: true,
          label: '开票名称',
          placeholder: '请选择',
          list: this.$PUBFN.getOptionsList('tenantLetterhead'),
          listName: 'label',
          listValue: 'value',
          multiple: false,
          change: this.contractChangeTenantBillingInfo,
          disabled: !this.data.essentialData.contNo
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'tenantLetterheadUnifiedSocialCreditCode',
          label: '统一社会代码/身份证',
          disabled: true
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'tenantLetterheadBankname',
          label: '开户银行',
          disabled: true
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'tenantLetterheadBankaccount',
          label: '银行账号',
          disabled: true
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'tenantLetterheadTel',
          label: '联系电话',
          disabled: true
        },
        {
          itemType: 'input',
          inputType: 'autoValue',
          prop: 'tenantLetterheadAddress',
          label: '商家地址',
          disabled: true
        }
      ]
    }
  },
  methods: {
    contractChangeTenantBillingInfo(row) {
      this.$parent.$parent.$parent.$parent.contractChangeTenantContractInfo(row)
      const that = this
      const datas = {
        tenantName: row.tenantName
      }
      contractChangeApi.contractChangeTenantBillingInfo(datas).then(res => {
        if (res) {
          that.currentFormData.tenantLetterheadUnifiedSocialCreditCode = res.tenantLetterheadUnifiedSocialCreditCode
          that.currentFormData.tenantLetterheadBankname = res.tenantLetterheadBankname
          that.currentFormData.tenantLetterheadBankaccount = res.tenantLetterheadBankaccount
          that.currentFormData.tenantLetterheadTel = res.tenantLetterheadTel
          that.currentFormData.tenantLetterheadAddress = res.tenantLetterheadAddress
        }
      })
    }
  }

}
</script>

