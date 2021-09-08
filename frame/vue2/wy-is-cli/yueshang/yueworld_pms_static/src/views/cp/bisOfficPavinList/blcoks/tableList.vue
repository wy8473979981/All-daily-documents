<template>
  <div class="max-area">
    <div class="flex-ju-end flex-al-center mb-12">
      <ysn-btn class="mr-8">新增</ysn-btn>
      <ysn-btn type="info" class="mr-8" @click="sub">提交</ysn-btn>
      <ysn-btn type="reset" class="mr-16" @click="remove">删除</ysn-btn>
      <div class="el-icon-setting font-size-18" />
    </div>
    <!-- 表格 -->
    <ysn-table
      :data="tableData.data"
      :column="tableConfig"
      select-key="id"
      full
      @row-click="openDetails"
      @select="handleCheckAllChange"
      @select-all="handleCheckAllChangeAll"
    />
    <!-- 分页 -->
    <ysn-page :total="tableData.total" :page="page" @sizeChange="sizeChange" />
  </div>
</template>

<script>
import { buildingApi } from '@/api'
export default {
  name: 'TableList',
  props: {
    tableData: { type: Object, default: () => {} }
  },
  data() {
    return {
      // 分页
      page: {
        pageSize: 20,
        pageNo: 10
      },
      selection: [], // 全选的数据
      tableConfig: [
        { idx: '序号', sortable: true, isShowSlots: true },
        { programName: '项目', sortable: true },
        { commentId: '审批号', sortable: true },
        { checkStatus: '审批状态', sortable: true },
        { createUser: '发起人', sortable: true },
        { applyDate: '发起时间', sortable: true }
      ]
    }
  },

  methods: {
    sizeChange() {},
    // 当前列的数据
    openDetails(row) {
      console.log(row)
      // TODO 枚举不明确  自己先定义 待真实交互要修改
      //  row.CheckStatus 0 草稿 1 审核中 2 审核通过 3已驳回
      // 0 1编辑 2 3不可编辑
      if (row.checkStatus === '0' || row.checkStatus === '1') {
        this.$router.push({ name: 'bisOfficePavingEdit', params: { CheckStatus: row.CheckStatus }})
        return
      }
      if (row.checkStatus === '2' || row.checkStatus === '3') {
        this.$router.push({ name: 'bisOfficePavingEdit', params: { CheckStatus: row.CheckStatus }})
        // this.$router.push({ name: 'bisOfficePavingDetails', params: { CheckStatus: row.CheckStatus }})
        return
      }
    },
    // 当用户手动勾选数据行的 Checkbox 时触发的事件
    handleCheckAllChange(selection, row) {
      this.selection = selection
    },
    // 当用户手动勾选全选 Checkbox 时触发的事件
    handleCheckAllChangeAll(selection) {
      this.selection = selection
    },
    //  提交和删除接口（提交和删除需要一个type来区别操作，模拟的时候没写 和后端对接要加上）
    removeAndSub() {
      if (this.selection.length === 0) {
        this.$message.error('至少选择一条数据')
        return
      }

      buildingApi.bisOfficPavinRove(this.selection).then(res => {
        this.$emit('refresh')
      })
    },
    // 提交
    sub() {
      this.removeAndSub()
    },
    // 删除
    remove() {
      this.removeAndSub()
    }
  }
}
</script>
