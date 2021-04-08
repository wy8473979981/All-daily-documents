<template>
<div>
<glp-steps :active="0">
  <glp-step :title="row.title" :status="row.status" v-for="row in options" :key="row.key">
    <p v-if="row.username">操作人：{{row.username}}</p>
    <p v-if="row.time">操作时间：{{row.time | date('T')}}</p>
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

// const nodeMap: any = {
//   legalAffairsOffice: '法务经办',
//   legalReview: '法务复核',
//   operationManagement: '运营经办',
//   operationReview: '运营复核'
// }

@Component
export default class AuditSteps extends Vue {
  @Prop({ type: [String, Number] }) current!: string | number

  @Prop(Array) dataSource!: any[]

  @Prop(String) name!: string

  get dict () {
    return getDictionary(this.name) || {}
  }

  get items () {
    return Object.entries(this.dict).map(([k, v]) => ({ key: k, title: v }))
  }

  get logs () {
    return this.dataSource.slice().reverse()
  }

  get options () {
    return this.items.map(v => {
      const log = this.logs.find(w => w.auditNode === v.title)
      const status = this.dict[this.current] === v.title ? 'process' : (map[log?.auditStatus] || 'wait')
      const username = log?.operatorName || ''
      const time = log?.createTime || ''
      return Object.assign({ status, username, time }, v)
    })
  }
}
</script>
