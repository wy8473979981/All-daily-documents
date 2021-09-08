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
        s2: '',
        s3: '',
        s4: '',
        s5: '',
        s6: '',
        s7: ''
      },
      configData: [ // 表单配置
        { itemType: 'input', prop: 's1', label: '', placeholder: '请输入内容', width: '200px', isFirst: true },
        { itemType: 'select', prop: 's2', label: '', placeholder: '请选择物业类型', width: '200px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 's3', label: '', placeholder: '请选择点位类型', width: '200px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 's4', label: '', placeholder: '请选择合同类型', width: '200px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 's5', label: '', placeholder: '获得收益', width: '200px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 's6', label: '', placeholder: '单价是否低于标准', width: '200px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 's7', label: '', placeholder: '编辑状态', width: '200px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' }
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
