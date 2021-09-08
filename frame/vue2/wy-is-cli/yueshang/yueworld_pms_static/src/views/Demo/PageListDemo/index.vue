<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:列表demo页面
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-form="searchForm"
      :table-right-excel="{ importExcel: true, exportExcel: true }"
      :search-column="3"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-order-config="tableOrderConfig"
      :table-desc-config="tableDescConfig"
      :before-qeury-data="beforeQeuryData"
      persmission="demo"
      @afterQueryData="afterQueryData"
      @row-click="rowClick"
    >
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn>新增发票</ysn-btn>
      </template>

      <!-- 列表操作列插槽 -->
      <template #default>
        <p>我是列表操作插槽</p>
      </template>
    </YsnPageContent>
  </div>
</template>
<script>
// 请求api
import { testApi } from '@/api'
import {
  searchConfig,
  tableConfig,
  dataTmp,
  tableDescConfig,
  statusSearchConfig
} from './config'
export default {
  name: 'PageListDemo',
  props: {},
  data() {
    return {
      // 搜索form
      searchForm: {
        s1: '',
        s2: '',
        s3: '',
        s4: ''
      },
      // 状态筛选
      statusSearchConfig: statusSearchConfig.call(this),
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 状态搜索值
      statucSearchValue: [],

      // 列表数据统计/描述配置
      tableDescConfig: tableDescConfig,
      // 列表数据
      tableData: [],
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),

      // 接口请求配置
      queryConfig: {
        api: testApi.getList, // 接口请求方式
        dataKey: 'data', // 取请求接口后返回的某个字段作为表单数据 默认data
        deleteApi: testApi.getList // 接口请求方式
      },

      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: false, // 继承el-table所有属性,ysn-table的属性
        showOperation: true,
        operationWidth: '200',
        highlightCurrentRow: true
      },

      // 请求后的数据
      reqData: {}
    }
  },
  methods: {
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      console.log('请求之前数据处理', data)
      // 数据单独处理后returnData, 可返回data模板或者额外处理后的searchFormData
      return dataTmp
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
    },
    inputChange(val) {
      console.log(val)
    }
  }
}
</script>
