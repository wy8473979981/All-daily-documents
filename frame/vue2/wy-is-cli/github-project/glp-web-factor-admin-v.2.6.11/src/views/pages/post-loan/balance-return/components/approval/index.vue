<template>
  <div></div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
@Component
export default class EntryAccount extends Vue {
  @Prop(Object) summary!: object
}
</script>
<style lang="scss" module></style>
