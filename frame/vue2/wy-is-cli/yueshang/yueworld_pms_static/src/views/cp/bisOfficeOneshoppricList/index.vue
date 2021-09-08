<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 基础数据(写字楼)————写字楼管理————一铺一价
-->
<template>
  <div class="app-page-main">
    <FormItem @searchTable="searchTable" />
    <TableList :table-data="tableData" :page="page" @toUpdate="toUpdate" />
  </div>
</template>

<script>
import FormItem from './blocks/formItem'
import TableList from './blocks/tableList'
import { buildingApi } from '@/api'
export default {
  name: 'BisOfficeOneshoppricList',
  components: { FormItem, TableList },
  data() {
    return {
      page: { pageNo: 1, pageSize: 20 }, // 页数
      tableData: [] // 表格数据
    }
  },
  mounted() {
    this.getBisOfficeoneShopPricelist()
  },
  methods: {
    // 获取表格数据
    getBisOfficeoneShopPricelist(tableData) {
      buildingApi.bisOfficeoneShopPricelist(tableData).then(res => {
        this.tableData = res.tableData
      })
    },
    // 搜索事件
    searchTable(data) {
      this.getBisOfficeoneShopPricelist(data)
    },
    // 更新列表
    toUpdate() {
      this.getBisOfficeoneShopPricelist()
    }
  }
}
</script>
