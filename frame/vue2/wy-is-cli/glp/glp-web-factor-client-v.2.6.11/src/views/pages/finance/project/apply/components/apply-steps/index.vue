<template>
<div>
<glp-steps :active="1">
  <glp-step title="申请中"></glp-step>
  <glp-step title="审核中"></glp-step>
  <glp-step title="待放款"></glp-step>
  <glp-step title="还款中"></glp-step>
  <glp-step title="已结清"></glp-step>
</glp-steps>
</div>
</template>

<script lang="ts">

import { Vue, Component, Ref } from 'vue-property-decorator'

@Component
export default class ApplySteps extends Vue {

}
</script>
