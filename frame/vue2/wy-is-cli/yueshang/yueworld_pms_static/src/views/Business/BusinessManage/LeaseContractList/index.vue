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
  name: 'LeaseContractList',
  components: {
    FormItem,
    TableList
  },
  props: {},
  data() {
    return {

    }
  },
  computed: {},
  methods: {

  }
}
</script>

