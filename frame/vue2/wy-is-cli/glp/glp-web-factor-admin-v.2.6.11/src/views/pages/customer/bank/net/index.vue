<template>
<div>
  <query-form :def="formDefs" @query="onQuery"  :title='titleForm' :form="form"></query-form>
  <query-table :columns="columns" ref="tb" :title="title" api="/backend/bank/supervisor/list" class="mt-4">
    <template slot="extra">
      <el-button type="primary" size="small" @click="onAdd" v-if="accessAdd" plain>新增账户</el-button>
    </template>
    <template v-slot:bindBankAccountName="{row}" >
      <el-tooltip placement="top">
        <div slot="content">{{row.bindBankAccountNumber}}</div>
        <span>{{row.bindBankAccountName}}</span>
      </el-tooltip>
    </template>
    <template v-slot:opt="{row}" >
      <el-button type="text" @click="onForbid(row)" v-if="(row.status === 1) && accessOperation">禁用</el-button>
      <el-button type="text" @click="onForbid(row)" v-if="(row.status === 0) && accessOperation">启用</el-button>
      <el-button type="text" @click="onEdit(row)" v-if="accessEdit">编辑</el-button>
    </template>
  </query-table>
  <virtual-add ref="virtualAdd" :showDialog='showDialog' v-if="showDialog" @bindShowDialog='getDialog' :showAccountDetail="showAccountDetail"></virtual-add>
  <virtual-edit ref="virtualEdit" :showEditDialog='showEditDialog' @bindShowDialog='getEditDialog' :showAccountDetail="showAccountDetail" :editForm="editForm"></virtual-edit>
  <account-type ref="accountType" :showAccountType='showAccountType' @bindShowAccountDialog='getAccountDialog' @bindAccountForm="getAccountForm"></account-type>
</div>
</template>

<script lang="ts">

import { Vue, Component, Ref, Watch } from 'vue-property-decorator'
import { formDefs, columns } from './config'
import { frozenAccount, getVirtualData } from '@/api/systemSet'
import VirtualAdd from './components/virtual-add/index.vue'
import AccountType from './components/account-type/index.vue'
import VirtualEdit from './components/virtual-edit/index.vue'

@Component({ components: { VirtualAdd, VirtualEdit, AccountType } })
export default class Query extends Vue {
  $style!: any

  @Ref() tb!: any

  @Ref() virtualAdd!: VirtualAdd

  @Ref() virtualEdit!: VirtualEdit

  @Ref() accountType!: AccountType

  formDefs = formDefs

  titleForm = '账户体系管理'

  title = '账户体系列表'

  columns = columns

  charset = '禁用'

  form: Record<string|number, any> = {}

  editForm: Record<string|number, any> = {}

  showAccountType = false

  showAccountDetail: any = ''

  showDialog = false

  showEditDialog = false

  accessAdd = false

  accessEdit = false

  accessOperation = false

  onQuery (params: any = {}) {
    if (params.bankCardUsage) {
      params.bankCardUsage = typeof params.bankCardUsage === 'string' ? Number(params.bankCardUsage) : params.bankCardUsage
    }
    this.tb.query(params)
  }

  onAdd () {
    this.showAccountType = true
    this.showDialog = false
  }

  onEdit (row: any) {
    this.showAccountDetail = row.bankType
    this.showEditDialog = true
    getVirtualData(row.id).then((data: any) => {
      this.editForm = data
    })
  }

  getDialog (flag: any) {
    this.showDialog = flag
    this.tb.refresh()
  }

  getEditDialog (flag: any) {
    this.showEditDialog = flag
    this.tb.refresh()
  }

  getAccountDialog (flag: any) {
    this.showAccountType = flag
  }

  getAccountForm (form: any) {
    this.showAccountDetail = form.bankType
    this.showDialog = true
  }

  onRefresh () {
    this.tb.refresh()
  }

  onForbid (row: any) {
    this.charset = row.status === 1 ? '禁用' : '启用'
    this.$confirm(`您确定${this.charset}该账户吗？：${row.bankAccountName}`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      center: true
    }).then(() => {
      const params = {
        enabled: row.status === 1 ? 0 : 1,
        id: row.id
      }
      frozenAccount(params).then((data) => {
        this.$message({
          type: 'success',
          message: `${this.charset}成功`,
          onClose: () => {
            this.onRefresh()
          },
          duration: 1500
        })
      })
    }).catch(() => {
      //
    })
  }

  mounted () {
    this.onQuery()
    this.accessAdd = this.$auth.accessSync('/customer/bank/net/add')
    this.accessEdit = this.$auth.accessSync('/customer/bank/net/edit')
    this.accessOperation = this.$auth.accessSync('/customer/bank/net/operate')
  }
}
</script>

<style lang="scss" module>

</style>
