<!--
 * @Author: xza
 * @LastEditors: xza
 * @Description: 费用项-科目关系
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      ref="SubjectRelation"
      :has-table-config="true"
      :search-config="searchConfig"
      :search-column="3"
      :search-form="searchForm"
      :query-config="queryConfig"
      :table-config="tableConfig"
      show-left
      :left-config="leftConfig"
      :table-order-config="tableOrderConfig"
      persmission="SubjectRelation"
      :before-qeury-data="beforeQeuryData"
      @row-click="rowClick"
      @afterQueryData="afterQueryData"
      @leftChange="leftChange"
    >
      <!-- 列表操作功能 -->
      <template #tableRight>
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
import { feeApi } from '@/api'
import { searchConfig, tableConfig, leftConfig } from './config'
import DialogFormAdd from './blocks/dialogFormAdd.vue'
export default {
  name: 'SubjectRelation',
  components: {
    DialogFormAdd
  },
  props: {},
  data() {
    return {
      leftConfig: leftConfig.call(this),
      update: 0,
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '', // 模糊搜索
        subjectInfo: [], // 科目编码及名称
        feeName: [], // 费项
        programName: '' // 项目
      },
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
      queryConfig: {
        api: feeApi.SubjectRelationList, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },
      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: false // 继承el-table所有属性,ysn-table的属性
      }
    }
  },
  methods: {
    // 左侧点击搜索
    leftChange(e) {
      this.searchForm.programName = e.programId[0].toString()
      if (e.programId.length > 1) {
        this.searchForm.programName = 'x'
      }
      this.$refs.SubjectRelation.getList()
      this.update++
    },
    // 侧边栏搜索
    searchKey(e) {
      this.searchForm.fuzzyEnquiry = e
      this.$refs.SetFilePointer.getList()
      this.update++
    },
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
      await this.$refs.SubjectRelation.getList()
      await this.update++
    },
    // 删除
    remove() {
      Object.assign(this.dialogAdd, { visible: false, record: {}})
      this.successTableList()
    }
  }
}
</script>
