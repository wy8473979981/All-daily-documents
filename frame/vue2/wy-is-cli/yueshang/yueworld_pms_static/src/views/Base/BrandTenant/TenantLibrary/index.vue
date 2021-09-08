<!--
 * @Author: shuyuan
 * @LastEditors: shuyuan
 * @Description:商家库
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-form="searchForm"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-desc-config="tableDescConfig"
      :before-qeury-data="beforeQeuryData"
      :table-order-config="tableOrderConfig"
      persmission="RegionMaintain"
      @afterQueryData="afterQueryData"
      @row-click="rowClick"
    >
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn @click="cityClick">新增</ysn-btn>
        <ysn-btn type="info" class="ml-12 mr-12">导入</ysn-btn>
        <ysn-btn type="reset">导出</ysn-btn>
      </template>
    </YsnPageContent>

    <addDialog v-if="dialogType==='add' || dialogType==='edit'" :form-data="formData" :is-show-dialog="isShowDialog" :dialog-type="dialogType" @cloneDialog="cloneDialog" />
    <detailsDialog v-if="dialogType==='details'" :form-data="formData" :is-show-dialog="isShowDialog" :dialog-type="dialogType" @cloneDialog="cloneDialog" />
  </div>
</template>
<script>
// 请求api
import { tenantLibraryApi } from '@/api'
import { searchConfig, statusSearchConfig, tableConfig, tableDescConfig } from './config'
import addDialog from './blocks/addDialog'
import detailsDialog from './blocks/detailsDialog'
export default {
  name: 'TenantLibrary',
  components: {
    addDialog,
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
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),
      tableDescConfig: tableDescConfig,

      // 接口请求配置
      queryConfig: {
        api: tenantLibraryApi.tenantLibraryList, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认data
      },

      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: false, // 继承el-table所有属性,ysn-table的属性
        operationWidth: '200',
        highlightCurrentRow: true
      },
      dialogType: null, // add=新增，edit=编辑
      formData: {},
      updateNum: 0 // 数据更新
    }
  },
  methods: {
    // 关闭弹窗
    cloneDialog() {
      this.isShowDialog = !this.isShowDialog
      this.dialogType = null
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
      this.formData = row
      if (row.checkStatus === 1 || row.checkStatus === 4) {
        this.dialogType = 'edit'
        this.isShowDialog = true
      } else {
        this.dialogType = 'details'
        this.isShowDialog = true
      }
    },
    /**
     * @method:cityClick
     * @desc:新增
     */
    cityClick() {
      this.dialogType = 'add'
      this.isShowDialog = true
      this.formData = {
        tenantBrand: [{ attachment: [] }],
        tenantContacts: [{}],
        tenantLicense: [{ tenantLicenseAttachment: [] }],
        tenantLetter: [{}],
        tenantCredit: [{}]
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
