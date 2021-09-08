<!--
 * @Author: sdy
 * @LastEditors: sdy
 * @Description:转换单列表
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
        <ysn-btn @click="addBox">新增转换单</ysn-btn>
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
        programName: [], // 项目名称
        createTime: '', // 转换日期
        feeName: [], // 费项
        intoTenantName: '', // 转入商家
        creator: '' // 创建人
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
        api: processingApi.conversion, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },

      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: true // 继承el-table所有属性,ysn-table的属性
      }
    }
  },
  methods: {
    getChooseData(e) {
      this.tableDescConfig[0].value = 0
      e.map(i => {
        this.tableDescConfig[0].value += Number(i.conversionAmount)
      })
    },
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      return data
    },
    //  数据请求后把数据返回外部
    afterQueryData(data) {
      this.reqData = data
    },
    // 详情页面
    rowClick(row) {
      // 2、驳回、草稿到编辑页面审核中和已审核到详情
      if (row.id === 6 || row.id === 7 || row.id === 2 || row.id === 3) {
        this.$router.push({ name: 'ConversionDetail', query: { id: row.id }})
      } else {
        this.$router.push({ name: 'ConversionAdd', query: { id: row.id }})
      }
    },
    // 新增跳转
    addBox() {
      this.$router.push({ name: 'ConversionAdd' })
    }
  }
}
</script>
