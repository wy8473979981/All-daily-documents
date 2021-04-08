<template>
<div>
<glp-section title="收款账户信息">
  <edit-form :def="formDefs" :form="form"></edit-form>
</glp-section>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import { formDefs } from './config'

@Component
export default class AccountInfo extends Vue {
  @Prop() project!: any

  @Prop() form!: any

  formDefs = formDefs

  dataSource: any[] = []

  get capitalFlow () { // 资金流向 1：无要求2：翻单支付 3：定向支付
    return this.project?.capitalFlow || '1'
  }

  @Watch('form.name') nameChange (newVal: string) {
    this.form.no = newVal || ''
    this.form.account = newVal || ''
  }
}
</script>
