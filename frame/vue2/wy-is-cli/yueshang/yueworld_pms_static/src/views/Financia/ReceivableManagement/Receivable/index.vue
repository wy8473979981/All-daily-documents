
/*
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description:应收账单
*/

<template>
  <div class="app-page-main">
    <YsnPageContent
      :search-config="searchConfig"
      :search-form="searchForm"
      :search-column="3"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :before-qeury-data="beforeQeuryData"
      persmission="Receivable"
      @onSelect="tableSelect"
      @row-click="rowClick"
    >
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn class="mr-12" @click="toHistory">打印历史记录</ysn-btn>
        <ysn-btn class="mr-12">
          <a href="#/Financia/ReceivableManagement/Receivable" target="blank/">
            打印账单
          </a>
        </ysn-btn>
        <ysn-btn class="mr-12" type="info">
          <ysn-excel type="export">导出</ysn-excel>
        </ysn-btn>
      </template>
    </YsnPageContent>
  </div>
</template>

<script>
import { searchConfig, tableConfig } from './config'
import { processingApi } from '@/api'

export default {
  name: 'Receivable',
  data() {
    return {
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '', // 模糊查询
        programName: [], // 项目名称
        feeName: [], // 费项
        generateTime: '', // 起止时间
        contType: '', // 合同类型
        isPrintBill: '', // 是否打印
        billNo: '' // 账单编号
      },
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),
      // 接口请求配置
      queryConfig: {
        api: processingApi.receivable, // 接口请求方式
        dataKey: 'list', // 取请求接口后返回的某个字段作为表单数据 默认data
        deleteApi: processingApi.receivable
      },
      selectList: []// 选中数据
    }
  },
  methods: {
    // 历史账单
    toHistory() {
      if (!this.selectList || this.selectList.length === 0) {
        this.$message.error('请先勾选记录')
        return
      }
      this.$router.push({ name: 'ReceivableHistory' })
    },
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      return data
    },
    // 列表单行点击
    rowClick(row) {
      this.$router.push({ name: 'ReceivableDetail', query: { id: row.id }})
    },
    // 多选事件
    tableSelect(list) {
      this.selectList = list
    }
  }
}
</script>

<style scoped>

</style>
