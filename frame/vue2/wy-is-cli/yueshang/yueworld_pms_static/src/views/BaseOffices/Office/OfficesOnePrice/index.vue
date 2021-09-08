<!--
 * @Author: qiuyw
 * @LastEditors: Please set LastEditors
 * @Description: 一铺一价
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      :search-config="searchConfig"
      :search-form="searchForm"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-order-config="tableOrderConfig"
      :table-desc-config="tableDescConfig"
      :before-qeury-data="beforeQeuryData"
      :table-right-excel="tableRightExcel"
      :table-slots="['detail']"
      persmission="OfficesOnePrice"
      @afterQueryData="afterQueryData"
      @row-click="rowClick"
    >
      <template #detail="scope">
        <div class="free-show-text">
          <p v-for="(item,index) in scope.row.cycleCostList" :key="index">
            {{item.feeName}}：{{item.standardFee}}元/m²/{{item.standardFeeTimeUnit}}，递增率{{item.standardFeeIncreasing}}%
          </p>
        </div>
      </template>
    </YsnPageContent>
    <SOPDialog
      :dialog-type="dialogType"
      :form-data="formData"
      :dialog-num="dialogNum"
      @handlerUpdateList="handlerUpdateList"
      @changeType="dialogChangeType"
    />
  </div>
</template>
<script>
// 请求api
import { baseOfficesApi } from '@/api'
import { searchConfig, tableConfig, tableDescConfig } from './config'
import SOPDialog from './blocks/dialog'
export default {
  name: 'OfficesOnePrice',
  components: { SOPDialog },
  props: {},
  data() {
    return {
      // 搜索form
      searchForm: {
        programName: []
      },
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 状态搜索值
      statucSearchValue: [],
      // 列表数据
      tableData: [],
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),
      tableDescConfig: tableDescConfig,
      // 导入导出配置
      tableRightExcel: {
        importExcel: true,
        exportExcel: true
      },
      // 接口请求配置
      queryConfig: {
        api: baseOfficesApi.officesOnePriceList
      },

      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: false, // 继承el-table所有属性,ysn-table的属性
        operationWidth: '200',
        highlightCurrentRow: true
      },
      dialogType: 'add', // add=新增，edit=编辑
      dialogNum: 0,
      formData: {
        fileList: []
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
      this.reqData = data
      console.log(data)
    },
    /**
     * @method:rowClick
     * @param {*} row
     * @desc:列表单行点击
     */
    rowClick(row) {
      console.log(row)
      this.formData = row
      this.dialogType = 'detail'
      this.dialogNum++
    },
    /**
     * @method:handlerUpdateList
     * @desc：更新列表
     */
    handlerUpdateList() {
      console.log('更新列表')
    },
    /**
     * 导入
     */
    handlerImport() {
    },
    /**
     * 导出
     */
    handlerExport() {
    },
    /**
     * 弹框编辑事件
     */
    dialogChangeType() {
      this.dialogType = 'edit'
    }
  }
}
</script>
