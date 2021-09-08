<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <div class="max-area">
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
      total: 20, // 总页数
      page: { // 页数
        pageNo: 1,
        pageSize: 20
      },
      tableData: [ // 模拟表格假数据
      ], // 表格数据
      tableConfig: [// 表单配置
        { idx: '序号', type: 'index', width: '70px' },
        { t1: '项目', sortable: true },
        { t2: '预算方案名称', sortable: true, width: '280px' },
        { t3: '类型', sortable: true },
        { t4: '部门', sortable: true },
        { t5: '版本号', sortable: true },
        { t6: '来源', sortable: true },
        { t7: '审批状态', sortable: true },
        { t8: '审核时间', sortable: true }
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
