<template>
<div>
<breadcrumb/>
<query-form :def="formDefs" @query="onQuery"></query-form>
<query-table :columns="columns" ref="tb" title="应收账款列表" api="/clientend/receive/getListPage" row-key="id" class="mt-4">
  <template slot="extra">
    <el-button type="info" size="small" plain @click="onExport">Excel导出</el-button>
    <el-button type="primary" size="small" plain @click="onAdd">新 增</el-button>
  </template>
  <template v-slot:opt="{row}">
    <el-button type="text" @click="onView(row)">详情</el-button>
    <el-button type="text" @click="onEdit(row)" v-if="canEdit(row)">编辑</el-button>
    <el-button type="text" @click="onViewContract(row)" v-if="canViewContract(row)">查看融资合同</el-button>
  </template>
</query-table>
<contract-detail ref="contractDetail"></contract-detail>
</div>
</template>

<script lang="ts">

import { Vue, Component, Ref } from 'vue-property-decorator'
import { formDefs, columns } from './config'
import { download } from '@/utils/file'
import { format } from '@/utils/date'
import ContractDetail from './components/contract-detail/index.vue'

@Component({
  components: { ContractDetail }
})
export default class Debt extends Vue {
  @Ref() tb!: any

  @Ref() contractDetail!: any

  formDefs = formDefs

  columns = columns

  params: any = {}

  canViewContract (row: any) {
    // 合同签署完成
    return String(row.contractStatus) === '3'
  }

  canEdit (row: any) {
    // 驳回 或 未提交
    return ['3', '0'].includes(String(row.status))
  }

  onEdit (row: any) {
    this.$router.push(`/finance/debt/edit/${row.id}`)
  }

  onView (row: any) {
    this.$router.push(`/finance/debt/detail/${row.id}`)
  }

  onQuery (params: any = {}) {
    this.params = params
    this.tb.query(Object.assign(params))
  }

  onAdd () {
    this.$router.push('/finance/debt/add')
  }

  onExport () {
    const stamp = format(new Date(), 'yyyyMMdd')
    download('/clientend/receive/export', `应收账款${stamp}.xlsx`, this.params, 'post')
  }

  onViewContract (row: any) {
    this.contractDetail
      .view(row.debtReceivableNumber)
      .catch(() => {
        // ignore
      })
  }

  mounted () {
    this.onQuery()
  }
}
</script>
