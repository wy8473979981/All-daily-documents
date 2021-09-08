/*
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description:欠费平台
*/
<template>
  <div class="app-page-main">
    <YsnPageContent
      ref="DuePlatform"
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-form="searchForm"
      :search-column="3"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-desc-config="tableDescConfig"
      :table-order-config="tableOrderConfig"
      :before-qeury-data="beforeQeuryData"
      persmission="DuePlatform"
      @row-click="rowClick"
    >
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn type="primary" class="mr-8">
          <ysn-excel type="export">导出列表</ysn-excel>
        </ysn-btn>
        <ysn-btn type="primary" class="mr-8">
          <ysn-excel type="export">导出明细</ysn-excel>
        </ysn-btn>
      </template>
    </YsnPageContent>
  </div>
</template>
<script>
import { searchConfig, tableConfig, statusSearchConfig, tableDescConfig } from './config'
import { approveApi } from '@/api'
export default {
  name: 'DuePlatform',
  components: {
  },
  props: {},
  data() {
    return {
      update: 0,
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '', // 模糊搜索
        programName: [], // 全部项目
        feeName: [], // 费项
        receivableTime: '', // 生成时间
        brandFormatName: [], // 签约业态
        subStatusId: ''
      },
      // 状态筛选
      statusSearchConfig: statusSearchConfig.call(this),
      // 搜索配置 见ysn-seniorSearch
      // searchConfig: searchConfig.call(this),
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),
      // 列表数据统计/描述配置
      tableDescConfig: tableDescConfig,
      // 接口请求配置
      queryConfig: {
        api: approveApi.getDuePlatform, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },
      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: false // 继承el-table所有属性,ysn-table的属性
      },
      // 详情弹窗开关
      dialogInfo: {
        visible: false,
        record: {}// 详情数据
      },
      // 搜索配置类型
      searchConfigType: 1
    }
  },
  computed: {
    //  搜索配置 见ysn-seniorSearch
    searchConfig() {
      return searchConfig.call(this, this.searchConfigType)
    }
  },
  methods: {
    // 搜索变化
    searchChange(val) {
      this.searchConfigType = val.subStatusId
    },
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      return data
    },
    // 列表单行点击
    rowClick(row) {
      this.$router.push({ name: 'DuePlatformDetail', query: { id: row.id, subStatusId: this.searchForm.subStatusId, contNo: row.contNo }})
    },
    // 数据请求后把数据返回外部
    afterQueryData(data) {
      return data
    }
  }
}
</script>

