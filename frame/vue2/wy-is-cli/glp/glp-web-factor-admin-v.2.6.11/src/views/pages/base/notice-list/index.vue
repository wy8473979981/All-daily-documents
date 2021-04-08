<template>
<div>
  <query-form :def="formDefs" @query="onQuery"  :title='titleForm' ></query-form>
  <query-table :columns="columns" ref="tb" :title="title" api="/backend/base/notice-list/paged" class="mt-4">
    <template v-slot:opt="{row}" >
      <el-button type="text" @click="onQuery(row)">查 看</el-button>
      <el-button type="text" @click="onEdit(row)">编 辑</el-button>
      <el-button type="text" @click="onResend(row)">重 发</el-button>
    </template>
  </query-table>
</div>
</template>

<script lang="ts">

import { Vue, Component, Ref } from 'vue-property-decorator'
import { formDefs, columns } from './config'
import { queryNoticeInfoList, resendNotice } from '@/api/systemSet'

@Component
export default class Query extends Vue {
  $style!: any;
  @Ref() tb!: any

  formDefs = formDefs
  titleForm = '业务查询'
  title = '通知信息查询列表'
  columns = columns

  onQuery (params: any = {}) {
    this.tb.query(params)
    // queryNoticeInfoList(params).then((data: any) => {
    //   console.log(data)
    // })
  }

  onRefresh () {
    this.tb.refresh()
  }

  onEdit (row: any) {
    this.$router.push(`/backend/base/notice-list/edit/${row.id}`)
  }

  onResend (row: any) {
    resendNotice(row.id).then(() => {
      this.onRefresh()
    })
  }

  mounted () {
    this.onQuery()
  }
}
</script>

<style lang="scss" module>

</style>
