<!--
 * @Author: jllk
 * @LastEditors: jllk
 * @Description:
-->
<template>
  <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small" :rules="rulesForm">
    <ysn-formItem :form="currentFormData" :config="configData" :column="5" clearable text />
  </el-form>
</template>
<script>
// 字典
import PUBFN from '@/utils/pubFn'
// mixins 混入
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'PaymentInformation',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'baseInfoPayment',
    event: 'change'
  },
  props: {
    baseInfoPayment: {
      type: Object,
      default: () => {}
    }
  },
  //   表单数据
  data() {
    return {
      configData: [ // 新单元表单配置
        { itemType: 'input', prop: 'payableAmount', type: 'money', label: '本次付款金额', placeholder: '请输入', width: '206px', listName: 'label', listValue: 'value', inputType: 'autoValue' },
        { itemType: 'select', prop: 'payableType', label: '付款方式', placeholder: '请输入', width: '206px', listName: 'label', listValue: 'value', list: PUBFN.getOptionsList('payableType'), inputType: 'autoValue' },
        { itemType: 'input', prop: 'accountName', label: '付款单位 ', placeholder: '请输入', width: '206px', listName: 'label', listValue: 'value', inputType: 'autoValue', disabled: true },
        { itemType: 'input', prop: 'bankName', label: '付款银行', placeholder: '请输入', width: '206px', listName: 'label', listValue: 'value', inputType: 'autoValue', disabled: true },
        { itemType: 'input', prop: 'bankAccount', label: '付款账号', placeholder: '请输入', width: '206px', listName: 'label', listValue: 'value', inputType: 'autoValue', disabled: true },
        { itemType: 'datePicker', type: 'date', prop: 'payableDate', label: '付款日期', placeholder: '选择付款日期', width: '206px' }
      ],
      rulesForm: { // 表单验证
        payableType: [{ required: true, message: '请输入必填项' }],
        payableDate: [{ required: true, message: '选择付款日期' }]

      }
    }
  },
  methods: {
  }

}
</script>
