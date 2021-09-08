<!--
 * @Author: zsj
 * @Date: 2021-07-05 11:01:53
 * @LastEditTime: 2021-07-15 16:43:47
 * @LastEditors: fhj
-->
<template>
  <el-form ref="rulesForm" :model="essential" label-position="top" size="small" :rules="rulesForm">
    <ysn-formItem :form="essential" :config="configData" :column="4" clearable />
  </el-form>
</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'
export default {
  name: 'Essential',
  components: {},
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'essential',
    event: 'change'
  },
  props: {
    essential: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      configData: [ // 新单元表单配置
        { itemType: 'select', prop: 'programName', label: '适用项目', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('PayableList'), listName: 'label', listValue: 'value' },
        { itemType: 'input', prop: 'ruleName', label: '方案名称', placeholder: '请输入', width: '206px', listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'storeTypes', label: '铺位类型', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('contType'), listName: 'label', listValue: 'value' },
        { itemType: 'selectDialog', prop: 'contractNameGenerateRuleIds', label: '请选择', placeholder: '请组合合同名称', width: '206px', list: this.$PUBFN.getOptionsList('contracted'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'ruleType', label: '方案状态', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('auditStatussec'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'pushType', label: '台账推送方式', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('parameter'), listName: 'label', listValue: 'value' }
      ],
      rulesForm: { // 表单验证
        programName: [{ required: true, message: '请输入必填项' }],
        ruleName: [{ required: true, message: '请输入必填项' }],
        storeTypes: [{ required: true, message: '请输入必填项' }],
        contractNameGenerateRuleIds: [{ required: true, message: '请输入必填项' }],
        ruleType: [{ required: true, message: '请输入必填项' }],
        pushType: [{ required: true, message: '请输入必填项' }]
      }
    }
  }

}
</script>
