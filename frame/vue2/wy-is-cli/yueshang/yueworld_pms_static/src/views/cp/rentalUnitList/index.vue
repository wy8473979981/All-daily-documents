<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
-->
<template>
  <div class="rentalUnitBox app-page-main">
    <FormItem :table-data="tableData" />
    <Table :table-data="tableData" />
  </div>
</template>
<script>
import FormItem from './blocks/formItem'
import Table from './blocks/table'
import { rentalUnitApi } from '@/api'
export default {
  name: 'RentalUnitList',
  components: { FormItem, Table },
  data() {
    return { tableData: {}// 表格数据
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.searchTable()
  },
  methods: {
    // 表格数据方法
    searchTable(data) {
      this.getSearchTable(data)
    },
    // 表格列表数据接口
    getSearchTable(datalist) {
      rentalUnitApi.bisOfficeRentalUnitList(datalist).then(res => {
        this.tableData = res
      })
    }
  }
}
</script>
<style lang="scss" scoped>
	@import "./index.scss";
</style>
