<!--
 * @Author: fhj
 * @LastEditors: Please set LastEditors
 * @Description:项目维护
-->
<template>
  <div class="app-page-main">
    <YsnPageContent
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-form="searchForm"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :before-qeury-data="beforeQeuryData"
      :delete-table="selectable"
      delete-message="非草稿状态下不可删除"
      persmission="OpenCloseOfficesList"
      @afterQueryData="afterQueryData"
      @row-click="rowClick"
    >
      <!-- 列表操作功能 -->
      <template #tableRight>
        <ysn-btn class="mr-12" @click="handlerAdd">新建</ysn-btn>
      </template>
    </YsnPageContent>
  </div>
</template>
<script>
// 请求api
import { baseOfficesApi } from '@/api'
import { searchConfig, tableConfig, statusSearchConfig } from './config'
export default {
  name: 'OpenCloseOfficesList',
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
      // 接口请求配置
      queryConfig: {
        api: baseOfficesApi.openCloseOfficesList, // 接口请求方式
        deleteApi: baseOfficesApi.openCloseOfficesDelete // 批量删除
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
      console.log('请求之前数据处理', data)
      // 数据单独处理后returnData, 可返回data模板或者额外处理后的searchFormData
      // return dataTmp
      return data
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
      const { checkStatus } = row
      this.$router.push({
        // 根据状态跳转详情或者编辑
        name: [1, 4].includes(checkStatus) ? 'OpenCloseOfficesAdd' : 'OpenCloseOfficesDetail',
        query: {
          id: row.id
        }
      })
    },
    /**
     * 新增
     */
    handlerAdd() {
      this.$router.push({
        name: 'OpenCloseOfficesAdd'
      })
    },
    /**
     * 非草稿状态下禁止选中
     * @param row
     * @returns {boolean}
     */
    selectable: function(row) {
      return row.checkStatus === 1
    }
  }
}
</script>
