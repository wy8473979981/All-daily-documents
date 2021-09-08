<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-07-01 13:41:18
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-07-14 18:00:09
-->
<template>
  <div>
    <el-form ref="rulesForm" :model="businessInvoice" label-position="top" size="small" :rules="rulesForm">
      <ysn-formItem :form="businessInvoice" :config="configData" :column="4" clearable />
    </el-form>
  </div>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
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
      default: () => {}
    }
  },
  data() {
    return {
      configData: [
        { itemType: 'select', prop: 'BuildingName', label: '开票名称', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('chargingMethod'), listName: 'label', listValue: 'value' }, // TODO 字段未找到
        { itemType: 'input', prop: 'tenantLetterheadUnifiedSocialCreditCode', label: '统一社会代码/身份证', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'input', prop: 'tenantLetterheadBankname', label: '开户银行', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'input', prop: 'tenantLetterheadBankaccount', label: '银行账号', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'input', prop: 'tenantLetterheadTel', label: '联系电话', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'input', prop: 'tenantLetterheadAddress', label: '商家地址', placeholder: '请输入', width: '206px', disabled: true }

      ],
      rulesForm: { // 表单验证
        BuildingName: [{ required: true, message: '请输入必填项' }]
      }
    }
  }

}
</script>
