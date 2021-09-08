<!--
 * @Author: shuyuan
 * @LastEditors: fhj
 * @Description:车流数据填报
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      :key="updateNum"
      :search-config="searchConfig"
      :search-form="searchForm"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-order-config="tableOrderConfig"
      :before-qeury-data="beforeQeuryData"
      persmission="demo"
      @afterQueryData="afterQueryData"
      @row-click="rowClick"
    >
      <!-- 列表操作功能  -->
      <template #tableRight>
        <ysn-btn class="mr-16">导入</ysn-btn>
        <ysn-btn type="reset">导出</ysn-btn>
      </template>

    </YsnPageContent>
    <calendar-filling v-if="dialogAddVisible" :form-data="formData" :is-show-dialog="dialogAddVisible" @closeDialog="closeDialog" />
  </div>
</template>

<script>
import {
  trafficFlowApi
} from '@/api'
import {
  searchConfig,
  tableConfig
} from './config'
import calendarFilling from './blocks/CalendarFilling'
export default {
  name: 'PassengerFlowBook',
  components: {
    calendarFilling
  },
  data() {
    return {
      dialogAddVisible: false, // 车流填报弹窗
      // 搜索form
      searchForm: {
	    programName: [] // 项目名称
      },
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),

      // 接口请求配置
      queryConfig: {
        api: trafficFlowApi.trafficFlowDataList, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },

      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: false, // 继承el-table所有属性,ysn-table的属性
        showOperation: false,
        operationWidth: '200'
      },

      // 请求后的数据
      reqData: {},
      formData: {},
	  updateNum: 0
    }
  },
  methods: {
    closeDialog() {
      console.log('关闭弹窗')
      this.dialogAddVisible = false
      this.updateNum++
    },
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
      this.formData = row
      this.dialogAddVisible = true
    }
  }
}
</script>
