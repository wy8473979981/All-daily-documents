<template>
  <div class="max-area">
    <div class="flex-ju-end mb-12">
      <ysn-btn class="mr-12" type="info">意向转租聘</ysn-btn>
      <ysn-btn class="mr-12" disabled>续租</ysn-btn>
      <ysn-btn>新增租赁合同</ysn-btn>
    </div>
    <!-- 表格组件 -->
    <ysn-table
      :checkbox="false"
      :data="tableData"
      :column="tableConfig"
      select-key="id"
    />
    <!-- 分页 -->
    <ysn-page :total="total" :page="page" @sizeChange="sizeChange" @currentChange="currentChange" />
  </div>
</template>

<script>

export default {
  name: 'TableList',
  props: {
  },
  data() {
    return {
      total: 20,
      page: { // 页数
        pageNo: 1,
        pageSize: 20
      },
      tableData: [ // 表格数据
      ],
      tableConfig: [// 表格配置
        { idx: '序号', type: 'index', width: '70px' },
        { t1: '方案编号', sortable: true },
        { t3: '方案编号', sortable: true },
        { t4: '方案编号', sortable: true, isShowSlots: true },
        { t5: '方案编号', sortable: true },
        { t5: '方案编号', sortable: true },
        { t5: '方案编号', sortable: true }
      ]
    }
  },
  computed: {},
  methods: {
    sizeChange() {},
    currentChange() {}
  }
}
</script>
