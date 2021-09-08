<!--
 * @Author: shuyuan
 * @LastEditors: shuyuan
 * @Description:商家变更列表
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
      :before-qeury-data="beforeQeuryData"
      :delete-table="deleteTable"
      delete-message="审核通过不可删除"
      persmission="RegionMaintain"
      @afterQueryData="afterQueryData"
      @row-click="rowClick"
    />

    <editDialog v-if="dialogType==='edit'" :form-data="formData" :is-show-dialog="isShowDialog" :dialog-type="dialogType" @cloneDialog="cloneDialog" />
    <detailsDialog v-if="dialogType==='details'" :form-data="formData" :is-show-dialog="isShowDialog" :dialog-type="dialogType" @cloneDialog="cloneDialog" />
  </div>
</template>
<script>
// 请求api
import { tenantLibraryApi } from '@/api'
import { searchConfig, statusSearchConfig, tableConfig } from './config'
import editDialog from './blocks/editDialog'
import detailsDialog from './blocks/detailsDialog'
export default {
  name: 'TenantLibraryChange',
  components: {
    editDialog,
    detailsDialog
  },
  props: {},
  data() {
    return {
      isShowDialog: false, // 控制弹窗
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '', // 模糊搜索
        programName: [],
        tenantType: [],
        tenantCompanyQuailty: []
      },
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 状态配置
      statusSearchConfig: statusSearchConfig.call(this),
      // 状态搜索值
      statucSearchValue: [],
      // 列表数据
      tableData: [],
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),

      // 接口请求配置
      queryConfig: {
        api: tenantLibraryApi.tenantLibraryChangeList, // 接口请求方式
        dataKey: 'list', // 取请求接口后返回的某个字段作为表单数据 默认data
        deleteApi: tenantLibraryApi.tenantLibraryChangeDelete // 批量删除
      },

      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: false, // 继承el-table所有属性,ysn-table的属性
        operationWidth: '200',
        highlightCurrentRow: true
      },
      dialogType: 'add', // add=新增，edit=编辑
      formData: {
        fileList: []
      },
      updateNum: 0 // 数据更新
    }
  },
  methods: {
    /**
	 * 哪种状态可以删除
	 * @param row
	 * @returns {boolean}
	 */
    deleteTable(row) {
      return row.checkStatus !== 3
    },
    // 关闭弹窗
    cloneDialog() {
      this.isShowDialog = !this.isShowDialog
    },
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      console.log('请求之前数据处理', data)
      // 数据单独处理后returnData, 可返回data模板或者额外处理后的searchFormData
      return data
      //   return data
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
      console.log(row.checkStatus)
      this.formData = row
      if (row.checkStatus === 1 || row.checkStatus === 4) {
        // if (row.checkStatusName.indexOf('OA') !== -1) {
        //   this.$router.push({ name: 'TenantLibraryChangeExamine', query: { id: row.id, status: row.checkStatus }})
        // } else {
        this.dialogType = 'edit'
        this.isShowDialog = true
        // }
      } else {
        // if (row.checkStatusName.indexOf('OA') !== -1) {
        //   this.$router.push({ name: 'TenantLibraryChangeExamine', query: { id: row.id, status: row.checkStatus }})
        // } else {
        this.dialogType = 'details'
        this.isShowDialog = true
        // }
      }
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
