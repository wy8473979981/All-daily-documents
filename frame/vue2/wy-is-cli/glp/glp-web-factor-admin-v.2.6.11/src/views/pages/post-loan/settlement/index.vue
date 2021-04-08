<template>
  <div>
    <query-form :def="formDefs" @query="onQuery" :mappingOptions="{dateType: 'F'}"></query-form>
    <query-table :columns="columns" ref="tb" api="/backend/settlement/listPage" class="mt-4">
      <template slot-scope="{row}" slot="settlementNo">
        <el-button @click="settlementDetail(row)" type="text">{{row.settlementNo}}</el-button>
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

  settlementDetail(row: any) {
    this.$router.push(`/post-loan/settlement/detail/${row.settlementNo}`)
  }

  mounted() {
    this.onQuery()
  }
}
</script>

<style lang="scss" module>
</style>
