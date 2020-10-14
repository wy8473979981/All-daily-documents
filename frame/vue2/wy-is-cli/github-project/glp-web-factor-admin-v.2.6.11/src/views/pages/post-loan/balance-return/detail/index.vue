<template>
  <div>
    <query-form :def="formDefs" @query="onQuery"></query-form>
    <query-table
      :columns="columns"
      ref="tb"
      api="/comp/postloan/balance/balacneReturn"
      class="mt-4"
    >
      <template slot="extra">
        <el-button type="primary" size="small">导出</el-button>
      </template>
      <template v-slot:balanceRetrunNo="{row}">
        <el-button type="text" @click="onView(row)">{{row.balanceRetrunNo}}</el-button>
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

  onQuery (params: any = {}) {
    this.tb.query(params)
  }

  mounted () {
    this.onQuery()
  }

  onView (row: any) {
    this.$router.push(`/post-loan/balance/transfer-flow/${row.companyName}`)
  }
}
</script>

<style lang="scss" module>
</style>
