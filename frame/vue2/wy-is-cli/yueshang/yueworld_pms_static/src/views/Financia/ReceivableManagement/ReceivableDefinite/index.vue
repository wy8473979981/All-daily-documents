/*
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description:应收明细
*/
<template>
  <div class="app-page-main">
    <YsnPageContent
      ref="approveList"
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-form="searchForm"
      :search-column="3"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-desc-config="tableDescConfig"
      :table-order-config="tableOrderConfig"
      :before-qeury-data="beforeQeuryData"
      persmission="ReceivableDefinite"
      @row-click="rowClick"
      @select="comSelect"
      @select-all="comSelect"
    >
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn type="primary" class="mr-8" @click="creatBilling">生成账单</ysn-btn>
        <ysn-btn type="info" class="mr-8" @click="creatDiscree">生成应付单</ysn-btn>
        <ysn-btn type="info" class="mr-12">
          <ysn-excel type="export">导出</ysn-excel>
        </ysn-btn>
        <ysn-btn type="reset" @click="allPush">批量推送结转收入</ysn-btn>
      </template>
    </YsnPageContent>
    <!-- 详情弹窗 -->
    <ReceivableDialog
      :is-show-dialog="dialogInfo.visible"
      :form-data="dialogInfo.record"
      @closeDialog="Object.assign(dialogInfo, { visible: false, record: {} })"
    />
    <BillingDialog
      :is-show-dialog="billingType.visible"
      :form-data="billingType.record"
      @closeDialog="Object.assign(billingType, { visible: false, record: {} })"
    />
  </div>
</template>
<script>
import { searchConfig, tableConfig, statusSearchConfig, tableDescConfig } from './config'
// import PUBFN from '@/utils/pubFn'

import { approveApi } from '@/api'
import ReceivableDialog from './blocks/receviableDefineiteDetails'
import BillingDialog from './blocks/billingTypeDialog.vue'
export default {
  name: 'ReceivableDefinite',
  components: {
    ReceivableDialog, BillingDialog
  },
  props: {},
  data() {
    return {
      update: 0,
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '', // 模糊搜索
        programName: [], // 全部项目
        feeName: [], // 费项
        receivableTime: '', // 应收日期
        contType: '', // 合同类型
        subStatusId: '', // 减免状态
        collectId: '', // 账单状态
        isBeforVer: '', // 是否提前核销
        financialDate: '', // 权责月
        buildingName: '', // 楼栋
        floorName: '', // 楼层
        isNoReceivable: ''// 应收是否为负
      },
      // 状态筛选
      statusSearchConfig: statusSearchConfig.call(this),
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),
      // 列表数据统计/描述配置
      tableDescConfig: tableDescConfig,
      // 接口请求配置
      queryConfig: {
        api: approveApi.getReceivableFiniteList, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },
      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: true // 继承el-table所有属性,ysn-table的属性
      },
      // 详情弹窗开关
      dialogInfo: {
        visible: false,
        record: {}// 详情数据
      },
      // 账单类型弹窗
      billingType: {
        visible: false,
        record: {}// 详情数据
      },
      // 多选数据
      checkboxList: []
    }
  },
  watch: {
    searchForm: {
      deep: true,
      handler(val) {
        if (val.programName && val.programName.length === 1) {
          this.$refs.approveList.searchConfig[9].list = this.$PUBFN.getOptionsList('allFlo')
          if (val.buildingName && val.buildingName.length === 1) {
            this.$refs.approveList.searchConfig[10].list = this.$PUBFN.getOptionsList('allFlos')
          } else {
            this.$refs.approveList.searchConfig[10].list = []
            val.floorName = ''
          }
        } else {
          this.$refs.approveList.searchConfig[9].list = []
          val.buildingName = ''
          val.floorName = ''
        }
      }
    }
  },
  methods: {
    // 多选
    comSelect(val) {
      this.checkboxList = val
    },
    // 生成账单类型
    creatBilling(record) {
      if (!this.message()) { return }
      Object.assign(this.billingType, { visible: true, record })
    },
    // 生成应付单
    creatDiscree() {
      if (!this.message()) { return }
      this.$message({ message: '只有负数应收才可生成应付单', type: 'error' }, 2000)
    },
    // 批量推送
    allPush() {
      if (!this.message()) { return }
      this.$message({ message: '推送成功', type: 'success' }, 2000)
    },
    // 公用消息提示
    message() {
      if (this.checkboxList.length === 0) {
        this.$message({
          type: 'error',
          message: '请先勾选记录'
        }, 2000)
        return false
      } else {
        return true
      }
    },
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      return data
    },
    // 列表单行点击
    rowClick(record) {
      Object.assign(this.dialogInfo, { visible: true, record })
    },
    // 数据请求后把数据返回外部
    afterQueryData(data) {
      return data
    }

  }
}
</script>

