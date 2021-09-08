/*
 * @Author: xiaoxie
 * @Date: 2021-07-19 11:25:56
 * @Last Modified by: xiaoxie
 * @Last Modified time: 2021-08-27 15:37:54
 *保证金处理单
 */
<template>
  <div class="app-page-main">
    <YsnPageContent
      ref="MarginProcessingList"
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-form="searchForm"
      :search-column="3"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-desc-config="tableDescConfig"
      :before-qeury-data="beforeQeuryData"
      :delete-table="deleteTable"
      delete-message="非草稿状态下不可删除"
      persmission="MarginProcessingList"
      :table-right-excel="tableRightExcel"
      @row-click="rowClick"
    >
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn class="mr-12" @click="addBox">新增</ysn-btn>
      </template>
    </YsnPageContent>
  </div>
</template>
<script>
import { marginProcessingApi } from '@/api'
import { searchConfig, tableConfig, statusSearchConfig, tableDescConfig } from './config'
export default {
  name: 'MarginProcessingList',
  props: {},
  data() {
    return {
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '',
        programName: []
      },
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 状态筛选
      statusSearchConfig: statusSearchConfig.call(this),
      // 列表数据
      tableData: [],
      // 列表数据统计/描述配置
      tableDescConfig: tableDescConfig,
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),
      // 导入导出配置
      tableRightExcel: {
        exportExcel: true
      },
      // 接口请求配置
      queryConfig: {
        api: marginProcessingApi.marginProcessingList, // 接口请求方式
        dataKey: 'list', // 取请求接口后返回的某个字段作为表单数据 默认data
        deleteApi: marginProcessingApi.deleteMarginProcessing // 批量删除
      },
      // 选中的table row
      checkedData: []
    }
  },
  activated() {
    this.$refs['marginProcessingList'] && this.$refs['marginProcessingList'].getList()
  },
  methods: {
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      // 数据单独处理后returnData, 可返回data模板或者额外处理后的searchFormData
      return data
    },
    // 详情页面
    rowClick(row) {
      // 0、1驳回、草稿到编辑页面）审核中和已审核到详情
      if (row.checkStatus === 1 || row.checkStatus === 4) {
        this.$router.push({ name: 'MarginProcessingAdd', query: { id: row.id, checkStatus: row.checkStatus, oaStatus: row.oaStatus }})
      } else {
        this.$router.push({ name: 'MarginProcessingDetail', query: { id: row.id, checkStatus: row.checkStatus, oaStatus: row.oaStatus }})
      }
    },
    // 新增跳转
    addBox() {
      this.$router.push({ name: 'MarginProcessingAdd' })
    },
    // 更新列表
    updateList() {
      this.$refs.decorationEnterList.getList()
    },
    // 默认非草稿禁止删除
    deleteTable(row) {
      return row.checkStatus === 1
    }
  }
}
</script>
