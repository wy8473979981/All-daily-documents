<template>
  <div>
    <query-form :def="formDefs" @query="onQuery" ref="fm"></query-form>
    <query-table :columns="columns" ref="tb" api="/glp-fae/summary/listPage" class="mt-4">
      <template slot="extra">
        <el-button type='primary' size='small' @click='onExport'>导出EXCEL</el-button>
        <el-button type="primary" size="small" @click="onSummarize" :disabled="summaryFlag">汇总上月</el-button>
        <el-button type="primary" size="small" @click="onPostJde" :disabled="syncFlag">同步JDE</el-button>
      </template>
      <template v-slot:opt='{row}'>
        <el-button type="text" @click="onDetail(row)">详情</el-button>
        <el-button type="text" @click="onPostSceneJde(row)" v-if="row.syncJdeStatus==3">同步JDE</el-button>
      </template>
    </query-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import { formDefs, columns } from './config'
import { handlEvidenceCollectSummarize, handlEvidenceCollectPostJde, handlEvidenceCollectPostSceneJde, handlEvidenceCollectSummarizeStatus, handlEvidenceCollectExport } from '@/api/accounting-server'

@Component
export default class Index extends Vue {
  $style!: any

  @Ref() tb!: any
  @Ref() fm!: any

  formDefs = formDefs

  columns = columns

  summaryFlag = true
  syncFlag = true
  params: any = {}
  index = 0

  onQuery (params: any = {}) {
    this.params = params
    this.tb.query(params)
    this.onSummarizeStatus()
  }

  onExport () {
    const req = {
      appId: this.fm.form.appId,
      summaryMonth: this.fm.form.summaryMonth,
      voucherName: this.fm.form.voucherName,
      dateType: this.fm.form.dateType,
      dcFlag: this.fm.form.dcFlag,
      subjectName: this.fm.form.subjectName,
      syncJdeStatus: this.fm.form.syncJdeStatus,
      sourceAddress: '凭证汇总管理'
    }
    handlEvidenceCollectExport(req).then((data) => {
      this.$message({
        type: 'success',
        message: '成功!'
      })
      this.$router.push({ path: '/accounting/download-manage' })
    })
  }

  onDetail (row: any) {
    this.$router.push({ path: `/accounting/evidence-collect/detail/${row.id}` })
  }

  onSummarize () {
    handlEvidenceCollectSummarize().then((data: any) => {
      this.$message({
        type: 'success',
        message: '成功!'
      })
      this.onRefresh()
    })
  }

  onPostJde () {
    const req = { month: this.params.summaryMonth }
    handlEvidenceCollectPostJde(req).then((data: any) => {
      this.$message({
        type: 'success',
        message: '成功!'
      })
      this.onRefresh()
      this.onSummarizeStatus()
    })
  }

  onPostSceneJde (row: any) {
    const req = { month: row.summaryMonth, voucherConfigId: row.voucherConfigId }
    handlEvidenceCollectPostSceneJde(req).then((data: any) => {
      this.$message({
        type: 'success',
        message: '成功!'
      })
      this.onRefresh()
      this.onSummarizeStatus()
    })
  }

  onSummarizeStatus () {
    const month = this.params && this.params.summaryMonth
    const appId = this.params && this.params.appId
    const req = { month: month || '', appId: appId || '' }
    handlEvidenceCollectSummarizeStatus(req).then((data: any) => {
      this.summaryFlag = data.summaryFlag
      this.syncFlag = data.syncFlag
    })
  }

  onRefresh () {
    this.tb.refresh()
  }

  mounted () {
    this.onQuery()
  }
}
</script>

<style lang="scss" module></style>
