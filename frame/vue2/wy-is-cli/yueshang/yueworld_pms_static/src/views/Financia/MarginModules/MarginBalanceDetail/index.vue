/*
 * @Author: xiaoxie
 * @Date: 2021-07-22 10:35:31
 * @Last Modified by: xiaoxie
 * @Last Modified time: 2021-08-27 13:35:52
 */
// 保证金流水
<template>
  <div class="app-page-main">
    <YsnPageContent
      ref="MarginBalanceDetail"
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-form="searchForm"
      :search-column="3"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-desc-config="tableDescConfig"
      :table-order-config="tableOrderConfig"
      :before-qeury-data="beforeQeuryData"
      :table-right-excel="tableRightExcel"
      persmission="MarginBalanceDetail"
      @row-click="rowClick"
    />
  </div>
</template>
<script>
import { marginProcessingApi } from '@/api'
import { tableConfig, searchConfig, statusSearchConfig, tableDescConfig } from './config'
export default {
  name: 'MarginBalanceDetail',
  props: {},
  data() {
    return {
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '',
        programName: []
      },
      // 列表数据统计/描述配置
      tableDescConfig: tableDescConfig,
      tableData: [],
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 状态筛选
      statusSearchConfig: statusSearchConfig.call(this),
      tableRightExcel: {
        exportExcel: true
      },
      // 接口请求配置
      queryConfig: {
        api: marginProcessingApi.marginBalanceDetail, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },
      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: false // 继承el-table所有属性,ysn-table的属性
      }
    }
  },
  activated() {
    this.$refs['marginBalanceDetail'] && this.$refs['marginBalanceDetail'].getList()
  },
  methods: {
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      // 数据单独处理后returnData, 可返回data模板或者额外处理后的searchFormData
      return data
    },
    // 详情页面
    rowClick(row) {
      if (row.srcType === 1 || row.srcType === 6) {
      // 类型为收款、反核销-收款、点击单号跳转收款核销单详情，
        this.$router.push({ name: 'VerificationDetails', query: { id: 3, status: 1, verificationTypes: 2 }})
      } else if (row.srcType === 4 || row.srcType === 7) {
        // 类型为冲抵，反核销-冲抵点击单号跳转至核销单(余额核销)详情 ，
        this.$router.push({ name: 'VerificationDetails', query: { id: 5, status: 1, verificationTypes: 1 }})
      } else if (row.srcType === 2 || row.srcType === 8) {
        // 退款、付款反核销时，点击单号跳转付款核销单详情
        this.$router.push({ name: 'PaymentVerificationFormEdit', query: { id: row.id }})
      } else if (row.srcType === 3) {
        // 为罚没时，点击单号跳转保证金处理单详情
        this.$router.push({ name: 'MarginProcessingDetail', query: { id: row.id }})
      } else {
        // 类型为转换时，点击单号跳转保证金转换单详情
        this.$router.push({ name: 'MarginConversionDetails', query: { id: row.id }})
      }
    }
  }
}
</script>
