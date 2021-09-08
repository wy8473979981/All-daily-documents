<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 基础数据(写字楼)————写字楼管理————楼层维护
-->
<template>
  <div class="app-page-main">
    <!-- 表单搜索组件 -->
    <FormItem @tableList="tableList" />
    <!-- 表格组件 -->
    <TableList :table-data="tableData" :page="page" @closeDialogTableList="closeDialogTableList" />
  </div>
</template>

<script>
import { buildingApi } from '@/api'
import FormItem from './blocks/formItem'
import TableList from './blocks/tableList'
import { testApi } from '@/api'
const dataTmp = {
  programName: 'FP-202030000',
  buildingName: '测试项目',
  floorId: '珠海市酒店管理有限公司',
  floorName: '普票',
  floorGrossArea: 1,
  floorLeasableArea: 1,
  floorStatus: '2020-05-11'
}
export default {
  name: 'BisOfficeFloorList',
  components: { FormItem, TableList },
  data() {
    return {
      page: { pageNo: 1, pageSize: 20 }, // 页数
      tableData: {} // 表格数据
    }
  },
  mounted() {
    this.getTablelist()
    this.getList()
  },
  methods: {
    // 获取列表数据(模拟)
    async getList() {
      const res = await testApi.getList(dataTmp)
      console.log(res)
      this.tableData = res
      // this.total = res.total
    },
    // 表格数据
    tableList(data) {
      this.getTablelist(data)
    },
    getTablelist(datalist) {
      buildingApi.bisOfficeFloorList(datalist).then(res => {
        // this.tableData = res
      })
    },
    // 刷新列表
    closeDialogTableList() {
      this.getTablelist()
    }
  }
}
</script>
