<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <div>
    <!-- 表单搜索组件 -->
    <ysn-seniorSearch :column="5" :form="formData" :config="configData" clearable @searchResult="searchResult" />
  </div>
</template>

<script>
export default {
  name: 'FormItem',

  data() {
    return {
      // 表单数据
      formData: {
        BuildingName: [],
        fuzzyEnquiry: '',
        programName: '',
        floorName: '',
        standardYear: '',
        officeName: ''
      },
      configData: [ // 表单配置
        { itemType: 'input', prop: 'fuzzyEnquiry', label: '', placeholder: '请输入楼栋/楼层/单元号', width: '220px', isFirst: true },
        { itemType: 'select', prop: 'programName', label: '', placeholder: '请选择全部项目', width: '220px', isFirst: true },
        { itemType: 'select', prop: 'buildingName', label: '', placeholder: '请选择全部楼栋', width: '200px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: [], multiple: true },
        { itemType: 'select', prop: 'floorName', label: '', placeholder: '请选择全部楼层', width: '200px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'datePicker', prop: 'standardYear', label: '', placeholder: '请选择开始年度', width: '200px', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { itemType: 'datePicker', prop: 'standardYear', label: '', placeholder: '请选择结束年度', width: '200px', valueFormat: 'yyyy-MM-dd HH:mm:ss' }, // TODO 字段不明确
        { itemType: 'select', prop: 'officeName', label: '', placeholder: '请选择单元名称', width: '200px', span: 2 }
      ]
    }
  },
  methods: {
    // 搜索事件
    searchResult(data) {
      this.$emit('searchTable', data)
    }
  }
}
</script>
