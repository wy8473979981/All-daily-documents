<template>
<div>
  <query-form :def="formDefs" @query="onQuery"  :title='titleForm'></query-form>
  <query-table :columns="columns" ref="tb" :title="title" api="/clientend/bank/third/list" class="mt-4">
    <template slot="extra">
      <el-button type="primary" size="small" @click="onAdd">新增账户</el-button>
    </template>
    <template v-slot:riskCheckTime="{row}" >
        <span>{{row.riskCheckTime === null ? '-' : row.riskCheckTime | date('T') }}</span>
    </template>
    <template v-slot:opt="{row}" >
      <el-button type="text" @click="onView(row)">详情</el-button>
      <el-button type="text" @click="onEdit(row)" v-if="row.riskCheckStatus === 2">编辑</el-button>
      <!-- <el-button type="text" @click="onEdit(row)">编辑</el-button> -->
    </template>
  </query-table>
  <actual-add ref="actualAdd" :showDialog='showDialog' v-if="showDialog" @bindShowDialog='getDialog'></actual-add>
  <actual-detail ref="actualDetail" :showDialogDetail='showDialogDetail' @bindshowDialogDetail='getDialog' :detailData="detailData"></actual-detail>
  <actual-edit ref="actualEdit" :showDialogEdit='showDialogEdit' @bindshowDialogDetail='getDialog' :detailData="detailData"></actual-edit>
</div>
</template>

<script lang="ts">

import { Vue, Component, Ref } from 'vue-property-decorator'
import { formDefs, columns } from './config'
import { getThirdReal } from '@/api/systemSet'
import ActualAdd from './components/actual-add/index.vue'
import AccountType from './components/account-type/index.vue'
import ActualDetail from './components/actual-detail/index.vue'
import ActualEdit from './components/actual-edit/index.vue'

@Component({ components: { ActualAdd, ActualDetail, ActualEdit } })
export default class Query extends Vue {
  $style!: any

  @Ref() tb!: any

  @Ref() actualAdd!: ActualAdd

  @Ref() actualDetail!: ActualDetail

  @Ref() actualEdit!: ActualEdit

  @Ref() accountType!: AccountType

  formDefs = formDefs

  titleForm = '第三方收款账户管理'

  title = '第三方收款账户列表'

  columns = columns

  showDialog = false

  showDialogDetail = false

  showDialogEdit= false

  detailData = {}

  onQuery (params: any = {}) {
    this.tb.query(params)
  }

  onAdd () {
    this.showDialog = true
  }

  onRefresh () {
    this.tb.refresh()
  }

  onView (row: any) {
    this.showDialogDetail = true
    getThirdReal(row.id).then((data) => {
      this.detailData = data
    })
  }

  onEdit (row: any) {
    this.showDialogEdit = true
    getThirdReal(row.id).then((data) => {
      this.detailData = data
    })
  }

  getDialog (flag: any) {
    this.showDialog = flag
    this.showDialogDetail = flag
    this.showDialogEdit = flag
    this.tb.refresh()
  }

  mounted () {
    this.onQuery()
  }
}
</script>

<style lang="scss" module>

</style>
