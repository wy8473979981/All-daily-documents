<template>
  <div>
    <ysn-dialog title="导入保证金">
      <ysn-btn type="info" class="mr-8">上传核销单</ysn-btn>
      <template #contain>
        <div class="flex-ju-al-center d-flex-column">
          <div class="wh-center"><i class="el-icon-circle-plus" /><span>上传数据</span></div>
          <div class="mt-12">可上传小与20M的文件</div>
        </div>
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

<style lang="scss" scoped>
.wh-center{
    width: 400px;
    height: 98px;
    background: #eaeaea;
    border: 1px dashed #979797;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center
          }

</style>
