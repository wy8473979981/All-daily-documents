<!--
 * @Author: xueyx
 * @LastEditors: fhj
 * @Description:开业审批列表页
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      ref="approveList"
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-form="searchForm"
      :search-column="3"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-order-config="tableOrderConfig"
      :before-qeury-data="beforeQeuryData"
      :delete-table="deleteTable"
      delete-message="非草稿状态下不可删除"
      persmission="BisExamineApprove"
      @row-click="rowClick"
    >
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn @click="addBox">新增</ysn-btn>
      </template>
    </YsnPageContent>
  </div>
</template>

<script>
import { searchConfig, tableConfig, statusSearchConfig } from './config'
import { approveApi } from '@/api'

export default {
  name: 'BisExamineApprove',
  data() {
    return {
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '', // 模糊查询
        programName: [] // 项目名称
      },
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 状态筛选
      statusSearchConfig: statusSearchConfig.call(this),
      // 列表数据
      tableData: [],
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),
      // 接口请求配置
      queryConfig: {
        api: approveApi.bisExamineApprove, // 接口请求方式
        dataKey: 'list', // 取请求接口后返回的某个字段作为表单数据 默认data
        deleteApi: approveApi.approveDeleteList // 删除请求方式
      },
      // ysn-table额外配置 用于打开checkb填入eox等
      tableOrderConfig: {
        checkbox: true // 继承el-table所有属性,ysn-table的属性
      },
      // 审核状态
      auditStatus: ''
    }
  },
  methods: {
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      // 数据单独处理后returnData, 可返回data模板或者额外处理后的searchFormData
      return data
    },
    // 行点击详情页面或编辑页面
    rowClick(row) {
      // 根据审核状态判断跳转详情页还是编辑页   1-草稿  4-驳回  2-审核中  3-已审核
      if (row.checkStatus === 1 || row.checkStatus === 4) {
        this.$router.push({ name: 'BisExamineApproveAdd', query: { id: row.id }})// 草稿，驳回 跳转编辑页
      } else {
        this.$router.push({ name: 'BisExamineApproveDetail', query: { id: row.id }})// 审核中，已审核 跳转详情页
      }
    },
    // 新增跳转
    addBox() {
      this.$router.push({ name: 'BisExamineApproveAdd' })
    },
    // 默认非草稿禁止删除
    deleteTable(row) {
      return row.checkStatus === 1
    }

  }
}
</script>

