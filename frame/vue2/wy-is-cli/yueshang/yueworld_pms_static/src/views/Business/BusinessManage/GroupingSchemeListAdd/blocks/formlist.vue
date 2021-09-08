/* eslint-disable vue/valid-v-slot */
<!--
 * @Author: zsj
 * @Date: 2021-07-05 11:01:53
 * @LastEditTime: 2021-07-15 18:19:51
 * @LastEditors: fhj
-->
<template>
  <div>
    <ysn-formTable
      ref="formTable"
      v-model="currentFormData"
      prop="tableData"
      :column="formTableConfig"
      :add="false"
      :first-row-add="false"
    />
  </div>

</template>
<script>
import pageAccorDetailCom from '@/mixins/pageAccorDetailCom'

export default {
  name: 'Formlist',
  mixins: [pageAccorDetailCom],
  model: {
    prop: 'formlist',
    event: 'change'
  },
  props: {
    formlist: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      formTableConfig: [
        { field: '字段', itemType: 'text' },
        { logic: '函数', itemType: 'text' }
      ],
      configData: [ // 新单元表单配置
        { itemType: 'select', prop: 'field', label: '字段', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 'logic', label: '函数', placeholder: '请选择', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' }
      ],
      rulesForm: { // 表单验证
        programName: [{ required: true, message: '请输入必填项' }],
        ruleName: [{ required: true, message: '请输入必填项' }]
      }
    }
  }

}
</script>
