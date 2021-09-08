<!--
 * @Descripttion: 基础数据(写字楼)————写字楼管理————企业库变更列表
 * @Author: zhb
 * @Date: 2021-05-19 09:27:55
 * @LastEditors: zengcheng
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-form="searchForm"
      :search-column="3"
      :query-config="queryConfig"
      :table-config="tableConfig"
      persmission="AgreementIntention"
      @row-click="rowClick"
    />
    <!-- <FormItem :overall="overall" /> -->
    <DetailsDialog v-if="isStatus==='0'" :is-show-dialog="isShowDialog" :edit-list="editList" :external="isShowDialog" @cloneDialog="cloneDialog" />
    <EditDialog v-if="isStatus==='1'" :is-show-dialog="isShowDialog" :edit-list="editList" :external="isShowDialog" @cloneDialog="cloneDialog" />
  </div>
</template>

<script>
import { buildingApi } from '@/api'
import { searchConfig, tableConfig, statusSearchConfig } from './config'
import DetailsDialog from './blocks/detailsDialog.vue'
import EditDialog from './blocks/editDialog.vue'
// import FormItem from './blocks/formItem'
export default {
  name: 'EnterpriseLibraryChange',
  components: {
    DetailsDialog,
    EditDialog
    // FormItem

  },
  data() {
    return {
      editList: { // 编辑数据
        formData: {},
        contractFormData: {},
        billingTableData: [],
        contactsTableData: [],
        licenceTableData: [],
        sincerityTableData: []
      }, // 编辑数据
      isStatus: '', // 显示编辑详情弹窗控制
      isShowDialog: false, // 弹窗
      overall: {},
      searchForm: {
        tenantName: '',
        programName: '',
        tenantType: ''
      },
      statusSearchConfig: statusSearchConfig.call(this),
      searchConfig: searchConfig.call(this),
      // 状态搜索值
      statucSearchValue: [],
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),
      // 接口请求配置
      queryConfig: {
        api: buildingApi.enterpriseLibraryChange, // 接口请求方式
        dataKey: 'data' // 取请求接口后返回的某个字段作为表单数据 默认data
      }
    }
  },
  mounted() {
    // this.getlist()
  },
  methods: {
    cloneDialog() {
      this.isShowDialog = !this.isShowDialog
    },
    rowClick(row) {
      buildingApi.enterpriseLibraryEdit().then(res => {
        this.editList = JSON.parse(JSON.stringify(res))
        console.log(this.editList)
        if (row.checkStatus === '0') { // 详情
          this.isStatus = row.checkStatus
          this.isShowDialog = !this.isShowDialog
          return
        }
        // 编辑
        this.isStatus = row.checkStatus
        this.isShowDialog = !this.isShowDialog
      })
    }
    // getlist() {
    //   buildingApi.enterpriseLibraryChange().then(res => {
    //     console.log(res)
    //     this.overall = res
    //   })
    // }
  }
}

</script>
