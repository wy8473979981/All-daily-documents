<!--
 * @Author: sdy
 * @LastEditors: sdy
 * @Description:余额查询暂收款流水
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
      :table-desc-config="tableDescConfig"
      :before-qeury-data="beforeQeuryData"
      :has-table-config="false"
      :table-slots="['documentNumber']"
      @row-click="rowClick"
    >
      <template #documentNumber="scope">
        <ysn-btn type="text">{{ scope.row.documentNumber }}</ysn-btn>
      </template>
    </YsnPageContent>
  </div>
</template>

<script>
import { processingApi } from '@/api'
import { searchConfig, tableConfig, statusSearchConfig, tableDescConfig } from './config'
export default {
  name: 'BalanceDetail',
  props: {},
  data() {
    return {
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '', // 模糊搜索
        generationTime: '' // 生成时间
      },
      // 状态筛选
      statusSearchConfig: statusSearchConfig.call(this),
      // 列表数据统计/描述配置
      tableDescConfig: tableDescConfig,
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),
      // 接口请求配置
      queryConfig: {
        api: processingApi.balanceDetails, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },
      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: false // 继承el-table所有属性,ysn-table的属性
      }
    }
  },
  methods: {
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      return data
    },
    rowClick(row) {
      // 类型为收款、反核销-收款跳转收款核销单详情
      if (row.id === 1 || row.id === 6) {
        this.$router.push({ name: 'VerificationDetails', query: { id: 3, status: 1, verificationTypes: 2 }})
      // 类型为冲抵，反核销-冲抵跳转至核销单(余额核销)详情
      } else if (row.id === 4 || row.id === 7) {
        this.$router.push({ name: 'VerificationDetails', query: { id: 5, status: 1, verificationTypes: 1 }})
        // 类型为退款、付款反核销时  跳转付款核销单详情
      } else if (row.id === 2 || row.id === 8) {
        this.$router.push({ name: 'PaymentVerificationFormEdit', query: { id: row.id }})
        // 类型为罚没时，跳转暂收款处理单详情
      } else if (row.id === 3) {
        this.$router.push({ name: 'ProcessingDetail', query: { id: 5 }})
        // 类型为转换时，跳转暂收款转换单详情
      } else if (row.id === 5) {
        this.$router.push({ name: 'ConversionDetail', query: { id: 7 }})
      }
    }
  }
}
</script>
