<template>
<div>
  <glp-tabs v-model="agendaType">
    <glp-tab-pane name="0" :label="approvalLabelTitle">
      <glp-card>
        <query-form :def="approvalFormDefs" @query="onApprovalQuery" :form="approvalForm"></query-form>
        <query-table :columns="approvalColumns" ref="approvalRef" api="/backend/agenda/getListPage" class="mt-4">
          <template v-slot:updateTime="{row}">{{row.updateTime = '-'}}</template>
          <template v-slot:opt="{row}">
            <el-button type="text" @click="onApproval(row)">审批</el-button>
          </template>
        </query-table>
      </glp-card>
    </glp-tab-pane>
    <glp-tab-pane name="1" :label="doneLabelTitle">
      <glp-card>
        <query-form :def="doneFormDefs" @query="onDoneQuery"></query-form>
        <query-table :columns="doneColumns" ref="doneRef" api="/backend/agenda/getListPage" class="mt-4">
          <!-- <template v-slot:updateTime="{row}">{{row.updateTime = '-'}}</template> -->
          <template v-slot:opt="{row}">
            <el-button type="text" @click="onView(row)">查看</el-button>
          </template>
        </query-table>
      </glp-card>
    </glp-tab-pane>
  </glp-tabs>
</div>
</template>

<script lang="ts">

import { Vue, Component, Ref, Watch } from 'vue-property-decorator'
import { approvalColumns, approvalFormDefs, doneColumns, doneFormDefs, routerMapping } from './config'
import { getApprovalList, getDoneList, getThirdRealDetail } from '@/api/systemSet'
import { view, audit } from '@/config/workflow'
import { affirm } from '../../../utils/promp'

@Component
export default class Dashboard extends Vue {
  $style!: any

  agendaType: any = '0' // 0代办 1已办

  @Ref() approvalRef!: any

  @Ref() doneRef!: any

  approvalLabel = '待审批'

  doneLabel = '我的已办'

  approvalColumns = approvalColumns

  approvalFormDefs = approvalFormDefs

  approvalForm: Record<string|number, any> = {}

  paramsObj: Record<string|number, any> = {}

  doneColumns = doneColumns

  doneFormDefs = doneFormDefs

  get approvalLabelTitle () {
    return this.approvalLabel
  }

  get doneLabelTitle () {
    return this.doneLabel
  }

  @Watch('agendaType') onChangeAgendaType () {
    this.agendaType === '0' ? this.onApprovalQuery() : this.onDoneQuery()
  }

  onApprovalQuery (params: any = {}) {
    Object.assign(params, { agendaType: this.agendaType })
    this.approvalRef.query(params)
  }

  onDoneQuery (params: any = {}) {
    Object.assign(params, { agendaType: this.agendaType })
    this.doneRef.query(params)
  }

  onApproval (row: any) {
    this.onHandle(row, 'audit')
  }

  onView (row: any) {
    this.onHandle(row, 'view')
  }

  onHandle (row: any, action: 'view' | 'audit') {
    const ctx = Object.assign({}, row, { dynamicForm: row.dynamicForm ? JSON.parse(row.dynamicForm) : null })
    const url = action === 'view' ? view(ctx) : audit(ctx)
    if (url) this.$router.push(url)
    else {
      affirm('未提供相应的跳转页面', '提示')
    }
  }

  mounted () {
    this.$nextTick(() => {
      this.onApprovalQuery()
      this.onDoneQuery()
      this.approvalRef.refresh()
    })
    if (this.$route.query.doOrNot) {
      this.agendaType = this.$route.query.doOrNot
      this.onChangeAgendaType()
    }
  }
}
</script>

<style lang="scss" module>
.tree {
  width: 100%;
}

.label {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.invisible {
  visibility: hidden;
}
</style>
