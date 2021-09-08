<template>
  <div class="max-area">
    <div class="flex-ju-end mb-12">
      <ysn-btn class="mr-12">导入模版下载</ysn-btn>
      <ysn-btn type="info" class="mr-12">品牌导入</ysn-btn>
      <ysn-btn>新增品牌</ysn-btn>
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
        { idx: '序号', type: 'index' },
        { t1: '品牌名', sortable: true },
        { t2: '品牌编码', sortable: true },
        { t3: '品牌别名', sortable: true },
        { t4: '品牌等级', sortable: true },
        { t1: '经营性质', sortable: true },
        { t2: '业态', sortable: true },
        { t3: '单客价(元)', sortable: true },
        { t4: '审批状态', sortable: true }
      ]
    }
  },

  methods: {
    sizeChange() {},
    currentChange() {}
  }
}
</script>
