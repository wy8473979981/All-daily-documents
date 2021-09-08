<template>
  <div>
    <!-- 表单搜索组件 -->
    <ysn-seniorSearch :form="formData" :config="configData" clearable label-position="left" :column="6" @searchResult="searchResult" />
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
        s7: '',
        s8: '',
        s9: ''
      },
      configData: [ // 表单配置
        { itemType: 'input', prop: 's1', label: '', placeholder: '请选择所属项目', width: '200px', isFirst: true, list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value', multiple: true },
        { itemType: 'select', prop: 's2', label: '', placeholder: '请选择楼栋名称', width: '200px', isFirst: true, list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value', multiple: true },
        { itemType: 'select', prop: 's3', label: '', placeholder: '请选择楼栋名称', width: '200px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 's4', label: '', placeholder: '请选择楼栋名称', width: '200px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 's5', label: '', placeholder: '请选择楼栋名称', width: '200px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'input', prop: 's6', label: '', placeholder: '请选择楼栋名称', width: '200px' },
        { itemType: 'select', prop: 'buildingName', label: '', placeholder: '请选择楼栋名称', width: '200px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 's7', label: '', placeholder: '请选择楼栋名称', width: '200px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'datePicker', type: 'daterange', prop: 's8', label: '核销日期', placeholder: '选择日期时间', valueFormat: 'yyyy-MM-dd HH:mm:ss', width: '200px' },
        { itemType: 'datePicker', type: 'daterange', prop: 's9', label: '收款日期', placeholder: '选择日期时间', valueFormat: 'yyyy-MM-dd HH:mm:ss', width: '200px' }

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
