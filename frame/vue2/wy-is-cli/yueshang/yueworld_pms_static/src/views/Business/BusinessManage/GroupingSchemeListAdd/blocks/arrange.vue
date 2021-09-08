<!--
 * @Author: zsj
 * @Date: 2021-07-05 11:29:42
 * @LastEditTime: 2021-07-06 16:19:42
 * @LastEditors: zsj
-->
<template>
  <el-form ref="rulesForm" :model="currentFormData" label-position="top" size="small" :rules="rulesForm">
    <ysn-formItem :form="currentFormData" :config="configData" :column="4" clearable />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'

export default {
  name: 'Arrange',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'arrange',
    event: 'change'
  },
  props: {
    arrange: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      configData: [ // 新单元表单配置
        { itemType: 'select', prop: 'isShowDecorateStartDate', label: '是否显示装修进场日', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('isShowDecorateStartDate'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'isShowDecorateEndDate', label: '是否显示装修结束日', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('isShowDecorateEndDate'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'isShowDecoratePeriod', label: '是否显示装修期', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('isShowDecoratePeriod'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'isShowOpeningDate', label: '是否显示开业日', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('isShowOpeningDate'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'isShowTotalAmount', label: '是否显示合同总金额', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('isShowTotalAmount'), listName: 'label', listValue: 'value' }
        // { itemType: 'select', prop: 'isBrandRequired', label: '是否显示品牌名', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('isShowBand'), listName: 'label', listValue: 'value' }
      ],
      rulesForm: { // 表单验证
        isShowDecorateStartDate: [{ required: true, message: '请选择必填项' }],
        isShowDecorateEndDate: [{ required: true, message: '请选择必填项' }],
        isShowDecoratePeriod: [{ required: true, message: '请选择必填项' }],
        isShowOpeningDate: [{ required: true, message: '请选择必填项' }],
        isShowTotalAmount: [{ required: true, message: '请选择必填项' }],
        isBrandRequired: [{ required: true, message: '请选择必填项' }]
      }
    }
  }

}
</script>
