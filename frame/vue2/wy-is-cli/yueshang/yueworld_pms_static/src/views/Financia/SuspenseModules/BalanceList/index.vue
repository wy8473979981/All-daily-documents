<!--
 * @Author: sdy
 * @LastEditors: sdy
 * @Description:余额查询列表
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-column="3"
      :search-form="searchForm"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-order-config="tableOrderConfig"
      :table-desc-configs="tableDescConfig"
      :before-qeury-data="beforeQeuryData"
      @row-click="rowClick"
      @afterQueryData="afterQueryData"
      @getChooseData="getChooseData"
    >
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn class="mr-12">
          <ysn-excel type="export">导出</ysn-excel>
        </ysn-btn>
      </template>
      <!--  -->
    </YsnPageContent>
  </div>
</template>
<script>
// 请求api
import { processingApi } from '@/api'
import { searchConfig, tableConfig, statusSearchConfig, tableDescConfig } from './config'
export default {
  name: 'BalanceList',
  props: {},
  data() {
    return {
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '', // 模糊搜索
        programName: [], // 项目名称
        feeName: [], // 所有费项
        accountName: []// 收款单位
      },
      // 状态筛选
      statusSearchConfig: statusSearchConfig.call(this),
      // 列表数据统计/描述配置
      tableDescConfig: tableDescConfig.call(this),
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),
      // 接口请求配置
      queryConfig: {
        api: processingApi.balanceList, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },

      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: false // 继承el-table所有属性,ysn-table的属性
      }
    }
  },
  methods: {
    // 列表筛选返回数据 处理左侧描述金额
    getChooseData(e) {
      this.tableDescConfig[0].value = 0
      this.tableDescConfig[1].value = 0
      e.map(i => {
        this.tableDescConfig[0].value += Number(i.summaryProvisionalReceivables / 10000)
        this.tableDescConfig[1].value += Number(i.temporaryReceiptsBalance / 10000)
      })
    },
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      return data
    },
    // 列表单行点击
    rowClick(row) {
      this.$router.push({ name: 'BalanceDetail', query: { id: row.id }})
    },
    // 数据请求后把数据返回外部
    afterQueryData(data) {
      const list = data.list
      list.forEach(item => {
        item.accountName = item.accountName + '/' + item.bankName + '/' + item.bankAccount
      })
      return data
    }
  }
}
</script>
