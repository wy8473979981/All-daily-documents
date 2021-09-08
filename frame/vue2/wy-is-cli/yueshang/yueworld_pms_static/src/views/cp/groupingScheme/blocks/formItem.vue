<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <div class="max-area">
    <ysn-statusSearch
      :config="statusSearchConfig"
      name="审批状态"
      :value="[]"
      @change="statusChange"
    />
    <ysn-statusSearch
      :config="shop"
      name="铺位类型"
      :value="[]"
      @change="shopChange"
    />
    <!-- 表单搜索组件 -->
    <ysn-seniorSearch :form="formData" :config="configData" clearable @searchResult="searchResult" />
    <div class="flex-ju-between" style="margin-bottom: 10px;">
      <span />
      <ysn-btn>新增计组方案</ysn-btn>
    </div>
    <ysn-table
      :checkbox="false"
      :data="tableData"
      :column="tableConfig"
      select-key="id"
      full
    />
    <!-- 分页 -->
    <ysn-page :total="total" :page="page" @change="sizeChange" />
  </div>
</template>

<script>
export default {
  name: 'FormItem',
  props: {
    total: {
      type: Number,
      default: 0
    },
    formData: {
      type: Object, default: () => {}
    },
    page: { type: Object, default: () => {} },
    tableData: { type: Array, default: () => [] }
  },
  data() {
    return {
      tableConfig: [
        { idx: '序号', type: 'index', sortable: true, width: '100px' },
        { number: '方案编号', sortable: true },
        { applys: '适用项目', sortable: true },
        { name: '方案名称', sortable: true },
        { money: '费项', sortable: true },
        { type: '铺位类型', sortable: true },
        { state: '方案状态', sortable: true },
        { time: '创建时间', sortable: true }
      ],
      configData: [ // 表单配置
        { itemType: 'input', prop: 's1', label: '', placeholder: '请输入编号/方案名称', width: '200px', isFirst: true },
        { itemType: 'select', prop: 's2', label: '', placeholder: '请选择项目', width: '200px', isFirst: true, list: this.$PUBFN.getOptionsList('globalSearchList'), listName: 'label', listValue: 'value', multiple: true }
      ]
    }
  },
  computed: {
    // 筛选条件
    statusSearchConfig() {
      return [
        { label: '正常', value: 1, statusNum: 0 },
        { label: '失效', value: 2, statusNum: 1 }
      ]
    },
    shop() {
      return [
        { label: '商铺', value: 1, statusNum: 0 },
        { label: '多经', value: 2, statusNum: 1 }
      ]
    }
  },
  methods: {
    // 搜索事件
    searchResult(data) {
      this.$emit('searchTable', data)
    },
    // 分页
    sizeChange(data) {
      // 目前传入的页数无效
      this.$emit('reshft', data)
    },
    statusChange(statusList) {
      this.$emit('checks', statusList, 1)
    },
    shopChange(statusList) {
      this.$emit('checks', statusList, 2)
    }
  }
}
</script>
