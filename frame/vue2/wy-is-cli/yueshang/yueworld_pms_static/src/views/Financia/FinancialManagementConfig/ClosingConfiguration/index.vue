<!--
 * @Author: xza
 * @LastEditors: xza
 * @Description: 关账配置
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      :has-table-config="false"
      :search-config="searchConfig"
      :hide-page="false"
      :search-column="3"
      :search-form="searchForm"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-order-config="tableOrderConfig"
      persmission="ClosingConfiguration"
      :before-qeury-data="beforeQeuryData"
      @row-click="rowClick"
      @afterQueryData="afterQueryData"
    />
    <!-- 新增弹窗 -->
    <DialogFormAdd
      :is-show-dialog="dialogAdd.visible"
      :form-data="dialogAdd.record"
      @closeDialog="Object.assign(dialogAdd, { visible: false, record: {} })"
    />
  </div>
</template>
<script>
// 请求api
import { searchConfig, tableConfig, tableOrderConfig, queryConfig, searchForm } from './config'
import DialogFormAdd from './blocks/dialogFormAdd.vue'
export default {
  name: 'ClosingConfiguration',
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
     * @description: 列表数据请求之前数据处理
     * @param {*} data
     * @return {*}
     */
    beforeQeuryData(data) {
      return data
    },
    /**
     * @description: 列表单行点击
     * @param {*} record
     * @return {*}
     */
    rowClick(record) {
      Object.assign(this.dialogAdd, { visible: true, record, isEdit: true })
    },
    /**
     * @description: 数据请求后把数据返回外部
     * @param {*} data
     * @return {*}
     */
    afterQueryData(data) {
      return data
    }
  }
}
</script>

