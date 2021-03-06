<template>
  <div>
    <query-form :def="formDefs" @query="onQuery"></query-form>
    <query-table :columns="columns" checkable ref="tb" api="/comp/postloan/balance/transferflow" class="mt-4">
      <template slot="extra">
        <el-button type="danger" size="small">导出</el-button>
      </template>
    </query-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import { formDefs, columns } from './config'
@Component
export default class Index extends Vue {
  $style!: any;

  @Ref() tb!: any

  formDefs = formDefs

  columns = columns

  onQuery (params: any = {}) {
    this.tb.query(params)
  }

  mounted () {
    this.onQuery()
  }
}
</script>

<style lang="scss" module>
</style>
