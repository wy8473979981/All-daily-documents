<template>
  <div>
    <breadcrumb />
    <query-form :def="formDefs" @query="onQuery"></query-form>
    <query-table
      :columns="columns"
      ref="tb"
      title="发票列表"
      api="/clientend/invoicing/getApplyListPage"
      class="mt-4"
    >
      <template slot="extra">
        <el-button type="primary" size="mini" @click="onAdd">新建订单</el-button>
      </template>
      <template v-slot:opt="{row}">
        <el-button type="text" size="mini" @click="onLink(row)">查看</el-button>
        <el-button type="text" size="mini" @click="onLink(row)">编辑</el-button>
        <el-button type="text" size="mini" @click="onLink(row)">签约</el-button>
        <el-button type="text" size="mini" @click="onLink(row)">补充文件</el-button>
      </template>
    </query-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import { columns, formDefs } from './config'
@Component
export default class Product extends Vue {
  @Ref() tb!: any

  formDefs = formDefs

  columns = columns

  onQuery (params: any = {}) {
    this.tb.query(params)
  }

  onAdd () {
    this.$router.push('')
  }

  mounted () {
    this.onQuery()
  }
}
</script>
