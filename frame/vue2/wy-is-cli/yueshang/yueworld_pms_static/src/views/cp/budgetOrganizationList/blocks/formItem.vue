<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <div>
    <!-- 表单组件 -->
    <el-form ref="ruleForm" :model="formData" label-position="top" size="small">
      <ysn-formItem
        :form="formData"
        :config="configData"
        :column="4"
        clearable
      />
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'FormItem',
  props: {
  },
  data() {
    return {
      formData: { // 表单数据
        s1: ''
      },
      configData: [ // 表单配置
        { itemType: 'select', prop: 's1', label: '', placeholder: '请选择所属项目', width: '206px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' }

      ]
    }
  },
  computed: {},
  methods: {}
}
</script>

