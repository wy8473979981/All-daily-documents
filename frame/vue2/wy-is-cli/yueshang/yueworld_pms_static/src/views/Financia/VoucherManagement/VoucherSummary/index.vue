<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
/*
 * @Author: xiaoxie
 * @Date: 2021-07-22 16:17:07
 * @Last Modified by: xiaoxie
 * @Last Modified time: 2021-07-28 12:00:36
 */
// 凭证汇总
<template>
  <div class="app-page-main">
    <YsnPageContent
      ref="VoucherSummary"
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-form="searchForm"
      :search-column="4"
      :table-slots="['voucherId']"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :before-qeury-data="beforeQeuryData"
      persmission="VoucherSummary"
      :table-right-excel="tableRightExcel"
      @row-click="rowClick"
      @onSelect="onSelect"
    >
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn class="mr-12" @click="tipBox()">上传凭证</ysn-btn>
        <ysn-btn class="mr-12" @click="tipBox()">合并凭证</ysn-btn>
        <ysn-btn class="mr-12" type="danger">红冲凭证</ysn-btn>
      </template>
      <!-- 单号 -->
      <template #voucherId="scope">
        <span class="primary-color">{{ scope.row.voucherId }}</span>
      </template>
    </YsnPageContent>
  </div>
</template>
<script>
import { marginProcessingApi } from '@/api'
import { searchConfig, tableConfig, statusSearchConfig } from './config'
export default {
  name: 'VoucherSummary',
  props: {},
  data() {
    return {
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '',
        programName: [],
        accountName: [],
        ibTypeId: []
      },
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 状态筛选
      statusSearchConfig: statusSearchConfig.call(this),
      // 列表数据
      tableData: [],
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),
      // 导入导出配置
      tableRightExcel: {
        exportExcel: true
      },
      // 接口请求配置
      queryConfig: {
        api: marginProcessingApi.voucherSummaryList, // 接口请求方式
        dataKey: 'list', // 取请求接口后返回的某个字段作为表单数据 默认data
        deleteApi: marginProcessingApi.deleteVoucherSummary
      },
      // 选中的table row
      checkedData: []
    }
  },
  methods: {
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      // 数据单独处理后returnData, 可返回data模板或者额外处理后的searchFormData
      return data
    },
    // 详情
    rowClick(row) {
      if (row.status === 1 || row.status === 3) {
        this.$router.push({ name: 'VoucherSummaryEdit', query: { id: row.id, status: row.status }})
      } else {
        this.$router.push({ name: 'VoucherSummaryDetail', query: { id: row.id, status: row.status }})
      }
    },
    // 选中的checkbox
    onSelect(value) {
      this.checkedData = value
    },
    tipBox() {
      if (this.checkedData.length > 0) {
        this.$message({ message: '凭证成功！', type: 'success' })
        this.updateList()
      } else {
        this.$message({ message: '请先勾选需要生成凭证的数据。', type: 'error' })
      }
    },
    // 更新列表
    updateList() {
      this.$refs.VoucherSummary.getList()
    }
  }
}
</script>
