<!--
 * @Author: fzx
 * @LastEditors: fzx
 * @Description:应收管理 费用调整单
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      ref="AdjustmentCost"
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-form="searchForm"
      :search-column="3"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-desc-configs="tableDescConfig"
      :table-order-config="tableOrderConfig"
      :before-qeury-data="beforeQeuryData"
      persmission="AdjustmentCost"
      @row-click="rowClick"
      @getChooseData="getChooseData"
    >
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn type="primary" class="mr-8" @click="add">新增调整单</ysn-btn>
        <ysn-btn type="info" class="mr-8">
          <ysn-excel type="export">导出</ysn-excel>
        </ysn-btn>
      </template>
    </YsnPageContent>
  </div>
</template>
<script>
import { searchConfig, tableConfig, statusSearchConfig, tableDescConfig } from './config'
import { adjustmentCost } from '@/api/adjustmentCost.js'
export default {
  name: 'AdjustmentCost',
  components: {
  },
  props: {},
  data() {
    return {
      auditStatus: 0,
      update: 0,
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '', // 模糊搜索
        programName: [], // 全部项目
        creatDate: '', // 创建时间
        buildingName: '', // 楼栋
        floorName: '' // 楼层
      },
      // 状态筛选
      statusSearchConfig: statusSearchConfig.call(this),
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),
      // 列表数据统计/描述配置
      tableDescConfig: tableDescConfig.call(this),
      // 接口请求配置
      queryConfig: {
        api: adjustmentCost.adjustmentCostList, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },
      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: false // 继承el-table所有属性,ysn-table的属性
      }
    }
  },
  watch: {
    // 监听searchForm的变化
    searchForm: {
      deep: true,
      handler(val) {
        // 项目时单选时，楼栋有数据
        if (val.programName && val.programName.length === 1) {
          this.$refs.AdjustmentCost.searchConfig[3].list = this.$PUBFN.getOptionsList('allFlo')
          // 楼栋不为空时，楼层有数据
          if (val.buildingName && val.buildingName !== '') {
            this.$refs.AdjustmentCost.searchConfig[4].list = this.$PUBFN.getOptionsList('allFlos')
          } else {
            this.$refs.AdjustmentCost.searchConfig[4].list = []
            val.floorName = ''
          }
        } else {
          this.$refs.AdjustmentCost.searchConfig[3].list = []
          this.$refs.AdjustmentCost.searchConfig[4].list = []
          val.buildingName = ''
          val.floorName = ''
        }
      }
    }
  },
  methods: {
    getChooseData(e) {
      this.tableDescConfig[0].value = 0
      e.map(i => {
        this.tableDescConfig[0].value += Number(Number(i.adjustAmount) / 10000)
      })
    },
    // 费用调整单 新增
    add() {
      this.$router.push({ name: 'AdjustmentCostAdd' })
    },
    // 列表单行点击 判断跳转新增 详情  新页面根据ID 请求数据
    rowClick(row) {
      if (row.auditStatus && (row.state === 2 || row.state === 3 || row.state === 4 || row.state === 5)) {
        this.$router.push({ name: 'AdjustmentCostDetail', query: { id: row.id, status: row.state }})
        return
      }
      this.$router.push({ name: 'AdjustmentCostAdd', query: { id: row.id, status: row.state }})
    },
    // 数据请求后把数据返回外部
    afterQueryData(data) {
      return data
    },
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      return data
    }
  }
}
</script>

