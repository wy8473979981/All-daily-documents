<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 基础数据(写字楼)————写字楼管理————拆合铺
-->
<template>
  <div class="app-page-main">
    <!-- 表单搜索组件 -->
    <FormItem @tableStatusList="tableStatusList" />
    <!-- 表格组件 -->
    <TableList :table-data="tableData" @refresh="refresh" />
  </div>
</template>

<script>
import { buildingApi } from '@/api'
import FormItem from './blcoks/formIitem'
import TableList from './blcoks/tableList'
//  import TableList from './blocks/tableList'
export default {
  name: 'BisOfficeProjectList',
  components: { FormItem, TableList },
  data() {
    return {
      tableData: {} // 表格数据
    }
  },
  mounted() {
    this.getBisOfficPavinList()
  },
  methods: {
    //   传过来的状态
    tableStatusList(data) {
      console.log(data)
      this.getBisOfficPavinList(data)
    },
    //  表格数据
    getBisOfficPavinList(data) {
      buildingApi.bisOfficPavinList(data).then(res => {
        this.tableData = res
      })
    },
    // 刷新列表
    refresh() {
      this.getBisOfficPavinList()
    }
  }
}
</script>
