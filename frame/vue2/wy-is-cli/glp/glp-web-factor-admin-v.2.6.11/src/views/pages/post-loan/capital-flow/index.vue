<template>
  <div>
    <query-form :def="formDefs" @query="onQuery" :mappingOptions="{dateType: 'F'}"></query-form>
    <query-table
      :columns="columns"
      checkable
      ref="tb"
      api="/backend/clearing/listPage"
      class="mt-4"
    >
      <template v-slot:orderNumber="row">
        <el-button type="text" @click="()=>onViewOrder(row)">{{row.row.orderNumber}}</el-button>
      </template>
      <template v-slot:settlementNo="row">
        <el-button
          type="text"
          @click="()=>onJump(`/post-loan/settlement/detail/${row.row.settlementNo}`)"
        >{{row.row.settlementNo}}</el-button>
      </template>
    </query-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import { formDefs, columns } from './config'
@Component
export default class Index extends Vue {
  $style!: any

  @Ref() tb!: any

  formDefs = formDefs

  columns = columns

  onQuery(params: any = {}) {
    this.tb.query(params)
  }

  onViewOrder(row: any) {
    this.$router.push(`/finance/order/detail/${row.row.orderNumber}`)
  }

  mounted() {
    this.onQuery()
  }

  onJump(url: string) {
    this.$router.push(url)
  }
}
</script>

<style lang="scss" module>
</style>
