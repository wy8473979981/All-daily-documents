<!--
 * @Author: agz
 * @LastEditors: fhj
 * @Description:区域维护
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      :key="updateNum"
      :search-config="searchConfig"
      :search-form="searchForm"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-order-config="tableOrderConfig"
      persmission="RegionMaintain"
      @row-click="rowClick"
    >
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn @click="regionClick">新增区域</ysn-btn>
      </template>
    </YsnPageContent>

    <region-dialog
      :dialog-type="dialogType"
      :form-data="formData"
      :dialog-num="dialogNum"
      @handlerUpdateList="handlerUpdateList"
    />
  </div>
</template>
<script>
// 请求api
import { baseProjectApi } from '@/api'
import { searchConfig, tableConfig } from './config'
import regionDialog from './blocks/dialog'
export default {
  name: 'RegionMaintain',
  components: {
    regionDialog
  },
  props: {},
  data() {
    return {
      // 搜索form
      searchForm: {},
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 状态搜索值
      statucSearchValue: [],
      // 列表数据
      tableData: [],
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),

      // 接口请求配置
      queryConfig: {
        api: baseProjectApi.areaMaintenanceList // 接口请求方式
      },

      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: false, // 继承el-table所有属性,ysn-table的属性
        operationWidth: '200',
        highlightCurrentRow: true
      },
      dialogType: 'add', // add=新增，edit=编辑
      dialogNum: 0,
      formData: {}, // 当前列表
      visiable: false,
      updateNum: 0
    }
  },
  methods: {
    /**
     * @method:rowClick
     * @param {*} row
     * @desc:列表单行点击
     */
    rowClick(row) {
      console.log(row, 'row')
      this.formData = row
      this.dialogType = 'edit'
      this.dialogNum++
    },
    /**
     * @method:regionClick
     * @desc:新增区域
     */

    regionClick() {
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
    }
  }
}
</script>
