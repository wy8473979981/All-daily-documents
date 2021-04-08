<template>
<div>
  <!-- <query-form :def="formDefs" @query="onQuery" :title="formTitle"></query-form> -->
  <query-table :columns="columns" ref="tb" :title="columnTitle" :defaultSize="10000" api="/clientend/bank/beneficiary/list" class="mt-4">
    <template slot="extra">
      <el-button type="primary" size="small" @click="onAddReal">使用已实名账户</el-button>
      <el-button type="primary" size="small" @click="onAdd">新 增</el-button>
    </template>
    <template v-slot:opt="{row}">
      <el-button type="text" @click="onEdit(row)">编辑</el-button>
      <el-button type="text" @click="onUseAccount(row)" v-if="row.status === 0">启用</el-button>
    </template>
  </query-table>
  <actual-add ref="actualAdd" v-if="showDialog" :showDialog='showDialog' @bindShowDialog='getDialog' :realnameData="realnameData"></actual-add>
  <actual-edit ref="actualEdit" :showDialogEdit='showDialogEdit' @bindShowDialog='getDialog' :realnameForm="realnameForm"></actual-edit>
</div>
</template>

<script lang="ts">

import { Vue, Component, Ref } from 'vue-property-decorator'
import { getRealname, getRealData, usingAccount } from '@/api/systemSet'
import { columns } from './config'
import ActualAdd from './components/actual-add/index.vue'
import ActualEdit from './components/actual-edit/index.vue'

@Component({
  components: { ActualAdd, ActualEdit }
})
export default class Query extends Vue {
  @Ref() tb!: any

  @Ref() actualAdd!: ActualAdd

  @Ref() actualEdit!: ActualEdit

  columns = columns

  formTitle = '账户查询'

  columnTitle = '收款账户列表'

  showDialog = false

  showDialogEdit = false

  realnameForm: Record<string|number, any> = {}

  customerObj: Record<string|number, any> = {}

  realnameData: Record<string|number, any> = {}

  onEdit (row: any) {
    this.showDialogEdit = true
    getRealData(row.id).then((data: any) => {
      this.realnameForm = data
    })
  }

  onAdd () {
    this.showDialog = true
  }

  onAddReal () {
    this.showDialog = true
    getRealname().then((data) => {
      this.realnameData = data
    })
  }

  onUseAccount (row: any) {
    if (row.ifRecvChangeMsg === 0) {
      this.$confirm('启用该收款账户的同时将禁用当前当状态为【启用】的收款账户，您确定启用吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: false
      }).then(() => {
        usingAccount(row.id).then((data) => {
          this.$message({
            type: 'success',
            message: '启用成功!',
            onClose: () => {
              this.tb.refresh()
            },
            duration: 1500
          })
        })
      }).catch(() => {})
    } else {
      this.$confirm('启用该收款账户的同时将禁用当前当状态为【启用】的收款账户，且该账户将被同步至当前用心申请中', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: false
      }).then(() => {
        usingAccount(row.id).then((data) => {
          this.$message({
            type: 'success',
            message: '启用成功!',
            onClose: () => {
              this.tb.refresh()
            },
            duration: 1500
          })
        })
      }).catch(() => {})
    }
  }

  getDialog (flag: any) {
    this.showDialog = flag
    this.showDialogEdit = flag
    this.tb.refresh()
  }

  mounted () {
    this.tb.query()
  }
}
</script>
