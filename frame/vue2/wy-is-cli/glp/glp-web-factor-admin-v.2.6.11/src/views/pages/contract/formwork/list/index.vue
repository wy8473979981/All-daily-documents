<template>
    <div>
       <query-form :def="formDefs" @query="onQuery"  :title='titleForm'></query-form>
        <query-table :columns="columns" ref="tb" title="合同模板审核列表" api="/backend/customer/getListPage" class="mt-4">
          <template v-slot:opt="{row}" >
             <el-button type="text" @click="onView(row)">详 情</el-button>
             <el-button type="text" @click="onEdit(row)">编 辑</el-button>
             <el-button type="text" @click="onAdd(row)">新 增</el-button>
             <el-button type="text" @click="onUse(row)">{{row.status?'启 用':'禁 用'}}</el-button>
          </template>
      </query-table>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Ref } from 'vue-property-decorator'
import { formDefs, columns } from './config'
@Component
export default class FormworkList extends Vue {
  $style!: any;
  @Ref() tb!: any
  formDefs = formDefs
  columns = columns

  onQuery (params: any = {}) {
    this.tb.query(params)
  }

  onView (params: any) {
    this.$router.push(`/contract/formwork/list/detail/${params.id}`)
  }

  onEdit (params: any) {

  }

  onAdd (params: any) {

  }

  onUse (params: any) {

  }

  mounted () {
    this.onQuery()
  }
}
</script>

<style lang="scss" module>

</style>
