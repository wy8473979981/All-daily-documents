<template>
  <div>
    <query-form :def="formDefs" @query="onQuery" :title="titleForm" :form="form"></query-form>
    <query-table
      :columns="columns"
      ref="tb"
      :title="title"
      api="/backend/project/getProjectPageList"
      class="mt-4"
    >
      <template v-slot:opt="{row}">
        <el-button
          type="text"
          v-if="(row.status === 1 || (row.status === 0 && !row.approveStatus)) && accessEdit"
          @click="onEdit(row)"
        >编辑</el-button>
        <el-button
          type="text"
          v-if="(row.status === 1 && !row.approveStatus) && accessOpenEdit"
          @click="onOpenEdit(row)"
        >编辑</el-button>
        <el-button type="text" @click="onDetail(row)" v-if="accessDetail">详情</el-button>
        <el-button
          v-if="(row.businessType !== 'GLP_CHAIN_FACTORING') && accessRelation"
          type="text"
          @click="onView(row)"
        >查看买卖方关系</el-button>
      </template>
    </query-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Watch } from 'vue-property-decorator'
import { formDefs, columns } from './config'
// import { getProjectNameByLike } from '@/api/systemSet'

@Component
export default class Query extends Vue {
  $style!: any

  @Ref() tb!: any

  formDefs = formDefs

  titleForm = '项目产品配置'

  title = '项目产品列表'

  columns = columns

  form: Record<string | number, any> = {}

  accessEdit = false

  accessRelation = false

  accessDetail = false

  accessOpenEdit = false

  onQuery (params: any = {}) {
    this.tb.query(params)
  }

  onRefresh () {
    this.tb.refresh()
  }

  onEdit (row: any) {
    this.$router.push(`/project/product/edit/${row.id}?type=edit`)
  }

  onOpenEdit (row: any) {
    this.$router.push(`/project/product/open-edit/${row.id}?type=edit`)
  }

  onDetail (row: any) {
    this.$router.push(`/project/product/detail/${row.id}?type=detail`)
  }

  onView (row: any) {
    this.$router.push(`/project/product/relationship?projectName=${row.projectName}&quotaCode=${row.quotaCode}&projectId=${row.id}`)
  }

  mounted () {
    this.onQuery()
    this.accessEdit = this.$auth.accessSync('/project/product/edit')
    this.accessDetail = this.$auth.accessSync('/project/product/detail')
    this.accessRelation = this.$auth.accessSync('/project/product/relationship')
    this.accessOpenEdit = this.$auth.accessSync('/project/product/open-edit')
    if (this.accessEdit) this.accessOpenEdit = false
    if (this.accessOpenEdit) this.accessEdit = false
  }
}
</script>

<style lang="scss" module>
</style>
