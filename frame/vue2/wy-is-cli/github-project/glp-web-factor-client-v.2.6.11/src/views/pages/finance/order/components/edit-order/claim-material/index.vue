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
export default class ClaimMaterial extends Vue {
  @Prop() form!: any

  formDefs = formDefs

  loading = false
}
</script>
