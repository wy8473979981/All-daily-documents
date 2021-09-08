<!--
 * @Author: wyz
 * @LastEditors: fhj
 * @Description:合同台账
-->

<template>
  <div class="app-page-main">
    <YsnPageContent
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-form="searchForm"
      :table-desc-config="tableDescConfig"
      :search-column="2"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-order-config="tableOrderConfig"
      :before-qeury-data="beforeQueryData"
      persmission="StandingBook"
      :table-right-excel="{ exportExcel: true}"
      @row-click="rowClick"
      @afterQueryData="afterQueryData"
    />
  </div>
</template>

<script>
import { searchConfig, tableConfig, statusSearchConfig, tableDescConfig } from './config'
import { standingBookApi } from '@/api'

export default {
  name: 'StandingBook',
  data() {
    return {
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '', // 模糊查询
        contractStates: [], // 合同状态
        contType: [], // 合同类型
        contNature: [], // 合同性质
        programName: [], // 项目名称
        brandFormatName: '', // 签约业态
        leasAreaStart: '', // 租赁面积起始
        leasAreaEnd: '', // 租赁面积终止
        contractExpirationDay: '', // 合同到期天数
        contBeginDates: [], // 合同开始日期数组
        contEndDates: [], // 合同结束日期数组
        contBeginStartDate: '', // 合同起始日期开始
        contBeginEndDate: '', // 合同起始日期终止
        contEndStartDate: '', // 合同结束日期开始
        contEndEndDate: '' // 合同结束日期终止
      },
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 状态筛选
      statusSearchConfig: statusSearchConfig.call(this),
      // 列表数据
      tableData: [],
      // 列表数据统计/描述配置
      tableDescConfig: tableDescConfig,
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),
      // 接口请求配置
      queryConfig: {
        api: standingBookApi.standingBookList, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },
      // ysn-table额外配置 用于打开checkb填入eox等
      tableOrderConfig: {
        checkbox: false // 继承el-table所有属性,ysn-table的属性
      },
      // 合同状态
      contractStatus: ''
    }
  },
  methods: {
    // 列表数据请求之前数据处理
    beforeQueryData(data) {
      // 数据单独处理后returnData, 可返回data模板或者额外处理后的searchFormData
      data.contBeginStartDate = data.contBeginDates[0]
      data.contBeginEndDate = data.contBeginDates[1]
      data.contEndStartDate = data.contEndDates[0]
      data.contEndEndDate = data.contEndDates[1]
      return data
    },
    //  数据请求后把数据返回外部
    afterQueryData(data) {
      return data
    },
    // 行点击详情页面或编辑页面
    rowClick(row) {
      this.$router.push({ name: 'StandingBookDetail', query: { id: row.id, contractStates: row.contractStates, createdDate: row.createdDate, contNo: row.contNo }})// 跳转详情页
    },
    statesChange(statusList) {
      this.$emit('checks', statusList, 1)
    },
    typeChange(statusList) {
      this.$emit('checks', statusList, 2)
    },
    natureChange(statusList) {
      this.$emit('checks', statusList, 3)
    },
    // 导出表单
    exportTable() {
      console.log('导出表单')
    },
    // 项目选择
    proName() {
      if (this.searchForm.programName !== '') {
        this.searchForm.buildingId = ''
        this.searchForm.floorId = ''
      }
    }
  }
}
</script>

<style scoped>

</style>
