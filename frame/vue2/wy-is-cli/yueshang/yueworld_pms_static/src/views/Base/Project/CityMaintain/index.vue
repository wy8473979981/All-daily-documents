<!--
 * @Author: fhj
 * @LastEditors: Please set LastEditors
 * @Description:城市维护
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      :search-config="searchConfig"
      :search-form="searchForm"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-order-config="tableOrderConfig"
      :key="updateNum"
      persmission="RegionMaintain"
      @afterQueryData="afterQueryData"
      @row-click="rowClick"
    >
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn @click="cityClick">新增城市</ysn-btn>
      </template>
    </YsnPageContent>

    <city-dialog
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
import CityDialog from './blocks/dialog'
export default {
  name: 'CityMaintain',
  components: {
    CityDialog,
  },
  props: {},
  data() {
    return {
      // 搜索form
      searchForm: {
        regionName: [],
      },
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
        api: baseProjectApi.cityMaintenanceList, // 接口请求方式
      },

      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: false, // 继承el-table所有属性,ysn-table的属性
        operationWidth: '200',
        highlightCurrentRow: true,
      },
      dialogType: 'add', // add=新增，edit=编辑
      dialogNum: 0,
      formData: {},
      updateNum: 0,
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
