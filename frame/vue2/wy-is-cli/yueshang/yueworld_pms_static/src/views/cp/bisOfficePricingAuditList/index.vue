<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 基础数据(写字楼)————写字楼管理———一铺一价审核
-->
<template>
  <div>
    <FormItem @searchTable="searchTable" @tableStatusList="tableStatusList" />
    <TableList :table-data="tableData" :page="page" @toUpdate="toUpdate" />
  </div>
</template>

<script>
import FormItem from './blocks/formItem'
import TableList from './blocks/tableList'
import { buildingApi } from '@/api'
export default {
  name: 'BisOfficePricingAuditList',
  components: { FormItem, TableList },
  data() {
    return {
      tableData: [], // 表格数据
      page: { pageNo: 1, pageSize: 10 } // 页数
    }
  },
  mounted() {
    this.getBisOfficeoneShopPricAuditList()
  },
  methods: {
    // 搜索
    searchTable(data) {
      this.getBisOfficeoneShopPricAuditList(data)
    },
    //  状态搜索
    tableStatusList(data) {
      this.getBisOfficeoneShopPricAuditList(data)
    },
    toUpdate() {},
    // 获取表格数据
    getBisOfficeoneShopPricAuditList(tableData) {
      buildingApi.bisOfficeoneShopPricAuditList(tableData).then(res => {
        this.tableData = res.tableData
      })
    }
  }
}
</script>
