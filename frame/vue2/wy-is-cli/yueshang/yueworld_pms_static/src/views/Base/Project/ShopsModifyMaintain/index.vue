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
      :table-order-config="tableOrderConfig"
      persmission="RegionMaintain"
      @afterQueryData="afterQueryData"
      @row-click="rowClick"
    />

    <add-dialog
      :form-data="formData"
      :dialogType="dialogType"
      :dialog-num="dialogNum"
      @handlerUpdateList="handlerUpdateList"
    />
  </div>
</template>
<script>
// 请求api
import { baseProjectApi } from '@/api'
import { searchConfig, tableConfig, statusSearchConfig } from './config'
import addDialog from './blocks/dialog'
export default {
  name: 'shopsModifyMaintain',
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
        spaceType: [],
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
      // 接口请求配置
      queryConfig: {
        api: baseProjectApi.shopsModifyMaintenanceList, // 接口请求方式
        deleteApi: baseProjectApi.shopsModifyMaintenanceDel, // 批量删除
      },

      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: false, // 继承el-table所有属性,ysn-table的属性
        operationWidth: '200',
        highlightCurrentRow: true,
      },
      dialogNum: 0,
      formData: {},
      updateNum: 0,
      dialogType: 'edit',
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
      this.dialogType =
        row.checkStatus === 3 || row.checkStatus === 2 ? 'detail' : 'edit'
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
    // /**
    //  * 非草稿状态下禁止选中
    //  * @param row
    //  * @returns {boolean}
    //  */
    // selectable: function(row) {
    //   return row.checkStatus === 1 || row.checkStatus === 4
    // },
  },
}
</script>
