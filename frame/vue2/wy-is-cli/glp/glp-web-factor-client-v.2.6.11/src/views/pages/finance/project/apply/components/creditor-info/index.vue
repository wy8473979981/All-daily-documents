<template>
<div>
<glp-section title="请选择基础债权">
  <query-form :def="formDefs" @query="onQuery" inline :span="12" class="mt-2"></query-form>
  <query-table :columns="columns" :checkedRows.sync="checkedRows" ref="tb" api="/finance/accounts/paged" row-key="id" class="mt-4">
    <template v-slot:opt="{row}">
      <el-button type="text" @click="onView(row)">详情</el-button>
    </template>
  </query-table>
</glp-section>
</div>
</template>

<script lang="ts">

import { Vue, Component, Ref } from 'vue-property-decorator'
import { formDefs, columns } from './config'

@Component
export default class CreditorInfo extends Vue {
  @Ref() tb!: any

  formDefs = formDefs

  columns = columns

  checkedRows: any[] = []

  onView (row: any) {
    this.$router.push(`/finance/debt/detail/${row.id}`)
  }

  onQuery (params: any = {}) {
    this.tb.query(params)
  }

  mounted () {
    this.onQuery()
  }
}
</script>
