<template>
<a href=""></a>
</template>

<script lang="ts">

import { Vue, Component, Prop, Emit, Ref } from 'vue-property-decorator'

@Component
export default class GlpFileViewer extends Vue {
  @Prop(String) url!: string
}
</script>
