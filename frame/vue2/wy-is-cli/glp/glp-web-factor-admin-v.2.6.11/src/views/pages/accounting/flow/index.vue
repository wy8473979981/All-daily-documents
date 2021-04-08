<template>
  <div>
    <query-form :def="formDefs" @query="onQuery"></query-form>
    <query-table :columns="columns" ref="tb" api="/glp-fae/acctransaction/pageQuery" class="mt-4">
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
}
</script>

<style lang="scss" module></style>
