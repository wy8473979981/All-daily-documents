<!--
 * @Author: fhj
 * @LastEditors: Please set LastEditors
 * @Description:项目维护
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
      :table-right-excel="{ exportExcel: true, importExcel: true }"
      :before-qeury-data="beforeQeuryData"
      :key="updateNum"
      persmission="RegionMaintain"
      @afterQueryData="afterQueryData"
      @row-click="rowClick"
    >
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn @click="cityClick">新增</ysn-btn>
      </template>
    </YsnPageContent>

    <project-dialog
      :dialogType="dialogType"
      :formData="formData"
      :dialogNum="dialogNum"
      @handlerUpdateList="handlerUpdateList"
    />
  </div>
</template>
<script>
// 请求api
import { baseOfficesApi } from '@/api'
import { searchConfig, tableConfig, tableDescConfig } from './config'
import projectDialog from './blocks/dialog'
export default {
  name: 'ProjectMaintain',
  components: {
    projectDialog,
  },
  props: {},
  data() {
    return {
      // 搜索form
      searchForm: {
        programId: [],
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
        api: baseOfficesApi.projectMaintenanceList, // 接口请求方式
      },

      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: false, // 继承el-table所有属性,ysn-table的属性
        operationWidth: '200',
        highlightCurrentRow: true,
      },
      dialogType: 'add', //add=新增，edit=编辑
      dialogNum: 0,
      formData: {
        fileList: [],
      },
      updateNum: 0, //数据更新
      list: [],
    }
  },
  methods: {
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      // 数据单独处理后returnData, 可返回data模板或者额外处理后的searchFormData
      return data
      //   return data
    },
    //  数据请求后把数据返回外部
    afterQueryData(data) {
      this.reqData = data
      console.log(data, 'data')
    },
    /**
     * @method:rowClick
     * @param {*} row
     * @desc:列表单行点击
     */
    rowClick(row) {
      this.formData = row
      this.dialogType = 'edit'
      this.dialogNum++
    },
    /**
     * @method:cityClick
     * @desc:新增城市
     */
    cityClick() {
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
  },
}
</script>
