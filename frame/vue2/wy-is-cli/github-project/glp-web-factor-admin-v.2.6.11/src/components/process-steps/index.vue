<template>
<div>
<glp-steps :active="active" process>
  <glp-step :title="row.title"  v-for="row in options" :key="row.key">
  </glp-step>
</glp-steps>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Watch, Emit } from 'vue-property-decorator'
import { getDictionary } from '@/config/dictionary'

@Component
export default class ProcessSteps extends Vue {
  @Prop({ type: [String, Number] }) current!: string | number

  @Prop(String) name!: string

  get dict () {
    return getDictionary(this.name) || {}
  }

  get items () {
    return Object.entries(this.dict).map(([k, v]) => ({ key: k, title: v }))
  }

  get options () {
    return this.items
  }

  get active () {
    const idx = this.items.findIndex(v => v.key === String(this.current))
    return idx < 0 ? 0 : idx
  }
}
</script>
