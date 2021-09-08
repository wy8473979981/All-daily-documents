<!--
 * @Description: 基础数据————商铺维护
 * @Author: zengcheng
 * @Date: 2021-06-28 13:19:35
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-06-29 10:31:16
-->
<template>
  <div class="app-page-main">
    <List :table-list="tableList" />
  </div>
</template>
<script>
import List from './blocks/list.vue'
import { basicApi } from '@/api'
export default {
  name: 'AreaMaintenance',
  components: { List },
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
      basicApi.shopMaintenanceList().then(res => {
        this.tableList = res
        console.log(this.tableList)
      })
    }
  }
}
</script>
