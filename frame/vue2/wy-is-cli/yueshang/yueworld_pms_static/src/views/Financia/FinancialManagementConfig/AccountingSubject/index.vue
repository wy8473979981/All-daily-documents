<!--
 * @Author: xza
 * @Date: 2021-08-02 17:33:13
 * @LastEditTime: 2021-08-17 09:39:46
 * @LastEditors: xza
 * @Description: 会计科目
 * @FilePath: /baolong/src/views/Financia/FinancialManagementConfig/AccountingSubject/index.vue
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      ref="AccountingSubject"
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-column="3"
      :search-form="searchForm"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-order-config="tableOrderConfig"
      persmission="AccountingSubject"
      :before-qeury-data="beforeQeuryData"
      :handle-after-query-data="handleAfterQueryData"
      @row-click="rowClick"
    >
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn>同步科目</ysn-btn>
        <ysn-btn class="mr-8 ml-8" @click="Object.assign(dialogAdd, { visible: true, record: {}, isEdit: false })">新增</ysn-btn>
        <ysn-btn class="mr-8" type="info">
          <ysn-excel type="import">导入</ysn-excel>
        </ysn-btn>
        <ysn-btn type="reset">
          <ysn-excel type="export">导出</ysn-excel>
        </ysn-btn>
      </template>
      <!--  -->
    </YsnPageContent>
    <!-- 新增弹窗 -->
    <DialogFormAdd
      :is-show-dialog="dialogAdd.visible"
      :info="dialogAdd.record"
      :is-edit="dialogAdd.isEdit"
      @closeDialog="Object.assign(dialogAdd, { visible: false, record: {} })"
      @successTableList="successTableList"
      @remove="remove"
    />
  </div>
</template>
<script>
// 请求api
import { searchConfig, tableConfig, statusSearchConfig, searchForm, tableOrderConfig, queryConfig } from './config'
import DialogFormAdd from './blocks/dialogFormAdd.vue'
export default {
  name: 'AccountingSubject',
  components: {
    DialogFormAdd
  },
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
      // 接口请求配置
      queryConfig: queryConfig.call(this),
      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: tableOrderConfig.call(this)
    }
  },
  methods: {
    /**
     * @description: 列表数据请求参数处理
     * @param {*} data
     * @return {*}
     */
    beforeQeuryData(data) {
      return data
    },
    /**
     * @description: 列表页单行点击
     * @param {*} record
     * @return {*}
     */
    rowClick(record) {
      Object.assign(this.dialogAdd, { visible: true, record, isEdit: true })
    },
    /**
     * @description: 请求数据处理
     * @param {*}
     * @return {*}
     */
    handleAfterQueryData(data) {
      // 处理树数据
      return data
    },
    /**
     * @description: 列表刷新
     * @param {*}
     * @return {*}
     */
    async successTableList() {
      await this.$refs.AccountingSubject.getList()
      await this.update++
    },
    /**
     * @description: 弹窗删除调用
     * @param {*}
     * @return {*}
     */
    remove() {
      Object.assign(this.dialogAdd, { visible: false, record: {}})
      this.successTableList()
    }
  }
}
</script>
