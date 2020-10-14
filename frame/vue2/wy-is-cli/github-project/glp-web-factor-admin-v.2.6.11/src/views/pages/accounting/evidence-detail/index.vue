<template>
  <div>
    <query-form :def="formDefs" @query="onQuery"  ref="fm"></query-form>
    <query-table :columns="columns" ref="tb" api="/glp-fae/voucher/record/pageQuery" class="mt-4">
      <template slot='extra'>
        <el-button type='primary' size='small' @click='onExport'>导出EXCEL</el-button>
      </template>
      <template v-slot:opt='{row}'>
        <el-button type="text" @click="onDetail(row)">详情</el-button>
        <el-button type="text" @click="onDisabled(row)" v-if='row.syncJdeStatus==2 && row.status==1'>作废</el-button>
      </template>
    </query-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import { formDefs, columns } from './config'
import { handlEvidenceDetailCancel, handlEvidenceDetailExport } from '@/api/accounting-server'
@Component
export default class Index extends Vue {
  $style!: any

  @Ref() tb!: any
  @Ref() fm!: any

  formDefs = formDefs

  columns = columns

  searchParams: any

  onQuery (params: any = {}) {
    this.searchParams = params
    this.tb.query(params)
  }

  onDetail (row: any) {
    this.$router.push({ path: `/accounting/evidence-detail/detail/${row.id}` })
  }

  onExport () {
    const req = {
      appId: this.fm.form.appId,
      dateTimeBegin: this.fm.form.dateTime && this.fm.form.dateTime[0],
      dateTimeEnd: this.fm.form.dateTime && this.fm.form.dateTime[1],
      dateType: this.fm.form.dateType,
      debtNo: this.fm.form.debtNo,
      voucherName: this.fm.form.voucherName,
      status: this.fm.form.status,
      syncJdeStatus: this.fm.form.syncJdeStatus,
      sourceAddress: '凭证明细管理'
    }
    handlEvidenceDetailExport(req).then((data) => {
      this.$message({
        type: 'success',
        message: '成功!'
      })
      this.$router.push({ path: '/accounting/download-manage' })
    })
  }

  onDisabled (row: any) {
    this.$confirm('确定作废?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      const param = { id: row.id }
      handlEvidenceDetailCancel(param).then((data) => {
        this.$message({
          type: 'success',
          message: '成功!'
        })
        this.onRefresh()
      })
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消'
      })
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
