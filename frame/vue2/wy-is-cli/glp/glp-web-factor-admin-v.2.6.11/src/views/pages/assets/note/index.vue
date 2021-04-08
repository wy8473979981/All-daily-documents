<template>
<div>
  <query-form :def="formDefs" @query="onQuery"></query-form>
  <query-table checkable :columns="columns" ref="tb" api="/assets/notes/paged" class="mt-4">
    <template v-slot:opt="{row}">
      <el-button type="text" @click="onView(row)">详情</el-button>
      <el-button type="text" @click="onReturn(row)">退回</el-button>
    </template>
  </query-table>
</div>
</template>

<script lang="ts">

import { Vue, Component, Ref } from 'vue-property-decorator'
import { formDefs, columns } from './config'

@Component
export default class Note extends Vue {
  @Ref() tb!: any

  formDefs = formDefs

  columns = columns

  onQuery (params: any = {}) {
    this.tb.query(params)
  }

  onView (row: any) {
    this.$router.push(`/assets/note/detail/${row.id}`)
  }

  onReturn (rows: any[]) {
    // TODO
  }

  mounted () {
    this.onQuery()
  }
}
</script>
