<template>
<div>
<glp-steps :active="active">
  <glp-step :title="row.title" :status="row.status" v-for="row in options" :key="row.key"></glp-step>
</glp-steps>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref } from 'vue-property-decorator'

@Component
export default class ApplySteps extends Vue {
  @Prop(Number) current!: number

  items = [
    { key: 1, title: '申请中' },
    { key: 3, title: '审核中' },
    { key: 4, title: '待放款' },
    { key: 5, title: '还款中' },
    { key: 6, title: '已结清' }
  ]

  get options () {
    return this.items.map(v => {
      const status = Number(this.current) < v.key ? 'wait' : (Number(this.current) > v.key ? 'finish' : 'process')
      return Object.assign({ status }, v)
    })
  }

  get active () {
    return this.options.map(v => v.key).findIndex(v => v === Number(this.current))
  }
}
</script>
