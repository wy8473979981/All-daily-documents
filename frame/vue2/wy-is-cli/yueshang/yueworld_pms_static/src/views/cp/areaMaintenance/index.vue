<!--
 * @Description:基础数据————区域维护
 * @Author: zengcheng
 * @Date: 2021-06-25 11:05:14
 * @LastEditors: zengcheng
 * @LastEditTime: 2021-06-25 14:39:07
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
      basicApi.areaMaintenanceList().then(res => {
        this.tableList = res
        console.log(this.tableList)
      })
    }
  }
}
</script>
