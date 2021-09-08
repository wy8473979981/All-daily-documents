<!--
 * @Descripttion: 科目配置列表页面
 * @Author: zhb
 * @Date: 2021-05-19 09:27:55
 * @LastEditors: zhb
-->
<template>
  <div class="subject-config-box">
    <FormItem></FormItem>
    <TablaList></TablaList>

  </div>
</template>

<script>
import FormItem from './blocks/formItem'
import TablaList from './blocks/tablaList'
export default {
  name: 'SubjectConfig',
  components: {
    FormItem,
    TablaList
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
