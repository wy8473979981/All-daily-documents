<!--
 * @Author: fhj
 * @LastEditors: Please set LastEditors
 * @Description:楼栋维护
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      :key="updateNum"
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-form="searchForm"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-right-excel="{ importExcel: true, exportExcel: true }"
      :table-order-config="tableOrderConfig"
      :table-desc-config="tableDescConfig"
      persmission="RegionMaintain"
      @afterQueryData="afterQueryData"
      @row-click="rowClick"
    >
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn @click="addClick">新增</ysn-btn>
      </template>
      <!-- 列表操作列插槽 -->
      <template #default>
        <p class="color-0c66ff table-btn" @click="changeArea">面积变更</p>
      </template>
      <!-- 列表操作列插槽 -->
    </YsnPageContent>

    <add-dialog
      :dialog-type="dialogType"
      :form-data="formData"
      :dialog-num="dialogNum"
      @handlerUpdateList="handlerUpdateList"
      @handleClose="handleClose"
    />
  </div>
</template>
<script>
// 请求api
import { baseOfficesApi } from '@/api'
import {
  searchConfig,
  tableConfig,
  tableDescConfig,
  statusSearchConfig,
} from './config'
import addDialog from './blocks/dialog'
export default {
  name: 'officeUnitMaintain',
  components: {
    addDialog,
  },
  props: {},
  data() {
    return {
      // 搜索form
      searchForm: {
        programName: [],
        buildingName: [],
        floorName: [],
        officeName: [],
      },
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 状态搜索值
      statucSearchValue: [],
      // 列表数据
      tableData: [],
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),
      // 状态筛选
      statusSearchConfig: statusSearchConfig.call(this),
      tableDescConfig: tableDescConfig,
      // 接口请求配置
      queryConfig: {
        api: baseOfficesApi.officeUnitMaintenanceList, // 接口请求方式
      },

      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: false, // 继承el-table所有属性,ysn-table的属性
        operationWidth: '200',
        highlightCurrentRow: true,
        showOperation: true,
      },
      dialogType: 'add', // add=新增，edit=编辑
      dialogNum: 0,
      formData: {},
      updateNum: 0,
      tableBtnStatus: false, //table的按钮点击状态
    }
  },
  methods: {
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
      this.formData = row
      if (!this.tableBtnStatus) {
        this.dialogType = 'edit'
      }

      this.dialogNum++
    },
    /**
     * @desc:新增
     */
    addClick() {
      this.dialogType = 'add'
      this.dialogNum++
    },
    /**
     * @method:handlerUpdateList
     * @desc：更新列表
     */
    handlerUpdateList() {
      console.log('更新列表')
      this.updateNum++
    },

    /**
     * @desc:面积变更
     */
    changeArea() {
      this.tableBtnStatus = true
      this.dialogType = 'change'
    },
    /**
     * @desc:弹框关闭事件
     */

    handleClose() {
      this.tableBtnStatus = false
    },
  },
}
</script>
<style lang="scss" scoped>
.table-btn {
  cursor: pointer;
}
</style>
