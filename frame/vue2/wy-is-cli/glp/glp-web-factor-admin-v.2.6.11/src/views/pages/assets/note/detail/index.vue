<template>
<div>
<glp-card title="票据信息">
  <detail-form :def="defs" :api="'/assets/notes/' + id" label-width="120px"></detail-form>
</glp-card>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import { defs } from './config'
@Component
export default class NoteDetail extends Vue {
  @Prop(String) id!: string

  defs = defs

  $style!: any;
}
</script>

<style lang="scss" module>

</style>
