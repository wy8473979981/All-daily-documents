<!--
 * @Author: sdy
 * @LastEditors: sdy
 * @Description:处理单列表
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-form="searchForm"
      :search-column="3"
      :query-config="queryConfig"
      :table-order-config="tableOrderConfig"
      :table-desc-configs="tableDescConfig"
      :table-config="tableConfig"
      :before-qeury-data="beforeQeuryData"
      @afterQueryData="afterQueryData"
      @row-click="rowClick"
      @getChooseData="getChooseData"
    >
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn @click="addBox">新增处理单</ysn-btn>
      </template>
    </YsnPageContent>
  </div>
</template>
<script>
// 请求api
import { processingApi } from '@/api'
import { searchConfig, tableConfig, tableDescConfig, statusSearchConfig } from './config'
export default {
  name: 'ProcessingList',
  props: {},
  data() {
    return {
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '', // 模糊查询
        auditStatus: '', // 审核状态
        programName: [], // 项目
        decorateEndDates: [], // 合同结束日
        dealType: '' // 处理类型
      },
      // 状态筛选
      statusSearchConfig: statusSearchConfig.call(this),
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 状态搜索值
      statucSearchValue: [],

      // 列表数据统计/描述配置
      tableDescConfig: tableDescConfig.call(this),
      // 列表数据
      tableData: [],
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),

      // 接口请求配置
      queryConfig: {
        api: processingApi.processing, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },

      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: true // 继承el-table所有属性,ysn-table的属性
      },
      // 请求后的数据
      reqData: {}
    }
  },
  methods: {
    // 列表筛选返回数据 处理左侧描述金额
    getChooseData(e) {
      this.tableDescConfig[0].value = 0
      e.map(i => {
        this.tableDescConfig[0].value += Number(i.dealAmount)
      })
    },
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      //   // 数据单独处理后returnData, 可返回data模板或者额外处理后的searchFormData
      data.contBeginDate = data.decorateEndDates[0]
      data.contEndDate = data.decorateEndDates[1]
      return data
    },
    //  数据请求后把数据返回外部
    afterQueryData(data) {
      this.reqData = data
    },
    // 详情页面
    rowClick(row) {
      // 2、驳回、草稿到编辑页面审核中和已审核到详情
      if (row.id === 1 || row.id === 5 || row.id === 3 || row.id === 7) {
        this.$router.push({ name: 'ProcessingDetail', query: { id: row.id }})
      } else {
        this.$router.push({ name: 'ProcessingAdd', query: { id: row.id }})
      }
    },
    // 新增跳转
    addBox() {
      this.$router.push({ name: 'ProcessingAdd' })
    }
  }
}
</script>
