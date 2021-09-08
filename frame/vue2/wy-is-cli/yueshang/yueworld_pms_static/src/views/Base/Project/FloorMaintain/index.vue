<!--
 * @Author: fhj
 * @LastEditors: Please set LastEditors
 * @Description:楼栋维护
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
      :key="updateNum"
      persmission="RegionMaintain"
      @afterQueryData="afterQueryData"
      @row-click="rowClick"
    >
    </YsnPageContent>

    <edit-dialog
      :form-data="formData"
      :dialog-num="dialogNum"
      @handlerUpdateList="handlerUpdateList"
    />
  </div>
</template>
<script>
// 请求api
import { baseProjectApi } from '@/api'
import { searchConfig, tableConfig, tableDescConfig } from './config'
import editDialog from './blocks/dialog'
export default {
  name: 'floorMaintain',
  components: {
    editDialog,
  },
  props: {},
  data() {
    return {
      // 搜索form
      searchForm: {
        programName: [],
        buildingName: [],
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
      // 接口请求配置
      queryConfig: {
        api: baseProjectApi.floorMaintenanceList, // 接口请求方式
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
    }
  },
  methods: {
    //  数据请求后把数据返回外部
    afterQueryData(data) {
      this.reqData = data
    },
    /**
     * @method:rowClick
     * @param {*} row
     * @desc:列表单行点击
     */
    rowClick(row) {
      this.formData = row
      this.dialogNum++
    },
    /**
     * @method:handlerUpdateList
     * @desc：更新列表
     */
    handlerUpdateList() {
      this.updateNum++
    },
  },
}
</script>
