<template>
<div>
  <glp-card title="数据表格-本地数据">
    <glp-data-table :data-source="dataSource" checkable>
      <el-table-column prop="name" label="姓名" ></el-table-column>
      <el-table-column prop="age" label="年龄" ></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </glp-data-table>
  </glp-card>

  <glp-card title="数据表格-一次性加载" class="mt-4">
    <glp-data-table :loader="loader" ref="localTable">
      <el-table-column prop="name" label="姓名" ></el-table-column>
      <el-table-column prop="age" label="年龄" ></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
    </glp-data-table>
  </glp-card>

  <glp-card title="数据表格-分页加载" class="mt-4">
    <glp-data-table :paged-loader="pagedLoader" ref="pagedTable">
      <el-table-column prop="name" label="姓名" ></el-table-column>
      <el-table-column prop="age" label="年龄" ></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
    </glp-data-table>
  </glp-card>

  <glp-card title="数据表格-配置列" class="mt-4">
    <el-checkbox-group v-model="value" class="my-3">
      <el-checkbox :label="row.prop" v-for="row in columns" :key="row.prop">{{row.label}}</el-checkbox>
    </el-checkbox-group>
    <glp-data-table :data-source="dataSource" :columns="renderedColumns">
      <template slot-scope="{row}" slot="status">{{row.status === '1' ? '有效' : '无效' }}</template>
      <template v-slot:opt="{row}">
        <el-button type="text" @click="onEdit(row)">编辑</el-button>
      </template>
    </glp-data-table>
  </glp-card>
</div>
</template>

<script lang="ts">

import { Vue, Component, Ref } from 'vue-property-decorator'
import { TableColumnDef } from '@/types'
@Component
export default class DataTable extends Vue {
  @Ref() localTable!: any

  @Ref() pagedTable!: any

  dataSource: any[] = []

  columns: TableColumnDef[] = [
    { prop: 'name', label: '姓名' },
    { prop: 'age', label: '年龄' },
    { prop: 'status', label: '状态' },
    { prop: 'address', label: '地址' },
    { prop: 'opt', label: '操作', fixed: 'right' }
  ]

  value: string[] = ['name', 'age', 'status', 'address', 'opt']

  loader = (params: any) => this.$http.get<any>('/comp/datatable/get', { params })

  pagedLoader = ({ page, size, params }: any) => this.$http.post<any>(
    '/comp/datatable/paged',
    { ...params, pageNum: page, pageSize: size }).then(data => Object.assign({ page: data.pageNum, size: data.pageSize }, data)
  )

  get renderedColumns () {
    return this.columns.filter(v => this.value.includes(v.prop))
  }

  onEdit (row: any) {
    console.log(row)
  }

  loadData () {
    this.$http.get<any>('/comp/datatable/get').then(data => {
      this.dataSource = data
    })
  }

  mounted () {
    this.loadData()
    this.localTable.query()
    this.pagedTable.query()
  }
}
</script>
