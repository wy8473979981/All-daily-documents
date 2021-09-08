<template>
  <div class="max-area">
    <div class="flex-ju-end mb-12">
      <ysn-btn class="mr-12">查看租金包</ysn-btn>
      <!-- 预算调整弹窗 -->
      <DialogData />
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
import DialogData from './dialogData'
export default {
  name: 'TableList',
  components: { DialogData },
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
        { t1: '项目', sortable: true },
        { t3: '预算方案名称', sortable: true },
        { t4: '类型', sortable: true, isShowSlots: true },
        { t5: '部门', sortable: true },
        { t5: '版本号', sortable: true },
        { t5: '审批状态', sortable: true },
        { t5: '审核时间', sortable: true }
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
