<!--
 * @Author: zsj
 * @Date: 2021-07-03 13:31:33
 * @LastEditTime: 2021-08-07 11:18:48
 * @LastEditors: xueyx
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
      persmission="EntertainOfList"
      :table-slots="['spaceStatus']"
      @afterQueryData="afterQueryData"
      @row-click="rowClick"
    >
      <template #spaceStatus="scope">
        <ysn-btn type="text">{{ scope.row.spaceStatus }}</ysn-btn>
      </template>
    </YsnPageContent>
  </div>
</template>
<script>
// 请求api
import { entertainOfListApi } from '@/api'
import { searchConfig, tableConfig, statusSearchConfig } from './config'
export default {
  name: 'EntertainOfList',
  props: {},
  data() {
    return {
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '', // 模糊查询
        programName: [], // 项目
        buildingName: '', // 楼栋编码
        floorName: '' // 楼层编码
      },
      // 状态筛选
      statusSearchConfig: statusSearchConfig.call(this),
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 状态搜索值
      statucSearchValue: [],

      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),

      // 接口请求配置
      queryConfig: {
        api: entertainOfListApi.entertainOfList, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },
      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: false, // 继承el-table所有属性,ysn-table的属性
        showSlots: ['spaceStatus']
      }
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
      return data
    },
    // 项目选择清除楼栋和楼层
    proName() {
      if (this.searchForm.programName.length > 1) {
        this.searchForm.buildingId = ''
        this.searchForm.floorId = ''
      }
    },
    // 进入详情
    rowClick(row) {
      if (row.id === 4) { // 如果是空铺禁止跳转
        return
      }
      this.$router.push({ name: 'EntertainDetail', query: { id: row.id }})
    }
  }
}
</script>
