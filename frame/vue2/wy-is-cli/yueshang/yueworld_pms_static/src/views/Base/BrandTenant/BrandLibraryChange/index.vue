<!--
 * @Author: shuyuan
 * @LastEditors: shuyuan
 * @Description: 品牌变更列表
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-column="3"
      :search-form="searchForm"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :delete-table="deleteTable"
      delete-message="审核通过不可删除"
      persmission="BrandLibrary"
      :before-qeury-data="beforeQeuryData"
      @row-click="rowClick"
    >
      <!-- 列表操作功能 -->
      <template #tableRight />
    </YsnPageContent>
    <editDialog v-if="dialogType=='edit'" :form-data="formData" :is-show-dialog="isShowDialog" :dialog-type="dialogType" @cloneDialog="cloneDialog" />
    <detailsDialog v-if="dialogType=='details'" :form-data="formData" :is-show-dialog="isShowDialog" :dialog-type="dialogType" @cloneDialog="cloneDialog" />
  </div>
</template>
<script>
// 请求api
import { brandLibraryApi } from '@/api'
import { searchConfig, tableConfig, statusSearchConfig } from './config'
import editDialog from './blocks/editDialog'
import detailsDialog from './blocks/detailsDialog'
export default {
  name: 'BrandLibrary',
  components: {
    editDialog,
    detailsDialog
  },
  data() {
    return {
      tableConfig: tableConfig.call(this),
      isShowDialog: false, // 控制弹窗
      dialogType: 'add', // add=新增，edit=编辑
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '', // 模糊搜索
        brandLevel: []
      },
      // 状态筛选
      statusSearchConfig: statusSearchConfig.call(this),
      // 搜索配置 见ysn-seniorSearch
      searchConfig: searchConfig.call(this),
      // 接口请求配置
      queryConfig: {
        api: brandLibraryApi.brandLibraryChangeList, // 接口请求方式
        dataKey: 'list', // 取请求接口后返回的某个字段作为表单数据 默认data
        deleteApi: brandLibraryApi.brandLibraryChangeDelete // 批量删除
      }
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
      return data
    },
    rowClick(row) {
      console.log(row.checkStatus)
      this.formData = row
      if (row.checkStatus === 1 || row.checkStatus === 4) {
        // if (row.checkStatusName.indexOf('OA') !== -1) {
        //   this.$router.push({ name: 'BrandLibraryChangeExamine', query: { id: row.id, status: row.checkStatus }})
        // } else {
        this.dialogType = 'edit'
        this.isShowDialog = true
        // }
      } else {
        // if (row.checkStatusName.indexOf('OA') !== -1) {
        //   this.$router.push({ name: 'BrandLibraryChangeExamine', query: { id: row.id, status: row.checkStatus }})
        // } else {
        this.dialogType = 'details'
        this.isShowDialog = true
        // }
      }
    }
  }
}
</script>
<style lang="scss">
</style>
