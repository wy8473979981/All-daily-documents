<!--
 * @Author: chenkeju9933
 * @LastEditors: chenkeju9933
 * @Description: 财务配置-收款配置
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      ref="CollectionSet"
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-column="3"
      :search-form="searchForm"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-order-config="tableOrderConfig"
      persmission="CollectionSet"
      :before-qeury-data="beforeQeuryData"
      @row-click="rowClick"
      @afterQueryData="afterQueryData"
    >
      <!-- 列表按钮操作功能 -->
      <template #tableRight>
        <ysn-btn @click="toSubject()">费项关系</ysn-btn>
        <ysn-btn class="mr-8 ml-8" @click="Object.assign(dialogAdd, { visible: true, record: {}, isEdit: false })">新增</ysn-btn>
        <ysn-btn class="ml-8" type="info">
          <ysn-excel type="import">导入</ysn-excel>
        </ysn-btn>
        <ysn-btn class="ml-8" type="reset">
          <ysn-excel type="export">导出</ysn-excel>
        </ysn-btn>
      </template>
    </YsnPageContent>
    <!-- 新增/编辑弹窗 -->
    <CollectionAdd
      :is-show-dialog="dialogAdd.visible"
      :form-data="dialogAdd.record"
      :is-edit="dialogAdd.isEdit"
      @closeDialog="Object.assign(dialogAdd, { visible: false, record: {} })"
      @successTableList="successTableList"
      @remove="remove"
    />
  </div>
</template>
<script>
// 请求api
import { collectionSetApi } from '@/api/collectionSet'
import { searchConfig, tableConfig, statusSearchConfig } from './config'
import CollectionAdd from './blocks/CollectionAdd.vue'
export default {
  name: 'CollectionSet',
  components: {
    CollectionAdd
  },
  props: {},
  data() {
    return {
      // 刷新列表
      update: 0,
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '', // 模糊搜索
        programName: [], // 全部项目
        auditStatus: []
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
        api: collectionSetApi.collectionSetList, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },
      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: false // 继承el-table所有属性,ysn-table的属性
      }
    }
  },
  methods: {
    // 跳转费项关系
    toSubject() {
      this.$router.push({ name: 'CollectionSetFee' })
    },
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      return data
    },
    // 列表单行点击
    rowClick(record) {
      Object.assign(this.dialogAdd, { visible: true, record, isEdit: true })
    },
    //  数据请求后把数据返回外部
    afterQueryData(data) {
      return data
    },
    // 刷新列表
    async successTableList() {
      await this.$refs.CollectionSet.getList()
      await this.update++
    },
    //  删除
    remove() {
      Object.assign(this.dialogAdd, { visible: false, record: {}})
      this.successTableList()
    }
  }
}
</script>
