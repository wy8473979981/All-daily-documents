<template>
<div>
<glp-section title="配置信息">
  <detail-form :def="formDefs" :data-source="project" label-width="140px"></detail-form>
</glp-section>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import { formDefs } from './config'

@Component
export default class ConfigInfo extends Vue {
  @Prop() project!: any

  formDefs = formDefs
}
</script>
