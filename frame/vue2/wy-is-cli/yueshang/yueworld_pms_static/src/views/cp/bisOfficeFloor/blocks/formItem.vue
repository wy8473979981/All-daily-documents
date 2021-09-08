<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <div>
    <!-- 表单搜索组件 -->
    <ysn-seniorSearch :form="formData" :config="configData" clearable @searchResult="searchResult" />
  </div>
</template>

<script>
import DialogForm from './dialogForm'
export default {
  name: 'FormItem',
  components: { DialogForm },
  data() {
    return {
      formData: {
        FloorName: '',
        ProgramName: '',
        BuildingName: ''
      },
      configData: [ // 表单配置
        { itemType: 'input', prop: 'floorName', label: '', placeholder: '请输入楼层名称关键字', width: '200px', isFirst: true },
        { itemType: 'select', prop: 'programName', label: '', placeholder: '请选择全部项目', width: '200px', isFirst: true, list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value', multiple: true },
        { itemType: 'select', prop: 'buildingName', label: '', placeholder: '请选择全部楼栋', width: '200px', isFirst: true, list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value', multiple: true }
      ]
    }
  },

  methods: {
    searchResult(data) {
      this.$emit('tableList', data)
    }
  }
}
</script>

<style scoped lang="scss">
  .d-flex{
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      align-items: center;
      .flex{
          display:flex;
          .font-color{
            display: flex;
            align-items: center;
            font-size:14px;
            color:#050101;
            .font-color-blue{
              margin-left:4px;
              color:#1C4C7F;
              font-size:18px;
            }
          }
      }
      .font-size-18{
          font-size:16px;
      }
      .text-right{
        display: flex;
        flex-direction:row-reverse;
      }
  }
</style>
