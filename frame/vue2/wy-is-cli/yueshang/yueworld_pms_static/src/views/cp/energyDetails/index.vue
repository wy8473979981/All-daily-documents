<!--
 * @Descripttion: 预算调整列表页面
 * @Author: zhb
 * @Date: 2021-05-19 09:27:55
 * @LastEditors: zhb
-->
<template>
  <div class="subject-config-box">
     <FormItem></FormItem>
     <TableList></TableList>
  </div>
</template>

<script>
import FormItem from './blocks/formItem'
import TableList from './blocks/tableList'
export default {
  name: 'EnergyDetails',
  components: {
    FormItem,
    TableList
  },
  data() {
    return {
  
    }
  },

  created() {},
  methods: {

  }
}

</script>
