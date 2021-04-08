<template>
<div>
<glp-section title="请上传基础债权">
  <edit-form :def="formDefs" :form="form"></edit-form>
</glp-section>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import { formDefs } from './config'

@Component
export default class EditAccount extends Vue {
  @Prop(String) id!: string

  formDefs = formDefs

  loading = false

  form: Record<string, any> = {}
}
</script>
