<!--
 * @Author: zbk
 * @Date: 2021-07-26 17:36:56
 * @LastEditTime: 2021-08-10 12:04:09
 * @LastEditors: fhj
 * @Description: In User Settings Edit
 * @FilePath: \yueworld_pms_static\src\views\Financia\VoucherManagement\VoucherTemplates\index.vue
-->
// 凭证模板
<template>
  <div class="app-page-main">
    <YsnPageContent
      ref="VoucherTemplates"
      :search-config="searchConfig"
      :search-form="searchForm"
      :search-column="3"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-slots="['templateId']"
      :table-order-config="tableOrderConfig"
      :before-qeury-data="beforeQeuryData"
      persmission="VoucherTemplates"
      @row-click="rowClick"
    >
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn class="mr-12" @click="toTemplatesAdd">新增模板</ysn-btn>
      </template>
      <!-- 单号 -->
      <template #templateId="scope">
        <span class="primary-color">{{ scope.row.templateId }}</span>
      </template>
    </YsnPageContent>
  </div>
</template>
<script>
import { marginProcessingApi } from '@/api'
import { searchConfig, tableConfig } from './config'
export default {
  name: 'VoucherTemplates',
  props: {},
  data() {
    return {
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '',
        programName: [],
        levelId: [],
        ibTypeId: [],
        derateType: [],
        storeTypes: [],
        paymentTypeName: [],
        spaceEquityNature: []
      },
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),

      // 列表数据
      tableData: [],
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),

      // 接口请求配置
      queryConfig: {
        api: marginProcessingApi.voucherTemplateslist, // 接口请求方式
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
      // 数据单独处理后returnData, 可返回data模板或者额外处理后的searchFormData
      return data
    },
    // 详情
    rowClick(row) {
      // 跳转详情页
      this.$router.push({ name: 'VoucherTemplatesAdd', query: { id: 1 }})
    },
    // 更新列表
    updateList() {
      this.$refs.decorationEnterList.getList()
    },
    // 跳转至新增页面
    toTemplatesAdd() {
      this.$router.push({ name: 'VoucherTemplatesAdd' })
    }
  }
}
</script>
