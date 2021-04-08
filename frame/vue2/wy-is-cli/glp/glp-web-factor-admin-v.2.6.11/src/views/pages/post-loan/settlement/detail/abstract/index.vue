<template>
  <detail-form :def="accountDetailDefs" :data-source="summary" label-width="160px"  class="mt-5"></detail-form>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import { accountDetailDefs } from './config'
@Component
export default class Abstract extends Vue {
  $style!: any

  accountDetailDefs = accountDetailDefs

  @Prop(Object) summary!: object
}
</script>
<style lang="scss" module></style>
