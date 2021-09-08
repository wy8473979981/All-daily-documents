<!--
 * @Author: zsj
 * @Date: 2021-07-05 11:01:53
 * @LastEditTime: 2021-07-06 16:32:43
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
  name: 'Contract',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'contract',
    event: 'change'
  },
  props: {
    contract: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      configData: [ // 新单元表单配置
        { itemType: 'select', prop: 'taxTypeId', label: '计税类型', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('taxType'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'centralizedId', label: '收银类型', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('centralized'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'attributeId', label: '合同属性', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('attribute'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'signedId', label: '合同签署', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('signed'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'areaType', label: '计租面积类型', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('areaType'), listName: 'label', listValue: 'value' }

      ],
      rulesForm: { // 表单验证
        taxTypeId: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        centralizedId: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        attributeId: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        signedId: [{ required: true, message: '请输入必填项', trigger: 'change' }],
        areaType: [{ required: true, message: '请输入必填项', trigger: 'change' }]
      }
    }
  }

}
</script>
