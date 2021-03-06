<template>
   <div>
     <breadcrumb/>
      <query-form :def="formDefs" @query="onQuery"></query-form>
      <query-table :columns="columns" ref="tb" title="业务单据推送信息列表"  api="/clientend/claim/queryClaimPush" class="mt-4">
          <template v-slot:extra="{ checkedRows }">
            <el-button type="primary" size="small" @click="exportExcel(checkedRows)" plain>Excel导出</el-button>
          </template>
      </query-table>
   </div>
</template>

<script lang="ts">

import { Vue, Component, Ref } from 'vue-property-decorator'
import { formDefs, columns } from './config'
@Component
export default class Business extends Vue {
  formDefs = formDefs
  columns = columns

  @Ref() tb!: any
  onQuery (params: any = {}) {
    this.tb.query(params)
  }

  exportExcel (params: any) { // todo

  }

  mounted () {
    this.onQuery()
  }
}
</script>

<style lang="scss" module>

</style>
