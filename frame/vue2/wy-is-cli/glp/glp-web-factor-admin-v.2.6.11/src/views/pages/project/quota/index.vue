<template>
  <div>
    <query-form :def="formDefs" @query="onQuery" title="额度项目管理"></query-form>
    <query-table
      :columns="columns"
      ref="tb"
      title="额度明细"
      api="/backend/amount/quotaBook"
      class="mt-4"
    >
      <template v-slot:quotaValidity="{row}">
        <span>{{row.effectiveDate | date}} - {{row.expireDate | date}}</span>
      </template>
      <template v-slot:cmName="{row}">
        <div v-for="(item, index) in row.cmList" :key="index">{{item.userName}}</div>
      </template>
      <template v-slot:rmName="{row}">
        <div v-for="(item, index) in row.rmList" :key="index">{{item.userName}}</div>
      </template>
      <template v-slot:opt="{row}">
        <div v-if="row.relationType !== 'COUNTERPARTY'
        &&(row.financeMode !=='FACTORING_FORWARD_NONRECOURSE_BUYER'
        || row.financeMode !=='FACTORING_FORWARD_NONRECOURSE_BUYER_BILL'
        || row.financeMode !=='FACTORING_FORWARD_RECOURSE_BUYER'
        || row.financeMode !=='FACTORING_FORWARD_RECOURSE_BUYER_BILL')">
          <el-button type="text" @click="onEdit(row)" v-if="!row.projectExistsFlag && Number(row.status) === 1 && accessAdd">创建项目</el-button>
          <el-button type="text" @click="onView(row)" v-if="row.projectExistsFlag && accessViewDetail">查看项目</el-button>
        </div>
      </template>
    </query-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import { formDefs, columns } from './config'

@Component
export default class Query extends Vue {
  $style!: any

  @Ref() tb!: any

  formDefs = formDefs

  columns = columns

  accessAdd = false

  accessViewDetail = false

  onQuery (params: any = {}) {
    if (params.status) {
      if (params.status === '所有') {
        params.status = '0'
      }
    }
    this.tb.query(params)
  }

  onRefresh () {
    this.tb.refresh()
  }

  onEdit (row: any) {
    // status=2 即新增，未启用状态
    this.$router.push(`/project/product/edit/${row.creditCode}?type=init`)
  }

  onView (row: any) {
    // detailStatus=1 即详情，不可编辑，不可复核。
    this.$router.push(`/project/product/detail/${row.projectId}?type=detail`)
  }

  mounted () {
    this.onQuery()
    this.accessAdd = this.$auth.accessSync('/project/product/add')
    this.accessViewDetail = this.$auth.accessSync('/project/product/viewDetail')
  }
}
</script>

<style lang="scss" module>
</style>
