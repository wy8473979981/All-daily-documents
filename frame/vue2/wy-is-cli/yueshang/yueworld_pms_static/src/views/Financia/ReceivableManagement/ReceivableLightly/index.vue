
/*
 * @Author: xueyx
 * @LastEditors: xueyx
 * @Description:应收减免
*/
<template>
  <div class="app-page-main">
    <YsnPageContent
      ref="ReceivableLightly"
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-form="searchForm"
      :search-column="3"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-desc-configs="tableDescConfig"
      :table-order-config="tableOrderConfig"
      :before-qeury-data="beforeQeuryData"
      persmission="ReceivableLightly"

      @getChooseData="getChooseData"
      @row-click="rowClick"
    >
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn type="primary" class="mr-8" @click="add">新增减免单</ysn-btn>
        <AccessoryDialog>
          <ysn-btn type="primary">导入减免单</ysn-btn>
        </AccessoryDialog>
      </template>
    </YsnPageContent>
  </div>
</template>
<script>
import { searchConfig, tableConfig, statusSearchConfig, tableDescConfig } from './config'
import { approveApi } from '@/api'
import AccessoryDialog from './AccessoryDialog.vue'
export default {
  name: 'ReceivableLightly',
  components: {
    AccessoryDialog
  },
  props: {},
  data() {
    return {
      // 刷新页面
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
        api: approveApi.getReceivableLightlyList, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },
      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: false // 继承el-table所有属性,ysn-table的属性
      }
    }
  },
  watch: {
    searchForm: {
      deep: true,
      handler(val) {
        if (val.programName && val.programName.length === 1) {
          this.$refs.ReceivableLightly.searchConfig[3].list = this.$PUBFN.getOptionsList('allFlo')
          if (val.buildingName && val.buildingName.length === 1) {
            this.$refs.ReceivableLightly.searchConfig[4].list = this.$PUBFN.getOptionsList('allFlos')
          } else {
            this.$refs.ReceivableLightly.searchConfig[4].list = []
            val.floorName = ''
          }
        } else {
          this.$refs.ReceivableLightly.searchConfig[4].list = []
          this.$refs.ReceivableLightly.searchConfig[3].list = []
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
        this.tableDescConfig[0].value += Number(i.derateAmount / 10000)
      })
    },
    // 新增减免单
    add() {
      this.$router.push({ name: 'ReceivableLightlyAdd' })
    },
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      return data
    },
    // 列表单行点击
    rowClick(record) {
      if (record.status === 1) { // 编辑页
        this.$router.push({ name: 'ReceivableLightlyAdd', query: { id: record.id }})
      } else { // 详情页
        this.$router.push({ name: 'ReceivableLightlyDetail', query: { id: record.id }})
      }
    },
    // 数据请求后把数据返回外部
    afterQueryData(data) {
      return data
    }

  }
}
</script>

