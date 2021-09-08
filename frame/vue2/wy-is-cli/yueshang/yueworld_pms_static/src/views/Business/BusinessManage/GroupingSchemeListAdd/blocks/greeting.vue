<!--
 * @Author: zsj
 * @Date: 2021-07-05 11:29:42
 * @LastEditTime: 2021-08-05 15:37:00
 * @LastEditors: Please set LastEditors
-->
<template>
  <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small" :rules="rulesForm">
    <ysn-formItem :form="currentFormData" :config="configData" :column="4" clearable />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'Greeting',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'greeting',
    event: 'change'
  },
  props: {
    greeting: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      configData: [ // 新单元表单配置
        { itemType: 'select', prop: 'spaceMandatoryId', label: '铺位强控', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('spaceMandatory'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'showPackageId', label: '一铺一价表', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('packages'), listName: 'label', listValue: 'value' },
        // { itemType: 'select', prop: 'calculatePlanType', label: '尾差计算公式', placeholder: '请输入', width: '206px', list: this.$PUBFN.getOptionsList('calculatePlanType'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'mzqPlanType', label: '免租期计算方式', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('mzqPlanType'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'receivablePriorContract', label: '应收允许早于合同', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('receivablePriorContract'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'schemeType', label: '显示方式', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('schemeType'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'enablePaymentDay', label: '是否启用首账期', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('isShowTotalAmount'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'editingTotalAmount', label: '是否编辑首账期总数', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('editingTotalAmount'), listName: 'label', listValue: 'value' }
      ],
      rulesForm: { // 表单验证
        spaceMandatoryId: [{ required: true, message: '请选择必填项' }],
        showPackageId: [{ required: true, message: '请选择必填项' }],
        calculatePlanType: [{ required: true, message: '请选择必填项' }],
        mzqPlanType: [{ required: true, message: '请选择必填项' }],
        receivablePriorContract: [{ required: true, message: '请选择必填项' }],
        schemeType: [{ required: true, message: '请选择必填项' }],
        enablePaymentDay: [{ required: true, message: '请选择必填项' }],
        editingTotalAmount: [{ required: true, message: '请选择必填项' }]
      }
    }
  }
}
</script>
