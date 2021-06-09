<template>
  <div class="tool-bar" type="flex" justify="space-between" align="middle">
    <div>
      <ysNSearch :searchList="searchList" :params="searchParams" @getList="getList" @form-change="handleFormChange"></ysNSearch>
      <ysNTable :tableHeight="this.$store.state.tableHeight" :tableList="tableList" :column="column" class="table"></ysNTable>
      <ysNPaginator :page-info="pageInfo" @handle_paginator="handle_paginator" />
    </div>
  </div>
</template>

<script>
import { handle_paginator, tableData } from '@/mixins';
import columnList from './config/column.js'
import searchList from './config/search.js'
export default {
  mixins: [handle_paginator, tableData],
  data () {
    return {
      pageInfo: {
        rows: 10,
        page: 1,
        sum_num: 0,
      },
      searchParams: {
        appId: null,
        businessId: null,
        dateStart: null,
        dateEnd: null,
      },
      column: columnList.timeTotalList,
      tableList: [],
      searchList: searchList.timeTotalList
    }
  },
  mounted () {
    setTimeout(() => {
      this.$Utils.getDynamicTableHeight(this)
    }, 0)
  },
  methods: {
    handleFormChange (key, data) {
      if (key == 'appId' && data) {
        this.searchParams.businessId = null
      }
    },
    async getList (searchParams) {
      if (searchParams) {
        this.searchParams = JSON.parse(JSON.stringify(searchParams))
      }
      console.log(searchParams)
      let res = await this.$axios.systemServe.getTimeList({
        ...this.pageInfo, searchParams: this.searchParams
      })
      if (res.code == 200) {
        this.tableList = res.data.result
        this.pageInfo.sum_num = res.data.total
      }
    }
  }
}
</script>

<style>
.table {
  /* margin-top: 16px; */
}
</style>
