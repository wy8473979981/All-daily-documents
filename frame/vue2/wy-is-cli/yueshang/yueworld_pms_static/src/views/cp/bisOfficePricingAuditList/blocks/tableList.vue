<!--
 * @Description:
 * @Author: zengcheng
 * @Date: 2021-06-04 14:32:24
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-06-28 16:22:42
-->
<template>
  <div>
    <div class="d-flex">
      <div class="el-icon-setting font-size-18" />
    </div>
    <!-- 表格 -->
    <ysn-table
      :data="tableData"
      :column="tableConfig"
      select-key="id"
      :checkbox="false"
      @row-click="openDetails"
    />
    <!-- 分页 -->
    <ysn-page :total="tableData.total" :page="page" @sizeChange="sizeChange" />
  </div>
</template>

<script>
// import { buildingApi } from '@/api'
export default {
  name: 'TableList',
  props: {
    tableData: { type: Array, default: () => [] },
    page: { type: Object, default: () => {} }
  },
  data() {
    return {
      tableConfig: [
        { idx: '序号', sortable: true, type: 'index' },
        { programName: '项目', sortable: true },
        { standardId: '批次号', sortable: true },
        { checkStatus: '状态', sortable: true },
        { createUser: '创建人', sortable: true },
        { applyDate: '创建时间', sortable: true }
      ]
    }
  },

  methods: {
    // 当前列的数据
    openDetails(row) {
      console.log(row)
      this.$router.push({ name: 'bisOfficePricingAuditAddAndEdit', params: { CheckStatus: row.CheckStatus }})
    },
    // 分页
    sizeChange(data) {}

  }
}
</script>

<style scoped lang="scss">
   .d-flex{
    display:flex;
    align-items: center;
     flex-direction:row-reverse;
     margin-bottom: 8px;
   }
</style>
