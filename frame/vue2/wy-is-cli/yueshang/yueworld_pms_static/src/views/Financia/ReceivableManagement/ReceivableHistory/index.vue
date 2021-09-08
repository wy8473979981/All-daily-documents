<!--
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description:应收账单详情
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      ref="ReceivableHistory"
      :search-config="searchConfig"
      :search-form="searchForm"
      :search-column="3"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-slots="['caozuo']"
      :has-table-config="false"
      :table-order-config="tableOrderConfig"
      :before-qeury-data="beforeQeuryData"
      persmission="ReceivableHistory"
    >
      <template #caozuo>
        <ysn-btn type="text">
          <a href="#/Financia/ReceivableManagement/ReceivableHistory" target="blank/">
            查看账单
          </a>
        </ysn-btn>
      </template>
    </YsnPageContent>
  </div>
</template>

<script>
import { searchConfig, tableConfig } from './config'

import { approveApi } from '@/api'
export default {
  name: 'ReceivableHistory',
  props: {},
  data() {
    return {
      update: 0,
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '', // 模糊搜索
        programName: [], // 全部项目
        receivableTime: '' // 生成时间
      },
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),
      // 接口请求配置
      queryConfig: {
        api: approveApi.getReceivableHistory, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },
      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: false, // 继承el-table所有属性,ysn-table的属性
        showSlots: ['caozuo']
      }

    }
  },
  methods: {
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      return data
    },
    // 数据请求后把数据返回外部
    afterQueryData(data) {
      return data
    }
  }
}
</script>
