<template>
  <div>
    <!-- 表单搜索组件 -->
    <ysn-seniorSearch :form="formData" :config="configData" clearable @searchResult="searchResult" />
  </div>
</template>

<script>
export default {
  name: 'BisOfficeProjectList',
  data() {
    return {
      formData: {

      },
      configData: [ // 表单配置
        { itemType: 'select', prop: 'fuzzyEnquiry', label: '', placeholder: '请选择项目名称', width: '200px', isFirst: true }
      ]
    }
  },

  methods: {
    searchResult(data) {}
  }
}
</script>

