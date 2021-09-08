/*
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description:欠费明细
*/
<template>
  <div class="app-page-main">
    <YsnPageContent
      ref="DuePlatformDetail"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-desc-config="tableDescConfig"
      :table-order-config="tableOrderConfig"
      :before-qeury-data="beforeQeuryData"
      :has-table-config="false"
      persmission="DuePlatformDetail"
      :update="update"
      @row-click="rowClick"
    >
      <template #tableRight>
        <ysn-btn type="primary" class="mr-8">打印催缴函</ysn-btn>
        <ysn-btn type="primary" class="mr-8">打印催缴函(含滞纳金)</ysn-btn>
        <ysn-btn type="info" class="mr-8" @click="creatLateFee">生成滞纳金</ysn-btn>
      </template>
    </YsnPageContent>
    <!-- 详情弹窗 -->
    <DuePlatformInfo
      :is-show-dialog="dialogInfo.visible"
      :form-data="dialogInfo.record"
      @closeDialog="Object.assign(dialogInfo, { visible: false, record: {} })"
    />
    <LateFeeDialog
      :is-show-dialog="lateFee.visible"
      :form-data="lateFee.record"
      @closeDialog="Object.assign(lateFee, { visible: false})"
    />
  </div>
</template>
<script>
import { tableConfig, tableDescConfig } from './config'
import { approveApi } from '@/api'
import DuePlatformInfo from './blocks/duePlatformInfo'
import LateFeeDialog from './blocks/lateFeeDialog.vue'

export default {
  name: 'DuePlatformDetail',
  components: {
    DuePlatformInfo, LateFeeDialog
  },
  props: {},
  data() {
    return {
      // 刷新页面
      update: 0,
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),
      // 列表数据统计/描述配置
      tableDescConfig: tableDescConfig,
      // 接口请求配置
      queryConfig: {
        api: approveApi.getDuePlatformDetail, // 接口请求方式
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
      // 生成滞纳金弹窗
      lateFee: {
        visible: false
      }
    }
  },

  methods: {
    // 生成滞纳金
    creatLateFee() {
      Object.assign(this.lateFee, { visible: true })
    },
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      const that = this
      if (that.$route.query.id) {
        data.id = that.$route.query.id
      }
      return data
    },
    // 列表单行点击
    rowClick(record) {
      Object.assign(this.dialogInfo, { visible: true, record })
    }
  }
}
</script>

