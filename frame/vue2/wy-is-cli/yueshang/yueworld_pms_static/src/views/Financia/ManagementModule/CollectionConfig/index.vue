<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description:核销配置列表页
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-form="searchForm"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-order-config="tableOrderConfig"
      :before-qeury-data="beforeQeuryData"
      @row-click="rowClick"
      @afterQueryData="afterQueryData"
    >
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn @click="addBox">新增方案</ysn-btn>
      </template>
    </YsnPageContent>
  </div>
</template>

<script>
import { searchConfig, tableConfig, statusSearchConfig } from './config'
import { collectionList } from '@/api'

export default {
  name: 'CollectionConfig',
  data() {
    return {
      // 列表数据
      tableData: [],
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '', // 模糊查询
        ruleId: '', // 方案编号
        programName: '' // 项目名称
      },
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 状态筛选
      statusSearchConfig: statusSearchConfig.call(this),
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),
      // 接口请求配置
      queryConfig: {
        api: collectionList.collectionConfig, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },
      // ysn-table额外配置 用于打开填入checkbeox等
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
    //  数据请求后把数据返回外部
    afterQueryData(data) {
      return data
    },
    // 新增跳转
    addBox() {
      this.$router.push({ name: 'CollectionConfigAdd' })
    },
    // 点击每行数据后
    rowClick(row) {
      // 跳转编辑页
      this.$router.push({ name: 'CollectionConfigAdd', query: { id: row.id }})
    }
  }
}
</script>
