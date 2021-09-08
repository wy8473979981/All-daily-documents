<template>
  <div>
    <div class="flex-ju-end mb-12">
      <!-- <ysn-btn type="info" class="mr-12">上传核销单</ysn-btn> -->
      <UploadDoalog />
      <ysn-btn>新增核销</ysn-btn>
    </div>
    <ysn-table
      :checkbox="false"
      :data="tableData"
      :column="tableConfig"
      select-key="id"
    />
    <ysn-page :total="total" :page="page" @sizeChange="sizeChange" @currentChange="currentChange" />
  </div>
</template>

<script>
import UploadDoalog from './uploadDoalog'
export default {
  name: 'TableList',
  components: { UploadDoalog },
  data() {
    return {
      total: 20,
      page: { // 页数
        pageNo: 1,
        pageSize: 20
      },
      tableData: [ // 表格数据

      ], // 表格数据
      tableConfig: [// 表单配置
        { idx: '序号', type: 'index' },
        { t1: '核销单号', sortable: true },
        { t2: '商家', sortable: true },
        { t3: '核销金额', sortable: true },
        { t4: '项目', sortable: true, isShowSlots: true },
        { t5: '收款金额', sortable: true },
        { t6: '冲抵金额', sortable: true },
        { t7: '应收冲减', sortable: true },
        { t8: '冲减金额', sortable: true, isShowSlots: true },
        { t9: '转预收金额', sortable: true },
        { t10: '核销日期', sortable: true },
        { t11: '收款日期', sortable: true },
        { t12: '状态', sortable: true },
        { t13: '核销人', sortable: true, isShowSlots: true },
        { t14: '上传状态', sortable: true },
        { t15: '三方信息', sortable: true, isShowSlots: true },
        { t16: 'EAS单号', sortable: true }
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
