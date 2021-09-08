<!--
 * @Author: wyz
 * @LastEditors: wyz
 * @Description:撤场清算
-->

<template>
  <div class="app-page-main">
    <YsnPageContent
      :status-search-config="auditStatusSearchConfig"
      :search-config="searchConfig"
      :search-form="searchForm"
      :search-column="3"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-order-config="tableOrderConfig"
      :before-qeury-data="beforeQueryData"
      persmission="Withdraw"
      @row-click="rowClick"
    >
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn class="mr-12" @click="addBox">新增</ysn-btn>
      </template>
    </YsnPageContent>
  </div>
</template>

<script>
import { searchConfig, tableConfig, auditStatusSearchConfig } from './config'
import { withdrawApi } from '@/api'

export default {
  name: 'Withdraw',
  data() {
    return {
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '', // 模糊查询
        programName: [], // 项目名称
        auditStatus: [], // 审核状态
        realEedDates: ['', ''], // 清算日期
        realEedStartDate: '', // 清算日期开始
        realEedEndDate: '' // 清算日期结束
      },
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 状态筛选
      auditStatusSearchConfig: auditStatusSearchConfig.call(this),
      // 列表数据
      tableData: [],
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),
      // 接口请求配置
      queryConfig: {
        api: withdrawApi.withdrawList, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },
      // ysn-table额外配置 用于打开checkb填入eox等
      tableOrderConfig: {
        checkbox: false // 继承el-table所有属性,ysn-table的属性
      },
      // 审核状态
      auditStatus: ''
    }
  },
  methods: {
    // 列表数据请求之前数据处理
    beforeQueryData(data) {
      // 数据单独处理后returnData, 可返回data模板或者额外处理后的searchFormData
      data.realEedStartDate = data.realEedDates[0]
      data.realEedEndDate = data.realEedDates[1]
      return data
    },
    // 行点击详情页面或编辑页面
    rowClick(row) {
      const that = this
      const audiStatusList = this.$PUBFN.getOptionsList('auditStatus') // 获取审核状态列表
      audiStatusList.forEach(ele => {
        if (row.auditStatus === ele.label) {
          that.auditStatus = ele.value
        }
      })
      // 根据审核状态判断跳转详情页还是编辑页   0-草稿  4-已驳回  2-审核中  3-已审核
      if (that.auditStatus === 0 || that.auditStatus === 4) {
        this.$router.push({ name: 'WithdrawAdd', query: { id: row.id }})// 草稿，驳回 跳转编辑页
      } else {
        this.$router.push({ name: 'WithdrawDetail', query: { id: row.id }})// 审核中，已审核 跳转详情页
      }
    },
    // 新增跳转
    addBox() {
      this.$router.push({ name: 'WithdrawAdd' })
    },
    statusChange(statusList) {
      this.$emit('checks', statusList, 1)
    }
  }
}
</script>

<style scoped>

</style>
