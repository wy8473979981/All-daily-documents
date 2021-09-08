<!--
 * @Author: xza
 * @Date: 2021-07-010 14:25:38
 * @LastEditTime: 2021-07-09 16:35:52
 * @LastEditors: xza
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      :search-config="searchConfig"
      :status-search-config="statusSearchConfig"
      :search-form="searchForm"
      :search-column="3"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-order-config="tableOrderConfig"
      :before-qeury-data="beforeQeuryData"
      persmission="DemoStar"
      @row-click="rowClick"
      @afterQueryData="afterQueryData"
    >
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn>同步科目</ysn-btn>
        <ysn-btn class="mr-8 ml-8" @click="Object.assign(dialogAdd, { visible: true, record: {} })">新增</ysn-btn>
        <ysn-btn class="mr-8" type="info">导入</ysn-btn>
        <ysn-btn type="">导出</ysn-btn>
      </template>
    </YsnPageContent>
    <!-- 新增/编辑弹窗 -->
    <DialogFormAdd
      :is-show-dialog="dialogAdd.visible"
      :form-data="dialogAdd.record"
      @closeDialog="Object.assign(dialogAdd, { visible: false, record: {} })"
      @successTableList="successTableList"
      @remove="remove"
    />
  </div>
</template>

<script>
// 接口api
import { demoStarApi } from '@/api/demoStar'
// 新增/编辑弹窗
import DialogFormAdd from './blocks/dialogFormAdd.vue'
import { statusSearchConfig, searchConfig, tableConfig } from './config'
export default {
  name: 'DemoStar',
  components: {
    DialogFormAdd
  },
  data() {
    return {
      update: 0,
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '', // 模糊查询
        assistingId: '', // 辅助核算编码
        assistingName: '', // 辅助核算名称
        assistingMold: '', // 核算类型
        assistingType: '', // 类别
        status: '', // 状态
        creatDate: '', // 创建时间
        thirdPartyId: '' // 三方编码
      },
      // 状态筛选
      statusSearchConfig: statusSearchConfig.call(this),
      // 搜索配置
      searchConfig: searchConfig.call(this),
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),
      // 接口请求配置
      queryConfig: {
        api: demoStarApi.demoStarList, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },
      // 新增/编辑
      dialogAdd: {
        visible: false,
        record: {}
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
    //  数据请求后把数据返回外部
    afterQueryData(data) {
      return data
    },
    // 点击单条数据 编辑该条数据
    rowClick(record) {
      Object.assign(this.dialogAdd, { visible: true, record })
    },
    // 刷新列表
    successTableList() {
      const that = this
      demoStarApi.demoStarList(that.searchForm).then((res) => {
        if (res.data && res.data.length > 0) {
          that.tableData = res.data
        }
        that.update++
      })
    },
    //  删除
    remove() {
      Object.assign(this.dialogAdd, { visible: false, record: {}})
      this.successTableList()
    }
  }
}
</script>
