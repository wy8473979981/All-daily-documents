<template>
  <div>
    <query-form :def="formDefs" @query="onQuery" :title="titleForm"></query-form>
    <query-table
      :columns="columns"
      ref="tb"
      :title="title"
      api="/backend/customer/getListPage"
      class="mt-4"
    >
      <template slot="extra">
        <el-button type="primary" size="small" @click="onAdd" v-if="accessAdd" plain>新增客户</el-button>
      </template>
      <template v-slot:opt="{row}">
        <el-button type="text" @click="onView(row)" v-if="row.customerType === 'ENTERPRISE' && accessEnterpriseDetail">详情</el-button>
        <el-button type="text" @click="onView(row)" v-if="row.customerType === 'INDIVIDUAL' && accessIndividDetail">详情</el-button>
        <el-button type="text" @click="onEdit(row)" v-if="row.customerType === 'ENTERPRISE' && accessEnterpriseEdit">编辑</el-button>
        <el-button type="text" @click="onEdit(row)" v-if="row.customerType === 'INDIVIDUAL' && accessIndividEdit">编辑</el-button>
        <el-button type="text" @click="onLoginConfirm(row)" v-if="(row.ifNeedRealname === 0) && accessLoginRealName">开启登录实名</el-button>
        <el-button type="text" @click="onLoginConfirm(row)" v-if="(row.ifNeedRealname === 1) && accessLoginRealName" :class="[$style.pinkColor]">关闭登录实名</el-button>
        <el-button type="text" @click="onConfirmName(row)" v-if="accessToRealName">发起实名</el-button>
      </template>
    </query-table>
    <add-customer ref="addCustomer"></add-customer>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import { formDefs, columns } from './config'
import AddCustomer from './components/add-customer/index.vue'
import { loginRealName, sendRealName } from '@/api/systemSet'

@Component({
  components: { AddCustomer }
})
export default class Query extends Vue {
  $style!: any
  @Ref() tb!: any
  @Ref() addCustomer!: AddCustomer

  formDefs = formDefs

  titleForm = '客户查询'

  title = '客户管理列表'

  columns = columns

  accessAdd = false

  accessToRealName = false

  accessEnterpriseEdit = false

  accessEnterpriseDetail = false

  accessIndividEdit = false

  accessIndividDetail = false

  accessLoginRealName= false

  onQuery (params: any = {}) {
    this.tb.query(params)
  }

  onRefresh () {
    this.tb.refresh()
  }

  onView (row: any) {
    if (row.customerType === 'ENTERPRISE') {
      this.$router.push(`/customer/list/enterprise-detail/${row.id}?type=detail`)
    } else {
      this.$router.push(`/customer/list/individ-detail/${row.id}?type=detail`)
    }
  }

  onEdit (row: any) {
    if (row.customerType === 'ENTERPRISE') {
      this.$router.push(`/customer/list/enterprise-edit/${row.id}?type=edit`)
    } else {
      this.$router.push(`/customer/list/individ-edit/${row.id}?type=edit`)
    }
  }

  onAdd () {
    this.addCustomer.edit()
  }

  onLoginConfirm (row: any) {
    const ifNeedRealName = row.ifNeedRealname === 1 ? 0 : 1
    const params = { customerId: row.id, ifNeedRealName: ifNeedRealName }
    loginRealName(params).then(data => {
      this.$message({
        type: 'success',
        message: ifNeedRealName === 1 ? '登录实名已开启' : '登录实名已关闭',
        duration: 1000,
        onClose: () => this.onQuery()
      })
    })
  }

  onConfirmName (row: any) {
    sendRealName(row.id).then(data => {
      this.$message({
        type: 'success',
        message: '操作成功',
        duration: 1000,
        onClose: () => this.onQuery()
      })
    })
  }

  mounted () {
    this.onQuery()
    this.accessAdd = this.$auth.accessSync('/customer/list/add')
    this.accessEnterpriseEdit = this.$auth.accessSync('/customer/list/enterprise-edit')
    this.accessEnterpriseDetail = this.$auth.accessSync('/customer/list/enterprise-detail')
    this.accessIndividEdit = this.$auth.accessSync('/customer/list/individ-edit')
    this.accessIndividDetail = this.$auth.accessSync('/customer/list/individ-detail')
    this.accessLoginRealName = this.$auth.accessSync('/customer/list/loginName')
    this.accessToRealName = this.$auth.accessSync('/customer/list/toRealName')
  }
}
</script>

<style lang="scss" module>
.pinkColor{
  color: #f56c6c
}
</style>
