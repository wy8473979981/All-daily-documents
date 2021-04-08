<template>
  <div>
    <query-form :def="formDefs" @query="onQuery"></query-form>
    <query-table :columns="columns" ref="tb" api="/glp-fae/vouchermc/pageQuery" class="mt-4">
      <template slot="extra">
        <el-button type="primary" size="small" @click="onAdd">新增</el-button>
      </template>
      <template v-slot:opt='{row}'>
        <el-button type='text' @click='onDisabled(row)'>{{row.status ==0?'启用':'禁用'}}</el-button>
        <el-button type='text' @click='onEdit(row)'>编辑</el-button>
      </template>
    </query-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import { formDefs, columns } from './config'
import { handlEvidenceConfigDisabled } from '@/api/accounting-server'
@Component
export default class Index extends Vue {
  $style!: any

  @Ref() tb!: any

  formDefs = formDefs

  columns = columns

  onDisabled (row: any) {
    const confirmTip = row.status === 0 ? '确认启用此凭证?' : '确认禁用此凭证?'
    this.$confirm(confirmTip, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      const param = { ...row, status: row.status === 0 ? 1 : 0 }
      handlEvidenceConfigDisabled(param).then((data) => {
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

  onAdd () {
    this.$router.push('/accounting/evidence-config/add')
  }

  onEdit (row: any) {
    this.$router.push({ path: `/accounting/evidence-config/edit/${row.id}` })
  }

  onRefresh () {
    this.tb.refresh()
  }

  onQuery (params: any = {}) {
    this.tb.query(params)
  }

  mounted () {
    this.onQuery()
  }
}
</script>

<style lang="scss" module></style>
