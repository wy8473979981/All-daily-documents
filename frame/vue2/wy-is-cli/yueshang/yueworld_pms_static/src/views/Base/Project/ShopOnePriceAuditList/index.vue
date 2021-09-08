<!--
 * @Author: qiuyw
 * @LastEditors: Please set LastEditors
 * @Description: 一铺一价审批
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-form="searchForm"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :table-order-config="tableOrderConfig"
      :table-desc-config="tableDescConfig"
      :before-qeury-data="beforeQeuryData"
      persmission="ShopOnePriceAuditList"
      @afterQueryData="afterQueryData"
      @row-click="rowClick"
    />
  </div>
</template>
<script>
// 请求api
import { baseProjectApi } from '@/api'
import { searchConfig, tableConfig, tableDescConfig, statusSearchConfig } from './config'

export default {
  name: 'ShopOnePriceAuditList',
  components: {},
  props: {},
  data() {
    return {
      // 搜索form
      searchForm: {
        programName: []
      },
      // 状态筛选
      statusSearchConfig: statusSearchConfig.call(this),
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
        api: baseProjectApi.shopOnePriceAuditList // 接口请求方式
      },
      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: false, // 继承el-table所有属性,ysn-table的属性
        operationWidth: '200',
        highlightCurrentRow: true
      },
      dialogType: 'add', // add=新增，edit=编辑
      dialogNum: 0,
      formData: {
        fileList: []
      }
    }
  },
  methods: {
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      // 数据单独处理后returnData, 可返回data模板或者额外处理后的searchFormData
      // return dataTmp
      return data
    },
    //  数据请求后把数据返回外部
    afterQueryData(data) {
      this.reqData = data
      // console.log(data)
    },
    /**
     * @method:rowClick
     * @param {*} row
     * @desc:列表单行点击
     */
    rowClick(row) {
      const { checkStatus } = row
      this.$router.push({
        // 根据状态值跳转编辑或者详情
        name: ![1, 4].includes(checkStatus) ? 'ShopOnePriceAuditDetail' : 'ShopOnePriceAuditEdit',
        query: {
          id: row.id
        }
      })
    },
    /**
     * @method:handlerUpdateList
     * @desc：更新列表
     */
    handlerUpdateList() {
      console.log('更新列表')
    }
  }
}
</script>
