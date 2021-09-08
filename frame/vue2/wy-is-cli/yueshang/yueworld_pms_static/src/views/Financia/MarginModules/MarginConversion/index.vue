<!--
 * @Author: xza
 * @LastEditors: Please set LastEditors
 * @Description: 保证金转换单
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-column="3"
      :search-form="searchForm"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-order-config="tableOrderConfig"
      :table-desc-configs="tableDescConfig"
      :delete-table="deleteTable"
      delete-message=""
      persmission="MarginConversion"
      :before-qeury-data="beforeQeuryData"
      @row-click="rowClick"
      @afterQueryData="afterQueryData"
      @getChooseData="getChooseData"
    >
      <!-- <template #conversionNo="scope">
              :table-slots="['conversionNo']"
        <a class="lineColor">{{ scope.row.conversionNo }}</a>
      </template> -->
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn class="mr-8 ml-8" @click="toAdd">新增</ysn-btn>
      </template>
      <!--  -->
    </YsnPageContent>
  </div>
</template>
<script>
import { searchConfig, tableConfig, statusSearchConfig, tableDescConfig, searchForm, queryConfig, tableOrderConfig } from './config'
export default {
  name: 'MarginConversion',
  props: {},
  data() {
    return {
      update: 0,
      // 搜索form
      searchForm: searchForm.call(this),
      // 新增编辑会话框
      dialogAdd: {
        visible: false,
        record: {},
        isEdit: false
      },
      // 状态筛选
      statusSearchConfig: statusSearchConfig.call(this),
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),
      // 列表数据统计/描述配置
      tableDescConfig: tableDescConfig.call(this),
      // 接口请求配置
      queryConfig: queryConfig.call(this),
      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: tableOrderConfig.call(this)
    }
  },
  methods: {
    /**
     * @description: 列表筛选返回数据 处理左侧描述金额
     * @param {*} e
     * @return {*}
     */
    getChooseData(e) {
      this.tableDescConfig[0].value = 0
      e.map(i => {
        this.tableDescConfig[0].value += Number(i.amount / 10000)
      })
    },
    /**
     * @description: 列表数据请求之前数据处理
     * @param {*} data
     * @return {*}
     */
    beforeQeuryData(data) {
      // data.contBeginDate = data.ConversionDate[0]
      // data.contEndDate = data.ConversionDate[1]
      return data
    },
    /**
     * @description: 列表单行点击
     * @param {*} record
     * @return {*}
     */
    rowClick(record) {
      if (record.status === 1) {
        this.$router.push({ name: 'MarginConversionAdd', query: { id: record.id }})
      } else {
        this.$router.push({ name: 'MarginConversionDetails', query: { id: record.id, OA: record.OA }})
      }
    },
    /**
     * @description: 数据请求后把数据返回外部
     * @param {*} data
     * @return {*}
     */
    afterQueryData(data) {
      return data
    },
    /**
     * @description: 科目关系跳转
     * @param {*}
     * @return {*}
     */
    toSubjectFee() {
      this.$router.push({ name: 'SubjectRelation' })// 费用项-科目关系
    },
    /**
     * @description: 跳转新增
     * @param {*}
     * @return {*}
     */
    toAdd() {
      this.$router.push({ name: 'MarginConversionAdd' })
    },
    /**
     * @description: 默认非草稿禁止删除
     * @param {*} row
     * @return {*}
     */
    deleteTable(row) {
      return row.checkStatusId === 1
    }
  }
}
</script>
<style>
  .lineColor {
    color: #468CEB;
  }
</style>
