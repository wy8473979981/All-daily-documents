<template>
    <div>
       <query-form :def="formDefs" @query="onQuery"  :title='titleForm'></query-form>
        <query-table :columns="columns" ref="tb" title="合同模版列表" api="/backend/customer/getListPage" class="mt-4">
          <template slot="extra">
            <div>待处理(xx条)</div>
            <div>已完成(xx条)</div>
          </template>
          <template v-slot:opt="{row}" >
            <el-button type="text" @click="onView(row)">详 情</el-button>
            <el-button type="text" @click="onDelete(row)">删 除</el-button>
          </template>
      </query-table>
  </div>
</template>

<script lang="ts">

import { Vue, Component, Ref } from 'vue-property-decorator'
import { formDefs, columns } from './config'
@Component
export default class FormworkTasks extends Vue {
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
