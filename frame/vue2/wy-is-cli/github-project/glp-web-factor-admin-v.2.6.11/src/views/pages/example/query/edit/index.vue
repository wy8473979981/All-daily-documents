<template>
<edit-form-group>
  <glp-card title="基本信息">
    <edit-form :def="baseFormDefs" :form="baseForm"></edit-form>
  </glp-card>
  <glp-card title="附加信息" class="mt-5">
    <edit-form :def="extraFormDefs"></edit-form>
  </glp-card>
</edit-form-group>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { baseFormDefs, extraFormDefs } from './config'
@Component
export default class Edit extends Vue {
  @Prop(String) id!: string

  baseFormDefs = baseFormDefs

  extraFormDefs = extraFormDefs

  baseForm: Record<string, any> = {}

  loadBaseForm () {
    if (!this.id) {
      this.baseForm = {}
      return
    }
    this.$http.get<any>(`/comp/datatable/get/${this.id}`).then(data => {
      this.baseForm = data || {}
    })
  }

  created () {
    this.loadBaseForm()
  }
}
</script>
