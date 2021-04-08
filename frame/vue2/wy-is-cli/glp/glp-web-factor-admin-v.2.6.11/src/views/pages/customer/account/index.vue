<template>
<div>
  <query-form :def="formDefs" @query="onQuery"  :title='titleForm' ></query-form>
  <query-table :columns="columns" ref="tb" :title="title" api="/backend/account/getListPage" class="mt-4">
    <template slot="extra">
      <el-button type="primary" size="small" @click="onAdd" v-if="accessAdd" plain>新增账号</el-button>
    </template>
    <template v-slot:projectList="{row}">
      <div v-if="row.projectList.length > 0">
        <div v-for="(item, index) in row.projectList" :key="index">{{item.projectName}}</div>
      </div>
      <div v-if="row.projectList.length === 0">-</div>
    </template>
    <template v-slot:accountType="{row}">
      <el-popover
        placement="top-start"
        title="员工姓名"
        width="200"
        trigger="hover"
        v-if="Number(row.accountType) === 0">
      <span>{{row.accountName}}</span>
      <div slot="reference" v-if="Number(row.accountType) === 0">内部员工</div>
      </el-popover>
      <div v-if="Number(row.accountType) === 1">外部客户</div>
    </template>
    <template v-slot:opt="{row}" >
      <el-button type="text" @click="onRelationCustomer(row)" v-if="accessRelationCustomer" :disabled="row.accountType === 0">关联客户</el-button>
      <el-button type="text" @click="onRelationProject(row)" v-if="accessRelationProject" :disabled="row.accountType === 0">关联项目</el-button>
    </template>
  </query-table>
  <add-account ref="addAccount" @reloadAccount="reloadAccount"></add-account>
  <relation-project ref="relationProject" @reloadAccount="reloadAccount"></relation-project>
  <relation-customer ref="relationCustomer" @reloadAccount="reloadAccount"></relation-customer>
</div>
</template>

<script lang="ts">

import { Vue, Component, Ref } from 'vue-property-decorator'
import { formDefs, columns } from './config'
import AddAccount from './components/add-account/index.vue'
import RelationProject from './components/relation-project/index.vue'
import RelationCustomer from './components/relation-customer/index.vue'

@Component({
  components: { AddAccount, RelationProject, RelationCustomer }
})
export default class Query extends Vue {
  $style!: any;

  @Ref() tb!: any

  @Ref() addAccount!: AddAccount

  @Ref() relationProject!: RelationProject

  @Ref() relationCustomer!: RelationProject

  formDefs = formDefs

  titleForm = '账号查询'

  title = '账号列表'

  columns = columns

  accessAdd = false

  accessRelationCustomer = false

  accessRelationProject = false

  onQuery (params: any = {}) {
    this.tb.query(params)
  }

  onAdd () {
    this.addAccount.edit()
  }

  onRefresh () {
    this.tb.refresh()
  }

  onRelationCustomer (row: any) {
    this.relationCustomer.openModel(row)
  }

  onRelationProject (row: any) {
    this.relationProject.openModel(row)
  }

  reloadAccount (value: any) {
    this.tb.refresh()
  }

  mounted () {
    this.onQuery()
    this.accessAdd = this.$auth.accessSync('/customer/account/add')
    this.accessRelationCustomer = this.$auth.accessSync('/customer/account/relation-customer')
    this.accessRelationProject = this.$auth.accessSync('/customer/account/relation-project')
  }
}
</script>

<style lang="scss" module>

</style>
