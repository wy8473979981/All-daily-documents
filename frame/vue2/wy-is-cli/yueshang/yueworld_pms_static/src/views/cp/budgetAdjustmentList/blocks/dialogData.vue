<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <div>
    <ysn-dialog title="预算调整">
      <ysn-btn class="mr-8">预算调整</ysn-btn>
      <!-- 弹窗表单-->
      <template #contain>
        <el-form ref="ruleForm" :model="formData" label-position="top" size="small">
          <ysn-formItem
            label-position="top"
            :form="formData"
            :config="configData"
            :column="2"
            clearable
          />
        </el-form>
        <!-- 表格 -->
        <ysn-table
          :data="tableData"
          :column="tableConfig"
          select-key="id"
        />
      </template>
    </ysn-dialog>
  </div>
</template>

<script>
export default {
  name: 'FormItem',
  data() {
    return {
      formData: { // 表单数据
        s1: '',
        s2: '',
        s3: '',
        s4: ''
      },
      configData: [ // 表单配置
        { itemType: 'select', prop: 's1', label: '请选择项目', placeholder: '请选择项目', width: '200px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 's2', label: '请选择类型', placeholder: '请选择类型', width: '200px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 's3', label: '请选择部门', placeholder: '请选择部门', width: '200px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' },
        { itemType: 'select', prop: 's4', label: '请选择年', placeholder: '请选择年度', width: '200px', list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value' }
      ],
      tableData: [], // 表格数据
      tableConfig: [// 表格配置
        { t1: '部门', sortable: true },
        { t2: '预算表名', sortable: true }
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
