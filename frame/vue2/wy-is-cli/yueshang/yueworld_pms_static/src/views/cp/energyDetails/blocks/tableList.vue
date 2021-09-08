<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <div>
    <div class="flex-ju-end mb-12">
      <ysn-btn class="mr-12">保存</ysn-btn>
      <ysn-btn type="info">取消</ysn-btn>
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
export default {
  name: 'TableList',
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
        { t1: '类别', sortable: true },
        { t2: '项目', sortable: true },
        { t3: '用电分类', sortable: true },
        { t4: '用电设备', sortable: true, isShowSlots: true },
        { t5: '设备明细', sortable: true },
        { t6: '2020年度预计发生额', sortable: true },
        { t7: '单价(元)', sortable: true },
        { t8: '1月', sortable: true, isShowSlots: true },
        { t9: '2月', sortable: true },
        { t10: '3月', sortable: true },
        { t11: '4月', sortable: true },
        { t12: '5月', sortable: true },
        { t13: '6月', sortable: true, isShowSlots: true },
        { t14: '7月', sortable: true },
        { t15: '8月', sortable: true, isShowSlots: true },
        { t16: '9月', sortable: true },
        { t17: '10月', sortable: true },
        { t18: '11月', sortable: true },
        { t19: '12月', sortable: true },
        { t20: '说明', sortable: true, isShowSlots: true }
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

