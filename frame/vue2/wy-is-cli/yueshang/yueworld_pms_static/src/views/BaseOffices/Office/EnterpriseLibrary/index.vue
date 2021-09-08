<!--
 * @Descripttion: 基础数据(写字楼)————写字楼管理————企业库
 * @Author: zhb
 * @Date: 2021-05-19 09:27:55
 * @LastEditors: zengcheng
-->
<template>
  <div class="app-page-main">
    <!-- <FormItem />
    <TableList :overall="overall" /> -->
    <YsnPageContent
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-form="searchForm"
      :search-column="3"
      :table-desc-config="tableDescConfig"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-order-config="tableOrderConfig"
      persmission="AgreementIntention"
      @row-click="rowClick"
    >

      <!-- 列表操作功能 -->
      <template #tableRight>
        <div class="flex-ju-end">
          <AddDoalog />
          <ysn-btn class="mr-16" type="info">导入</ysn-btn>
          <ysn-btn type="reset">导出</ysn-btn>
        </div>
      </template>
    </YsnPageContent>

    <DetailsDialog :is-show-dialog="isShowDialog" :external="isShowDialog" :edit-list="editList" @cloneDialog="cloneDialog" />

  </div>
</template>
<script>
import { buildingApi } from '@/api'
import { searchConfig, tableConfig, tableDescConfig, statusSearchConfig } from './config'
// import FormItem from './blocks/formItem'
import AddDoalog from './blocks/addDoalog'
import DetailsDialog from './blocks/detailsDialog'
// import TableList from './blocks/tableList'
// import AddDoalog from './blocks/addDoalog.vue'
export default {
  name: 'EnterpriseLibrary',
  components: {
    AddDoalog,
    DetailsDialog
    // TableList

  },
  data() {
    return {
      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: false, // 继承el-table所有属性,ysn-table的属性
        operationWidth: '200',
        highlightCurrentRow: true
      },
      isShowDialog: false,
      editList: {}, // 编辑详情数据
      overall: {},
      // 搜索form
      searchForm: {
        tenantCompanyQuailty: [],
        programName: [],
        tenantType: []
      },
      statusSearchConfig: statusSearchConfig.call(this),
      searchConfig: searchConfig.call(this),
      // 状态搜索值
      statucSearchValue: [],
      // 列表数据统计/描述配置
      tableDescConfig: tableDescConfig,
      // 列表配置 见ysn-table
      tableConfig: tableConfig.call(this),
      // 接口请求配置
      queryConfig: {
        api: buildingApi.buildingList, // 接口请求方式
        dataKey: 'data' // 取请求接口后返回的某个字段作为表单数据 默认data
      }
    }
  },
  mounted() {
    // this.getlist()
  },
  methods: {
    // getlist() {
    //   buildingApi.buildingList().then(res => {
    //     console.log(res)
    //     this.overall = res
    //     console.log(this.overall.data)
    //   })
    // },
    rowClick() {
      buildingApi.enterpriseLibraryEdit().then(res => {
        console.log(res)
        this.isShowDialog = !this.isShowDialog
        this.editList = JSON.parse(JSON.stringify(res))
      })
    },
    // 关闭弹窗
    cloneDialog() {
      this.isShowDialog = !this.isShowDialog
    }
  }
}

</script>
