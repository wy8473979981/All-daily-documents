<!--
 * @Author: xza
 * @LastEditors: xza
 * @Description:税率
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      ref="TaxModuleList"
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-column="3"
      :search-form="searchForm"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-order-config="tableOrderConfig"
      persmission="TaxModuleList"
      :before-qeury-data="beforeQeuryData"
      @row-click="rowClick"
      @afterQueryData="afterQueryData"
    >
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn class="mr-8 ml-8" @click="toSubject(1)">费项关系</ysn-btn>
        <ysn-btn class="mr-8" @click="toSubject(0)">科目关系</ysn-btn>
        <ysn-btn class="mr-8" @click="Object.assign(dialogAdd, { visible: true, record: {}, isEdit: false })">新增</ysn-btn>
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
import { taxModuleListApi } from '@/api'
import { searchConfig, tableConfig, statusSearchConfig } from './config'
import DialogFormAdd from './blocks/dialogFormAdd.vue'
export default {
  name: 'TaxModuleList',
  components: {
    DialogFormAdd
  },
  props: {},
  data() {
    return {
      update: 0,
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '', // 模糊搜索
        taxType: [], // 类别
        taxCollectType: [] // 征收类型
      },
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
      queryConfig: {
        api: taxModuleListApi.taxModuleList, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },
      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: false // 继承el-table所有属性,ysn-table的属性
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
      await this.$refs.TaxModuleList.getList()
      await this.update++
    },
    // 删除
    remove() {
      Object.assign(this.dialogAdd, { visible: false, record: {}})
      this.successTableList()
    },
    // 跳转科目关系
    toSubject(id) {
      id ? this.$router.push({ name: 'TaxWithFeeList' }) : this.$router.push({ name: 'TaxWithSubject' })
    }
  }
}
</script>

