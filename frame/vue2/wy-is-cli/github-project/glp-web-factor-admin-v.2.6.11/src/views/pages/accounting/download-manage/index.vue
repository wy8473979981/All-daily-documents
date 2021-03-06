<template>
  <div>
    <query-table :columns='columns' ref='tb' api='/glp-fae/download/pageQuery' class='mt-4'>
      <template v-slot:opt='{row}'>
        <el-button type='text' @click='onDownload(row)'>下载</el-button>
        <el-button type='text' @click='onDelete(row)'>删除</el-button>
      </template>
    </query-table>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Ref } from 'vue-property-decorator'
import { columns } from './config'
import { handlDownloadManageDelete } from '@/api/accounting-server'

@Component
export default class Index extends Vue {
  $style!: any

  @Ref() tb!: any

  columns = columns

  onRefresh () {
    this.tb.refresh()
  }

  onDownload (row: any) {
    window.open(row.downloadUrl)
  }

  onDelete (row: any) {
    this.$confirm('确认删除?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      const param = { ...row }
      handlDownloadManageDelete(param).then((data) => {
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

  onQuery (params: any = {}) {
    this.tb.query(params)
  }

  mounted () {
    this.onQuery()
  }
}
</script>

<style lang='scss' module></style>
