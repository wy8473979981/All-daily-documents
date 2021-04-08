<template>
<div>
<glp-steps :active="0">
  <glp-step :title="row.title" :status="row.status" v-for="row in options" :key="row.key">
    <p v-if="row.username">操作人：{{row.username}}</p>
    <p v-if="row.time">操作时间：{{row.time}}</p>
  </glp-step>
</glp-steps>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Watch, Emit } from 'vue-property-decorator'
import { getDictionary } from '@/config/dictionary'

const map: any = {
  通过: 'finish',
  驳回: 'reject',
  拒绝: 'error'
}

const nodeMap: any = {
  operationManagement: '运营经办',
  operationReview: '运营复核',
  financialVoucherPreparation: '财务制单'
}

@Component
export default class WorkflowSteps extends Vue {
  @Prop({ type: [String, Number] }) current!: string | number

  @Prop(Array) dataSource!: any[]

  get items () {
    return Object.entries(getDictionary('_orderAuditNode') || {}).map(([k, v]) => ({ key: k, title: v }))
  }

  get logs () {
    return this.dataSource.slice().reverse()
  }

  get options () {
    return this.items.map(v => {
      const log = this.logs.find(w => w.taskName === v.title)
      const status = nodeMap[this.current] === v.title ? 'process' : (map[log?.auditOperation] || 'wait')
      const username = log?.assigneeName || ''
      const time = log?.endTime || ''
      return Object.assign({ status, username, time }, v)
    })
  }
}
</script>
