/*
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description:
*/
<template>
  <div class="app-page-main">
    <YsnPageContent
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-form="searchForm"
      :search-column="4"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-order-config="tableOrderConfig"
      persmission="InvoiceBreakConfig"
      :table-slots="['ruleId']"
      :before-qeury-data="beforeQeuryData"
      :hide-page="false"
      @afterQueryData="afterQueryData"
      @row-click="rowClick"
    >
      <template #ruleId="scope">
        <ysn-btn type="text">{{ scope.row.ruleId }}</ysn-btn>
      </template>
      <template #tableRight>
        <ysn-btn class="mr-8" @click="addBreakConfig">新增规则</ysn-btn>
      </template>
    </YsnPageContent>
  </div>
</template>
<script>

import { statusSearchConfig, searchConfig, tableConfig } from './config'
import { invoiceOfListApi } from '@/api'

export default {
  name: 'InvoiceBreakConfig',
  props: {},
  data() {
    return {
      // 状态筛选
      statusSearchConfig: statusSearchConfig.call(this),
      // 搜索form配置
      searchConfig: searchConfig.call(this),
      // 搜索form数据
      searchForm: {
        fuzzyEnquiry: '', // 模糊查询
        programName: [], // 所有项目
        accountName: [], // 所有账套
        levelId: [] // 级别
      },
      // 列表接口及数据回显配置
      queryConfig: {
        api: invoiceOfListApi.invoiceBreakConfigList,
        dataKey: 'invoiceBreakConfigList' // 用于渲染表格数据的标识
      },
      // 表格列的配置
      tableConfig: tableConfig.call(this),
      tableOrderConfig: {
        checkbox: false,
        showSlots: ['ruleId']

      }
    }
  },

  mounted() {},
  methods: {
    /**
     * @method addBreakConfig
     * @returns null
     * @desc 新增发票拆分规则
     */
    addBreakConfig() {
      this.$router.push({ name: 'InvoiceBreakConfigAdd' })
    },
    /**
    * @method  rowClick
    * @returns null
    * @desc 行的点击事件，点击跳转至详情页
    */
    rowClick(row) {
      this.$router.push({ name: 'InvoiceBreakConfigDetail', query: { id: row.id }})
    },
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      // 手动处理状态
      if (data.levelId.length === 0) {
        data.levelId = this.statusSearchConfig[0].list.map(item => {
          return item.value
        })
      }
      if (!data.pageNo) {
        data.pageNo = 1
      } else if (data.pageNo.pageNo) {
        data.pageNo = data.pageNo.pageNo
      }
      if (!data.pageSize) data.pageSize = 20
      return data
    },
    // 请求数据之后对返回的数据进行处理
    afterQueryData(data) {
      return data
    }
  }
}
</script>
