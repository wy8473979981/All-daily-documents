<template>
  <div>
    <ysn-statusSearch
      :config="statusSearchConfig"
      name="审批状态"
      @change="handleChange"
    />
    <!-- 表单搜索组件 -->
    <ysn-seniorSearch :form="formData" :config="configData" clearable :column="5" @searchResult="searchResult" />
  </div>
</template>

<script>
export default {
  name: 'FormItem',
  data() {
    return {
      statusSearchConfig: [{ label: '草稿', value: 1, statusNum: 0 },
        { label: '审核中', value: 2, statusNum: 1 },
        { label: '审核通过', value: 3, statusNum: 10 },
        { label: '已驳回', value: 4, statusNum: 20 }],
      formData: {
        tenantName: '',
        programName: '',
        tenantType: ''
      },
      configData: [ // 表单配置
        { itemType: 'input', prop: '', label: '', placeholder: '请输入企业名称关键字', width: '220px', isFirst: true }, // TODO 字段没找到
        { itemType: 'select', prop: 'programName', label: '', placeholder: '请选择项目', width: '200px', isFirst: true, list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value', multiple: true },
        { itemType: 'select', prop: 'tenantType', label: '', placeholder: '请选择企业性质', width: '200px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value', multiple: true },
        { itemType: 'select', prop: 'tenantName', label: '', placeholder: '请选择企业名称', width: '200px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value', multiple: true }
      ]
    }
  },
  methods: {
    // 搜索事件
    searchResult(data) {
      console.log(data)
      this.$emit('searchTable', data)
    },
    handleChange(statusList) {
      console.log(statusList)
    }
  }
}
</script>
