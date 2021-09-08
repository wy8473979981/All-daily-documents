<template>
  <div>
    <!-- 表单搜索组件 -->
    <ysn-seniorSearch :form="formData" :config="configData" clearable @searchResult="searchResult" />
  </div>
</template>

<script>
export default {
  name: 'FormItem',
  data() {
    return {
      formData: {
        s1: '',
        s2: ''
      },
      configData: [ // 表单配置
        { itemType: 'input', prop: 's1', label: '', placeholder: '请输入意向编号等信息', width: '200px', isFirst: true },
        { itemType: 'select', prop: 's2', label: '', placeholder: '所有项目', width: '200px', isFirst: true, list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' }
      ]
    }
  },
  methods: {
    // 搜索事件
    searchResult(data) {
      console.log(data)
      this.$emit('searchTable', data)
    }
  }
}
</script>
