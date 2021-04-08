<template>
<div>
  <query-form :def="formDefs" @query="onQuery"></query-form>
  <query-table :columns="columns" ref="tb" :title="title" api="/base/calendar" class="mt-4">
    <template slot="extra">
      <el-button type="primary" size="small" @click="onAdd">新 增</el-button>
    </template>
    <template v-slot:opt="{row}" >
      <el-button type="text" @click="onDelete(row)">删 除</el-button>
    </template>
  </query-table>
</div>
</template>

<script lang="ts">

import { Vue, Component, Ref } from 'vue-property-decorator'
import { formDefs, columns } from './config'
import { delDataErr } from '@/api/systemSet'

@Component
export default class Query extends Vue {
  $style!: any;
  @Ref() tb!: any

  formDefs = formDefs
  title = '异常日列表'
  columns = columns

  onQuery (params: any = {}) {
    this.tb.query(params)
  }

  onRefresh () {
    this.tb.refresh()
  }

  onDelete (row: any) {
    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      delDataErr(row.id).then((data) => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.onRefresh()
      })
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      })
    })
  }

  onAdd () {
    this.$router.push('/base/calendar/add')
  }

  mounted () {
    this.onQuery()
  }
}
</script>

<style lang="scss" module>

</style>
