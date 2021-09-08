<!--
 * @Author: zsj
 * @Date: 2021-07-06 13:22:02
 * @LastEditTime: 2021-08-02 14:22:18
 * @LastEditors: Please set LastEditors
-->
<template>
  <div>
    <el-form
      ref="ruleForm"
      :model="formData"
      label-position="top"
      :rules="rulesForm"
    >
      <ysn-title title="日单价转换公式" class="mb-8" />
      <ysn-formItem
        :form="formData"
        :config="configDatasce"
        :column="4"
        clearable
      />
    </el-form>
  </div>

</template>

<script>

export default {
  name: 'Cedding',
  props: {
    isShowDialog: { type: Boolean, default: false } // 弹窗控制
  },

  data() {
    return {
      hasMenu: false, // 是否显示左侧菜单
      update: 0,
      formData: { // 表单数据
        algorithmIds: '', // 申请日单价
        algorithmId: '', // 申请月单价
        paymentUnitIds: '', // 申请月总额
        paymentUnitId: '', // 申请年清单
        fixedPaymentCycleIds: '' // 申请年总额
      },
      rulesForm: { // 表单验证
        algorithmIds: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        algorithmId: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        paymentUnitIds: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        paymentUnitId: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        fixedPaymentCycleIds: [{ required: true, message: '请输入必填项', trigger: 'change' }]
      },
      configDatasce: [
        { itemType: 'input', prop: 'algorithmIds', label: '申请日单价', disabled: true, placeholder: '不换算', listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'algorithmId', label: '申请月单价', placeholder: '请选择', list: this.$PUBFN.getOptionsList('monthPrice'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'paymentUnitIds', label: '申请月总额', placeholder: '请选择', list: this.$PUBFN.getOptionsList('allMonthPrice'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'paymentUnitId', label: '申请年清单', placeholder: '请选择', list: this.$PUBFN.getOptionsList('yearsPrice'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'fixedPaymentCycleIds', label: '申请年总额', placeholder: '请选择', list: this.$PUBFN.getOptionsList('allYearsPrice'), listName: 'label', listValue: 'value' }
      ]
    }
  }
}
</script>
