<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <div>
    <ysn-statusSearch :config="statusSearchConfig" name="审批状态" />
    <!-- 表单搜索组件 -->
    <ysn-seniorSearch :form="formData" :config="configData" clearable @searchResult="searchResult" />
  </div>
</template>

<script>
export default {
  name: 'FormIitem',
  data() {
    return {
      formData: {
        BuildingName: ''
      },
      configData: [ // 表单配置
        { itemType: 'input', prop: 'BuildingName', label: '', placeholder: '请输入楼栋名称关键字', width: '200px', isFirst: true },
        { itemType: 'select', prop: '', label: '', placeholder: '请选择全部项目', width: '200px', isFirst: true }
      ]
    }
  },
  //   components:{FormItem,TableList},
  computed: {
    // 筛选条件
    statusSearchConfig() {
      return [
        { label: '草稿', value: 1, statusNum: 0 },
        { label: '审核中', value: 2, statusNum: 1 },
        { label: '审核通过', value: 3, statusNum: 10 },
        { label: '已驳回', value: 4, statusNum: 20 }
      ]
    }
  },

  methods: {
    searchResult(data) {
      // 搜索字段
      this.$emit('tableStatusList', data)
    }

  }
}
</script>

<style scoped lang="scss">
    .d-flex{
        display:flex;
        margin-bottom: 24px;
        .wh-12{
            margin-top:8px;
            width:1px;
            height: 12px;
            background:#E5E2DE;
        }
    }
</style>
