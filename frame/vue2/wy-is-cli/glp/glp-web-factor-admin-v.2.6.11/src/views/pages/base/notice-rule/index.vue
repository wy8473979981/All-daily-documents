<template>
<div>
  <query-table :columns="columns" ref="tb" :title="title" api="/base/notice-rule/paged" class="mt-4">
    <template v-slot:opt="{row}" >
      <el-button type="text" @click="onSet(row)">设 置</el-button>
    </template>
  </query-table>
</div>
</template>

<script lang="ts">

import { Vue, Component, Ref } from 'vue-property-decorator'
import { columns } from './config'

@Component
export default class Query extends Vue {
  $style!: any;
  @Ref() tb!: any

  title = '通知规则管理'
  columns = columns

  onQuery (params: any = {}) {
    this.tb.query(params)
  }

  onRefresh () {
    this.tb.refresh()
  }

  onSet (row: any) {
    this.$router.push(`/base/notice-rule/edit/${row.id}`)
  }

  mounted () {
    this.onQuery()
  }
}
</script>

<style lang="scss" module>

</style>
