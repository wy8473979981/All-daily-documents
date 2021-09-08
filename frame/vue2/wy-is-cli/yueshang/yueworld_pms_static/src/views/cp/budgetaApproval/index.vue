<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
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
  name: 'BudgetaApproval',
  components: { FormItem, TableList },
  data() {
    return {

    }
  },
  computed: {},
  created() {},
  methods: {}
}
</script>

