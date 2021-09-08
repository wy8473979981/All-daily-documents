<!--
 * @Author: zsj
 * @Date: 2021-07-02 18:25:38
 * @LastEditTime: 2021-08-09 18:05:05
 * @LastEditors: zengcheng
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-form="searchForm"
      :search-column="3"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-order-config="tableOrderConfig"
      :table-desc-config="tableDescConfig"
      :before-qeury-data="beforeQeuryData"
      persmission="AgreementIntention"
      @row-click="rowClick"
      @afterQueryData="afterQueryData"
    >
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn @click="addBox">新增意向协议</ysn-btn>
      </template>
    </YsnPageContent>
    <dialogRentPlan :is-show-dialog="dialogAddVisible" @closeDialog="closeDialog" />

  </div>
</template>
<script>
// 请求api
import { agreementIntentionApi } from '@/api'
import { searchConfig, tableConfig, tableDescConfig, statusSearchConfig } from './config'
export default {
  name: 'AgreementIntention',
  props: {},
  data() {
    return {
      update: 0, // 更新视图用
      dialogAddVisible: false, // 选择计租方案弹窗
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '', // 模糊查询
        auditStatus: '', // 审核状态
        programName: [], // 项目
        contNoIntent: '',
        intentProtocolName: '',
        brandFormatName: '', // 签约业态
        buildingId: '', // 楼栋编码
        floorId: '', // 楼层编码
        decorateEndDates: [], // 合同结束日
        storeTypes: '', // 铺位类型
        contEndDate: '', // 合同结束日
        contBeginDate: '', // 合同开始日
        deleteStates: '' // 删除状态
      },
      // 状态筛选
      statusSearchConfig: statusSearchConfig.call(this),
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 状态搜索值
      statucSearchValue: [],

      // 列表数据统计/描述配置
      tableDescConfig: tableDescConfig,
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),

      // 接口请求配置
      queryConfig: {
        api: agreementIntentionApi.agreementList, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },
      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: false // 继承el-table所有属性,ysn-table的属性
      }
    }
  },
  methods: {
    // 关闭
    closeDialog() {
      this.dialogAddVisible = false
    },
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
    //   console.log('请求之前数据处理', data)
    //   // 数据单独处理后returnData, 可返回data模板或者额外处理后的searchFormData
      data.contBeginDate = data.decorateEndDates[0]
      data.contEndDate = data.decorateEndDates[1]
      return data
    //   return data
    },

    //  数据请求后把数据返回外部
    afterQueryData(data) {
      return data
    },
    // 项目选择清除楼栋和楼层
    proName() {
      if (this.searchForm.programName.length > 1) {
        this.searchForm.buildingId = ''
        this.searchForm.floorId = ''
      }
    },
    // 楼栋选择看看是否选择项目
    build() {
      this.proName()
    },
    // 楼层选择看看是否选择项目
    floor() {
      this.proName()
    },
    // 新增选择计租方案
    addBox() {
      this.dialogAddVisible = true
    },
    // 点击列表
    rowClick(e) {
      let name = 'AgreementOfIntentAdd'
      if (e.auditStatus === '正常结束' || e.auditStatus === '审批中') {
        name = 'AgreementOfIntentDetails'
      }
      if (e.auditStatus === '正常结束') {
        this.$router.push({ name: name, query: { endId: e.id }})
        return
      }
      if (e.auditStatus === '审批中') {
        this.$router.push({ name: name, query: { approval: e.id }})
        return
      }
      this.$router.push({ name: name, query: { id: e.id }})
    }
  }
}
</script>
