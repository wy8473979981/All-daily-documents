<template>
<div>
<glp-steps :active="0">
  <glp-step :title="row.title" :status="row.status" v-for="row in options" :key="row.key">
    <!-- <p v-if="row.username">操作人：{{row.username}}</p>
    <p v-if="row.time">操作时间：{{row.time}}</p> -->
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
  legalAffairsOffice: '法务经办',
  legalReview: '法务复核',
  operationManagement: '运营经办',
  operationReview: '运营复核'
}

@Component
export default class DebtSteps extends Vue {
  @Prop({ type: [String, Number] }) current!: string | number

  @Prop(Array) dataSource!: any[]

  @Prop(String) name!: 'audit' | 'cancel'

  get items () {
    const dictName = this.name === 'audit' ? 'debt_audit_node' : 'debt_cancel_audit_node'
    return Object.entries(getDictionary(dictName) || {}).map(([k, v]) => ({ key: k, title: v }))
  }

  get logs () {
    return this.dataSource.slice().reverse()
  }

  get options () {
    return this.items.map(v => {
      const log = this.logs.find(w => w.auditNode === v.title)
      const status = nodeMap[this.current] === v.title ? 'process' : (map[log?.auditStatus] || 'wait')
      const username = log?.operatorName || ''
      const time = log?.createTime || ''
      return Object.assign({ status, username, time }, v)
    })
  }
}
</script>
