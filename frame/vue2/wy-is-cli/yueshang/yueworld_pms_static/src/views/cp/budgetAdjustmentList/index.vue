<!--
 * @Descripttion: 预算调整列表页面
 * @Author: zhb
 * @Date: 2021-05-19 09:27:55
 * @LastEditors: fhj
-->
<template>
  <div class="app-page-main">
    <FormItem />
    <TableList />
  </div>
</template>

<script>

import FormItem from './blocks/formItem'
import TableList from './blocks/tableList'
export default {
  name: 'BudgetAdjustmentList',
  components: {
    FormItem,
    TableList

  },
  data() {
    return {

    }
  },
  methods: {

  }
}

</script>

