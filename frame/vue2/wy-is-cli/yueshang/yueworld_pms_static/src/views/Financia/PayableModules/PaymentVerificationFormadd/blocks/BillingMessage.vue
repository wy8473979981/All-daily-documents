<!--
 * @Author: jllk
 * @LastEditors: jllk
 * @Description:
-->
<template>
  <!-- 表单 -->
  <el-form
    ref="rulesForm"
    :model="currentFormData"
    label-position="top"
    size="small"
    :rules="rulesForm"
  >
    <ysn-formItem
      :form="currentFormData"
      :config="configData"
      :column="5"
      clearable
    />
  </el-form>
</template>
<script>
// 字典
import PUBFN from '@/utils/pubFn'
// mixins 混入
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'BillingMessage',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'baseInfoBilling',
    event: 'change'
  },
  props: {
    baseInfoBilling: {
      type: Object,
      default: () => {}
    }
  },
  //   表单数据
  data() {
    return {
      configData: [ // 新单元表单配置
        { itemType: 'input', prop: 'tenantId', label: '收款单位', placeholder: '请输入', width: '206px', listName: 'label', listValue: 'value', inputType: 'autoValue', disabled: true },
        { itemType: 'select', prop: 'collectionBankName', label: '收款银行', list: PUBFN.getOptionsList('collectionBankName'), placeholder: '请输入', width: '206px', listName: 'label', listValue: 'value' },
        { itemType: 'input', prop: 'collectionBankAccount', label: '收款账户 ', placeholder: '请输入', width: '206px', listName: 'label', listValue: 'value' }
      ],
      rulesForm: { // 表单验证
        collectionBankName: [{ required: true, message: '请输入必填项' }],
        collectionBankAccount: [{ required: true, message: '请输入必填项' }]

      }
    }
  },
  methods: {
  }
}
</script>
