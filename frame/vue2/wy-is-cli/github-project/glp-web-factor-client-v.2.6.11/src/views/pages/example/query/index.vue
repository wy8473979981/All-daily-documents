<template>
<div>
  <el-select v-model="form.dept">
    <el-option label="人事部" value="HR"></el-option>
    <el-option label="IT部" value="IT"></el-option>
  </el-select>
  <el-select v-model="form.user">
    <dict-options async reload name="users" :form="form"></dict-options>
  </el-select>
  <el-select v-model="form.status">
    <dict-options name="status"></dict-options>
  </el-select>

  <query-form :def="formDefs" @query="onQuery"></query-form>
  <query-table :columns="columns" ref="tb" api="/comp/datatable/paged" class="mt-4">
    <template slot="extra">
      <el-button type="primary" size="small">新 增</el-button>
    </template>
    <template v-slot:opt="{row}">
      <el-button type="text" @click="onEdit(row)">编辑</el-button>
      <el-button type="text" @click="onEdit(row)">详情</el-button>
    </template>
  </query-table>
</div>
</template>

<script lang="ts">

import { Vue, Component, Ref } from 'vue-property-decorator'
import { formDefs, columns } from './config'

@Component
export default class Query extends Vue {
  @Ref() tb!: any

  formDefs = formDefs

  columns = columns

  form = {
    dept: '',
    user: '',
    status: ''
  }

  onQuery (params: any = {}) {
    this.tb.query(params)
  }

  onEdit (row: any) {
    this.$router.push(`/example/query/edit/${row.id}`)
  }

  mounted () {
    this.onQuery()
  }
}
</script>
