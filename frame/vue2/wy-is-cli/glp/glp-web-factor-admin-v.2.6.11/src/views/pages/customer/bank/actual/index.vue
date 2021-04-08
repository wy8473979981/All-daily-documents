<template>
<div>
  <query-form :def="formDefs" @query="onQuery"  :title='titleForm'></query-form>
  <query-table :columns="columns" ref="tb" :title="title" api="/backend/bank/beneficiary/list" class="mt-4">
    <template slot="extra">
      <el-button type="primary" size="small" @click="onAdd" v-if="accessAdd" plain>新增账户</el-button>
    </template>
    <template v-slot:riskCheckStatus="{row}" >
        <span v-if="row.bankType === 2">{{ row.riskCheckStatus === 0 ? '审批中' : row.riskCheckStatus === 1 ? '通过' : '拒绝' }}</span>
        <span v-if="row.bankType === 1">-</span>
    </template>
    <template v-slot:status="{row}" >
        <span v-if="row.bankType === 1">{{ row.status === 0 ? '禁用' : '启用' }}</span>
        <span v-if="row.bankType === 2">-</span>
    </template>
    <template v-slot:riskCheckTime="{row}" >
        <span>{{row.riskCheckTime === null ? '-' : row.riskCheckTime | date('T') }}</span>
    </template>
    <template v-slot:opt="{row}" >
      <el-button type="text" @click="onView(row)">详情</el-button>
      <el-button type="text" @click="onEdit(row)" v-if="((row.creatorType === 2 && row.bankType === 1) || (row.creatorType === 2 && row.bankType === 2 && row.riskCheckStatus === 1)) && accessEdit">编辑</el-button>
      <el-button type="text" @click="onApproval(row)" v-if="(row.bankType === 2 && row.riskCheckStatus === 0 && row.creatorType != 2) && accessApproval">审批</el-button>
    </template>
  </query-table>
  <actual-add ref="actualAdd" :showDialog='showDialog' v-if="showDialog" @bindShowDialog='getDialog' :showAccountDetail="showAccountDetail"></actual-add>
  <account-type ref="accountType" :showAccountType='showAccountType' @bindShowAccountDialog='getAccountDialog' @bindAccountForm="getAccountForm"></account-type>
  <actual-detail ref="actualDetail" :showDialogDetail='showDialogDetail' @bindshowDialogDetail='getDialog' :detailData="detailData" :showAccountDetail="showAccountDetail"></actual-detail>
  <actual-edit ref="actualEdit" :showDialogEdit='showDialogEdit' @bindshowDialogDetail='getDialog' :editData="editData" :showAccountDetail="showAccountDetail"></actual-edit>
  <actual-approval ref="actualApproval" :showDialogApproval='showDialogApproval' @bindshowDialogDetail='getDialog' :approvalData="approvalData" :showAccountDetail="showAccountDetail"></actual-approval>
</div>
</template>

<script lang="ts">

import { Vue, Component, Ref, Watch } from 'vue-property-decorator'
import { formDefs, columns } from './config'
import { frozenAccount, getThirdReal, getNoThirdReal, editNoThirdReal, getBankActualList } from '@/api/systemSet'
import ActualAdd from './components/actual-add/index.vue'
import AccountType from './components/account-type/index.vue'
import ActualDetail from './components/actual-detail/index.vue'
import ActualEdit from './components/actual-edit/index.vue'
import ActualApproval from './components/actual-approval/index.vue'
import { d, datetime } from '@/config/form'

@Component({ components: { ActualAdd, AccountType, ActualDetail, ActualEdit, ActualApproval } })
export default class Query extends Vue {
  $style!: any

  @Ref() tb!: any

  @Ref() actualAdd!: ActualAdd

  @Ref() actualDetail!: ActualDetail

  @Ref() actualEdit!: ActualEdit

  @Ref() accountType!: AccountType

  @Ref() actualApproval!: ActualApproval

  formDefs = formDefs

  titleForm = '客户收款账户管理'

  title = '客户收款账户列表'

  columns = columns

  showDialog = false

  showDialogDetail = false

  showDialogEdit= false

  showDialogApproval = false

  showAccountType = false

  showAccountDetail: any = ''

  editData: Record<string|number, any> = {}

  detailData: Record<string|number, any> = {}

  approvalData: Record<string|number, any> = {}

  isDatail = ''

  accessApproval = false

  accessAdd = false

  accessEdit = false

  onQuery (params: any = {}) {
    if (params.bankDateType) delete params.bankDateType
    this.tb.query(params)
  }

  onAdd () {
    this.showAccountType = true
    this.showDialog = false
  }

  onRefresh () {
    this.tb.refresh()
  }

  onView (row: any) {
    this.showAccountDetail = row.bankType
    if (row.bankType === 1) {
      getNoThirdReal(row.id).then((data) => {
        this.detailData = data
        this.showDialogDetail = true
      })
    } else {
      getThirdReal(row.id).then((data) => {
        this.detailData = data
        this.showDialogDetail = true
      })
    }
  }

  onEdit (row: any) {
    if (row.riskCheckStatus === 0 && row.bankType === 2) {
      this.$message({
        message: '当前存在审批中订单，不可编辑账户',
        type: 'warning'
      })
    } else {
      this.showAccountDetail = row.bankType
      if (row.bankType === 1) {
        getNoThirdReal(row.id).then((data) => {
          this.editData = data
          this.showDialogEdit = true
        })
      } else {
        getThirdReal(row.id).then((data) => {
          this.editData = data
          this.showDialogEdit = true
        })
      }
    }
  }

  onApproval (row: any) {
    this.showAccountDetail = row.bankType
    if (row.bankType === 1) {
      getNoThirdReal(row.id).then((data) => {
        this.approvalData = data
        this.showDialogApproval = true
      })
    } else {
      getThirdReal(row.id).then((data) => {
        this.approvalData = data
        this.showDialogApproval = true
      })
    }
  }

  getDialog (flag: any) {
    this.showDialog = flag
    this.showDialogDetail = flag
    this.showDialogEdit = flag
    this.showDialogApproval = flag
    this.tb.refresh()
  }

  getAccountDialog (flag: any) {
    this.showAccountType = flag
  }

  getAccountForm (form: any) {
    this.showAccountDetail = form.bankType
    this.showDialog = true
  }

  mounted () {
    this.onQuery()
    this.accessApproval = this.$auth.accessSync('/customer/bank/actual/approval')
    this.accessAdd = this.$auth.accessSync('/customer/bank/actual/add')
    this.accessEdit = this.$auth.accessSync('/customer/bank/actual/edit')
  }
}
</script>

<style lang="scss" module>

</style>
