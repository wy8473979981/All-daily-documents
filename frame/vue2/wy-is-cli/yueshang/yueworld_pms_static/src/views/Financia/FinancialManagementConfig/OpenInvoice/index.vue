<!--
 * @Author: zbk
 * @LastEditors: zbk
 * @Description: 开票配置
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      ref="OpenInvoice"
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-column="3"
      :search-form="searchForm"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-order-config="tableOrderConfig"
      persmission="OpenInvoice"
      :before-qeury-data="beforeQeuryData"
      @row-click="rowClick"
      @afterQueryData="afterQueryData"
    >
      <!-- 列表按钮功能 -->
      <template #tableRight>
        <ysn-btn @click="toSubject()">费项关系</ysn-btn>
        <ysn-btn class="mr-8 ml-8" @click="Object.assign(dialogAdd, { visible: true, record: {}, isEdit: false })">新增</ysn-btn>
        <ysn-btn class="mr-8" type="info">
          <ysn-excel type="import">导入</ysn-excel>
        </ysn-btn>
        <ysn-btn type="reset">
          <ysn-excel type="export">导出</ysn-excel>
        </ysn-btn>
      </template>
    </YsnPageContent>
    <!-- 新增/编辑弹窗 -->
    <DialogFormAdd
      :is-show-dialog="dialogAdd.visible"
      :form-data="dialogAdd.record"
      :is-edit="dialogAdd.isEdit"
      @closeDialog="Object.assign(dialogAdd, { visible: false, record: {}})"
      @successTableList="successTableList"
      @remove="remove"
    />
  </div>
</template>
<script>
// 请求api
import { meterApi } from '@/api/openInvoice'
import { searchConfig, tableConfig, statusSearchConfig } from './config'
import DialogFormAdd from './blocks/dialogFormAdd.vue'
export default {
  name: 'OpenInvoice',
  components: {
    DialogFormAdd
  },
  data() {
    return {
      // 刷新页面
      update: 0,
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '', // 模糊搜索
        programName: [] // 全部项目
      },
      // 新增编辑会话框
      dialogAdd: {
        visible: false,
        record: {},
        isEdit: false
      },
      // 新增编辑会话框
      OpenDialogAdd: {
        visible: false,
        record: {}
      },
      // 状态筛选
      statusSearchConfig: statusSearchConfig.call(this),
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),
      // 接口请求配置
      queryConfig: {
        api: meterApi.groupList,
        dataKey: 'list'
      },
      //   表订单配置
      tableOrderConfig: {
        checkbox: false
      }
    }
  },
  methods: {
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      return data
    },
    // 列表单行点击
    rowClick(record) {
      Object.assign(this.dialogAdd, { visible: true, record, isEdit: true })
    },
    // 数据请求后把数据返回外部
    afterQueryData(data) {
      return data
    },
    // 刷新列表
    async successTableList() {
      await this.$refs.OpenInvoice.getList()
      await this.update++
    },
    // 删除
    remove() {
      Object.assign(this.dialogAdd, { visible: false, record: {}})
      this.successTableList()
    },
    // 跳转费翔关系
    toSubject() {
      this.$router.push({ name: 'CostBetween' })
    }
  }
}
</script>
