/*
 * @Author: xiaoxie
 * @Date: 2021-07-22 09:58:08
 * @Last Modified by: xiaoxie
 * @Last Modified time: 2021-09-06 13:02:26
 */
//  保证金余额
<template>
  <div class="app-page-main">
    <YsnPageContent
      ref="MarginBalanceList"
      :search-config="searchConfig"
      :search-form="searchForm"
      :search-column="3"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-desc-config="tableDescConfig"
      :table-order-config="tableOrderConfig"
      :before-qeury-data="beforeQeuryData"
      :table-right-excel="tableRightExcel"
      persmission="MarginBalanceList"
      @row-click="rowClick"
    />
  </div>
</template>
<script>
import { marginProcessingApi } from '@/api'
import { searchConfig, tableConfig, tableDescConfig } from './config'
export default {
  name: 'MarginBalanceList',
  props: {},
  data() {
    return {
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '',
        programName: [],
        feeName: []

      },
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 列表数据
      tableData: [],
      // 列表数据统计/描述配置
      tableDescConfig: tableDescConfig,
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),
      // 导入导出配置
      tableRightExcel: {
        importExcel: true,
        exportExcel: true
      },
      // 接口请求配置
      queryConfig: {
        api: marginProcessingApi.marginBalanceList, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },
      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: false // 继承el-table所有属性,ysn-table的属性
      }
    }
  },
  activated() {
    this.$refs['marginBalanceList'] && this.$refs['marginBalanceList'].getList()
  },
  methods: {
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      // 数据单独处理后returnData, 可返回data模板或者额外处理后的searchFormData
      return data
    },
    // 详情页面
    rowClick(row) {
      this.$router.push({ name: 'MarginBalanceDetail', query: { id: row.id }})
    }
  }
}
</script>
