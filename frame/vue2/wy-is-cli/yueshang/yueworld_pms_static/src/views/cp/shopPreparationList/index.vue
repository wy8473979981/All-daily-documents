<template>
  <div class="app-page-main">
    <FormItem />
    <TableList />
    <!-- <takeApartShopPop /> -->
    <salePop />
    <salePopTwo />
  </div>
</template>
<script>
import FormItem from './blocks/formItem'
import TableList from './blocks/tableList'
import salePop from './components/salePop'
import salePopTwo from './components/salePopTwo'
export default {
  name: 'ShopPreparationList',
  components: {
    FormItem,
    TableList,
    salePopTwo,
    salePop
  },
  data() {
    return {
    }
  },
  computed: {},

  methods: {

  }
}
</script>

