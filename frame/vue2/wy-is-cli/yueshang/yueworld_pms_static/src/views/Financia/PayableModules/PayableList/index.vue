<!--
 * @Author: jllk
 * @LastEditors: Please set LastEditors
 * @Description: 应付单
-->
<template>
  <div class="app-page-main ">
    <YsnPageContent
      :status-search-config="statusSearchConfig"
      :search-config="searchConfig"
      :search-form="searchForm"
      :query-config="queryConfig"
      :table-config="tableConfig"
      :search-column="3"
      :table-order-config="tableOrderConfig"
      :before-qeury-data="beforeQeuryData"
      @afterQueryData="afterQueryData"
      @row-click="rowClick"
    />
    <!-- 详情弹窗 -->
    <PayableEnterAdd
      :is-show-dialog="dialogAdd.visible"
      :form-data="dialogAdd.record"
      @closeDialog="Object.assign(dialogAdd, { visible: false, record:{}})"
    />
  </div>
</template>
<script>
import PayableEnterAdd from './blocks/PayableEnterAdd.vue'
// 请求api
import { PayableApi } from '@/api'
import { searchConfig, tableConfig, statusSearchConfig } from './config'
export default {
  name: 'PayableList',
  components: { PayableEnterAdd },
  props: {},
  data() {
    return {
      // 搜索form
      searchForm: {
        fuzzyEnquiry: '', // 模糊查询
        programName: [], // 项目
        feeName: [], // 费项
        creatDate: '' // 创建时间

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
        api: PayableApi.PayableList, // 接口请求方式
        dataKey: 'list' // 取请求接口后返回的某个字段作为表单数据 默认list
      },

      // ysn-table额外配置 用于打开checkbox等
      tableOrderConfig: {
        checkbox: false // 继承el-table所有属性,ysn-table的属性
      },
      // 详情弹窗
      dialogAdd: {
        visible: false,
        record: {}
      },

      // 请求后的数据
      reqData: {}
    }
  },
  created() {
    if (this.$route.query.id) {
      const datas = {
        id: this.$route.query.id
      }
      this.PayableEnterAdd(datas) // 详情数据接口
    }
  },
  methods: {
    // 列表数据请求之前数据处理
    beforeQeuryData(data) {
      // 数据单独处理后returnData, 可返回data模板或者额外处理后的searchFormData
      return data
    },
    //  数据请求后把数据返回外部
    afterQueryData(data) {
      return data.TableData
    },
    // 刷新列表
    successTableList() {
      const that = this
      // 请求api
      PayableApi.PayableList(that.searchForm).then((res) => {
        if (res.data && res.data.length > 0) {
          that.tableData = res.TableData
        }
      })
    },
    // 单行点击弹出详情弹窗
    rowClick(record) {
      Object.assign(this.dialogAdd, { visible: true, record })
    }
  }
}
</script>
