<template>
<div>
<glp-section title="收款账户信息">
  <edit-form :def="formDefs" :form="form"></edit-form>
</glp-section>
</div>
</template>

<script lang="ts">

import { Vue, Component, Ref, Watch } from 'vue-property-decorator'
import { formDefs } from './config'

@Component
export default class AccountInfo extends Vue {
  formDefs = formDefs

  form: Record<string, any> = {
    name: ''
  }

  @Watch('form.name') nameChange (newVal: string) {
    this.form.no = newVal || ''
    this.form.account = newVal || ''
  }
}
</script>
