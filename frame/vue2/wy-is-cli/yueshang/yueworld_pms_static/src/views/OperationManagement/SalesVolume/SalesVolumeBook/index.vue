<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-form="searchForm"
      :search-column="3"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-order-config="tableOrderConfig"
      :before-qeury-data="beforeQeuryData"
      :table-right-excel="tableRightExcel"
      persmission="demo"
      @afterQueryData="afterQueryData"
      @row-click="rowClick"
    />
  </div>
</template>

<script>
import { salesVolumeApi } from '@/api'
import { searchConfig, tableConfig, statusSearchConfig } from './config'
export default {
  name: 'SalesVolumeBook',
  data() {
    return {
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '', // 模糊查询
        programName: [], // 项目名称
        contType: '',
        month: '',
        recordStatus: ''
      },
      // 状态筛选
      statusSearchConfig: statusSearchConfig.call(this),
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 状态搜索值
      statucSearchValue: [],

      // 列表数据统计/描述配置
      // tableDescConfig: tableDescConfig,
      // 列表数据
      tableData: [],
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),

      // 接口请求配置
      queryConfig: {
        api: salesVolumeApi.salesVolumeBookList, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },

      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: false, // 继承el-table所有属性,ysn-table的属性
        showOperation: false,
        operationWidth: '200'
      },
      tableRightExcel: {
        importExcel: true,
        exportExcel: true
      },

      // 请求后的数据
      reqData: {}
    }
  },
  methods: {
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      // 数据单独处理后returnData, 可返回data模板或者额外处理后的searchFormData
      return data
    //   return data
    },
    //  数据请求后把数据返回外部
    afterQueryData(data) {
      this.reqData = data
      console.log(data)
    },
    // 列表单行点击
    rowClick(row) {
      console.log(row)
      this.$router.push({ name: 'SalesVolumeBookByDay', query: { id: row.id }})// 草稿，驳回 跳转编辑页
    },
    inputChange(val) {
      console.log(val)
    },
    /**
     * 导入
     */
    handlerImport() {
    },
    /**
     * 导出
     */
    handlerExport() {
    }
  }
}
</script>
