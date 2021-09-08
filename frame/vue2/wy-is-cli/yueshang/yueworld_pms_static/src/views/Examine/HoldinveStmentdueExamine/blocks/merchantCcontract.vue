<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-07-01 13:46:00
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-07-07 13:22:55
-->
<template>
  <div>
    <el-form ref="rulesForm" :model="merchantCcontract" label-position="top" size="small" :rules="rulesForm">
      <ysn-formItem :form="merchantCcontract" :config="configData" :column="4" clearable />
    </el-form>
  </div>
</template>
<script>

export default {
  name: 'MerchantCcontract',
  components: {},
  model: {
    prop: 'merchantCcontract',
    event: 'change'
  },
  props: {
    merchantCcontract: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      formData1: {},
      configData: [ // 新单元表单配置
        { itemType: 'input', prop: 'BuildingName', label: '商家抬头', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'input', prop: 'tenantContractName', label: '合同抬头', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'input', prop: 'tenantContractTel', label: '合同电话', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'input', prop: 'tenantContractPerson', label: '联系人', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'input', prop: 'tenantContractFax', label: '传真', placeholder: '请输入', width: '206px', disabled: true },
        { itemType: 'input', prop: 'tenantContractEmail', label: '邮箱', placeholder: '请输入', width: '206px', disabled: true }

      ],
      rulesForm: { // 表单验证
        BuildingName: [{ required: true, message: '请输入必填项' }]
      }
    }
  }

}
</script>
