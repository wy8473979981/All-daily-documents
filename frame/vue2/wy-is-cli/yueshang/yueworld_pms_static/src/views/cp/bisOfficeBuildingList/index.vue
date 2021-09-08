
<template>
  <!-- 基础数据(写字楼)———写字楼管理————楼栋维护 -->
  <div class="app-page-main">
    <FormItem @searchTable="searchTable" />
    <TableList :table-data="tableData" @successTableList="successTableList" />
  </div>
</template>

<script>
import FormItem from './blocks/formItem'
import TableList from './blocks/tableList'
import { buildingApi } from '@/api'
export default {
  name: 'BisOfficeBuildingList',
  components: { FormItem, TableList },
  data() {
    return {
      tableData: {}, // 表格数据
      page: { // 页数
        pageNo: 1,
        pageSize: 20
      }
    }
  },
  mounted() {
    this.getSearchTable()
  },
  methods: {
    // 表格数据方法
    searchTable(data) {
      this.getSearchTable(data)
    },
    // 表格数据接口
    getSearchTable(datalist) {
      buildingApi.builingList({ ...datalist, page: this.page }).then(res => {
        const obj = { ...res }
        obj.tableData = [...obj.tableData, ...obj.tableData, ...obj.tableData, ...obj.tableData, ...obj.tableData, ...obj.tableData, ...obj.tableData]
        this.tableData = obj
      })
    },
    // 新增成功刷新列表
    successTableList() {
      this.getSearchTable()
    }
  }
}
</script>
