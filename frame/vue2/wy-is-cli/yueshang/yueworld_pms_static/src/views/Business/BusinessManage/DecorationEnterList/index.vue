<!--
 * @Author: xiaoxie
 * @LastEditors:  xiaoxie
 * @Description:进场装修列表页面
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      ref="decorationEnterList"
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-form="searchForm"
      :search-column="3"
      :delete-table="deleteTable"
      delete-message="非草稿状态下不可删除"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :before-qeury-data="beforeQeuryData"
      persmission="DecorationEnterList"
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
// 请求api
import { investmentApi } from '@/api'
import { searchConfig, tableConfig, statusSearchConfig } from './config'
export default {
  name: 'DecorationEnterList',
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
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),

      // 接口请求配置
      queryConfig: {
        api: investmentApi.decorationEnterList, // 接口请求方式
        dataKey: 'list', // 取请求接口后返回的某个字段作为表单数据 默认data
        deleteApi: investmentApi.decorationEnterDelete // 批量删除
      },
      // 选中的table row
      checkedData: []
    }
  },
  activated() {
    this.$refs['decorationEnterList'] && this.$refs['decorationEnterList'].getList()
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
        this.$router.push({ name: 'DecorationEnterAdd', query: { id: row.id }})
      } else {
        this.$router.push({ name: 'DecorationEnterDetail', query: { id: row.id }})
      }
    },
    // 新增跳转
    addBox() {
      this.$router.push({ name: 'DecorationEnterAdd' })
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
