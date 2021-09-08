<!--
 * @Description:基础数据(写字楼)--项目维护
 * @Author: zengcheng
 * @Date: 2021-05-28 17:53:28
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-06-25 15:12:28
-->
<template>
  <div class="app-page-main">
    <Form />
    <Table :table-list="tableList" />
  </div>
</template>
<script>
import Form from './block/form'
import Table from './block/table'
import { buildingApi } from '@/api'
export default {
  name: 'BisOfficeProjectMaintenance',
  components: { Form, Table },
  data() {
    return {
      tableList: {}
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      buildingApi.bisOfficeProjectList().then(res => {
        this.tableList = res
      })
    }
  }
}
</script>
