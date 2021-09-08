<template>
  <div class="max-area">
    <div class="flex-ju-end mb-12">
      <ysn-btn class="mr-12">导入</ysn-btn>
      <ysn-btn>新增</ysn-btn>
    </div>
    <!-- 表格 -->
    <ysn-table
      :data="tableData"
      :column="tableConfig"
      select-key="id"
    />
    <!-- 分页 -->
    <ysn-page :total="tableData.total" :page="page" @sizeChange="sizeChange" @currentChange="currentChange" />
  </div>
</template>

<script>
export default {
  name: 'TableList',
  data() {
    return {
      total: 100,
      page: { pageNo: 1, pageSize: 20 },
      tableData: [], // 表格数据
      tableConfig: [
        { idx: '物业类型', type: 'index' },
        { t1: '费用项名称', sortable: true },
        { t2: '排序号', sortable: true },
        { t3: '上级', sortable: true },
        { t4: '适用业态', sortable: true }

      ]
    }
  },

  methods: {
    sizeChange() {},
    currentChange() {}
  }
}
</script>
