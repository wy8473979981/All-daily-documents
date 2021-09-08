<!--
 * @Author: xiaoxie
 * @LastEditors: fhj
 * @Description:计租方案列表页面
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-form="searchForm"
      :search-column="3"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :before-qeury-data="beforeQeuryData"
      :table-order-config="tableOrderConfig"
      persmission="GroupingSchemeList"
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
  name: 'GroupingSchemeList',
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
        api: investmentApi.groupingSchemeList, // 接口请求方式
        // deleteApi: investmentApi.approveDeleteList, // 删除请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },
      tableOrderConfig: {
        checkbox: false // 继承el-table所有属性,ysn-table的属性
      }
    }
  },

  mounted() {
  },
  methods: {
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      // 数据单独处理后returnData, 可返回data模板或者额外处理后的searchFormData
      return data
    },
    // 新增跳转
    addBox() {
      this.$router.push({ name: 'GroupingSchemeListAdd' })// 新增页面
    },
    // 详情页面
    rowClick(row) {
      this.$router.push({ name: 'GroupingSchemeListAdd', query: { id: row.id }})
    }
  }
}
</script>

