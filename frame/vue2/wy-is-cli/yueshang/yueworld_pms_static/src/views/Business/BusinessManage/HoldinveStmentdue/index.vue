<!--
 * @Author: zsj
 * @Date: 2021-07-01 11:50:46
 * @LastEditTime: 2021-08-07 09:31:18
 * @LastEditors: Please set LastEditors
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
      persmission="HoldinveStmentdue"
      @row-click="rowClick"
      @afterQueryData="afterQueryData"
    >
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn class="mr-8" @click="toAdds">续租</ysn-btn>
        <ysn-btn class="mr-8" @click="addBoxs">意向转合同</ysn-btn>
        <ysn-btn @click="addBox">新增租赁合同</ysn-btn>
      </template>
    </YsnPageContent>
    <dialogRentPlan :is-show-dialog="dialogAddVisible" :to-contract="toContract" @closeDialog="closeDialog" />
    <ToStmentdue :is-show-dialogs="dialogAddVisibles" @closeDialog="closeDialog" />
  </div>
</template>
<script>
// 请求api
import { holdinveStmentdueApi } from '@/api'
import { searchConfig, tableConfig, tableDescConfig, statusSearchConfig } from './config'
import ToStmentdue from './blocks/toStmentdue.vue'
export default {
  name: 'HoldinveStmentdue',
  components: {
    ToStmentdue
  },
  data() {
    return {
      dialogAddVisible: false, // 选择计租方案弹窗
      dialogAddVisibles: false,
      toContract: true,
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '', // 模糊查询
        auditStatus: '', // 审核状态
        programName: [], // 项目
        brandFormatName: '', // 签约业态
        buildingId: '', // 楼栋编码
        floorId: '', // 楼层编码
        decorateEndDates: ['0', '0'], // 合同结束日
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
        api: holdinveStmentdueApi.holdList, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },

      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: true // 继承el-table所有属性,ysn-table的属性
      }
    }
  },
  methods: {
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
    //   console.log('请求之前数据处理', data)
    //   // 数据单独处理后returnData, 可返回data模板或者额外处理后的searchFormData
      data.contBeginDate = data.decorateEndDates[0] // 赋值给开始时间
      data.contEndDate = data.decorateEndDates[1] // 赋值给结束时间
      return data
    },

    //  数据请求后把数据返回外部
    afterQueryData(data) {
      this.reqData = data
    },
    // 项目选择
    proName() {
      if (this.searchForm.programName.length > 1) {
        this.searchForm.buildingId = '' // 清空楼栋选择
        this.searchForm.floorId = '' // 清空楼层选择
      }
    },
    // 楼栋选择
    build() {
      this.proName()
    },
    // 楼层选择
    floor() {
      this.proName()
    },
    store() {
      this.proName()
    },
    // 新增选择计租方案
    addBox() {
      this.dialogAddVisible = true
    },
    addBoxs() {
      this.dialogAddVisibles = true
    },
    // 关闭弹窗
    closeDialog() {
      this.dialogAddVisible = false
      this.dialogAddVisibles = false
    },
    rowClick(e) {
      let name = 'LeaseContractAdd'
      if (e.auditStatus === '审核通过') {
        name = 'HoldinveStmentdueDetails'
      }
      this.$router.push({ name: name, query: { id: e.id }})
    },
    toAdds(e) {
      this.$router.push({ name: 'LeaseContractAdd', query: { renewalID: '789' }})
    }
  }
}
</script>
