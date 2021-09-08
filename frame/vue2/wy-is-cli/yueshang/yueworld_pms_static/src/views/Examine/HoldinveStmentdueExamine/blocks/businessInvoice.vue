<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-07-01 13:41:18
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-07-07 13:21:34
-->
<template>
  <div>
    <el-form ref="rulesForm" :model="businessInvoice" label-position="top" size="small" :rules="rulesForm">
      <ysn-formItem :form="businessInvoice" :config="configData" :column="4" clearable />
    </el-form>
  </div>
</template>
<script>

export default {
  name: 'BusinessInvoice',
  components: {},
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
      formData1: {},
      configData: [ // 新单元表单配置
        { itemType: 'input', prop: 'BuildingName', label: '商家名称', placeholder: '请输入', width: '206px', disabled: true }, // TODO 字段未找到
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
