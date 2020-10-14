<template>
     <div>
      <breadcrumb/>
      <glp-card title="放款记录" class="mt-4">
         <detail-form :def="defs" :api="`/clientend/loan/getLoanRecordDetail/${id}`" label-width="120px">
         </detail-form>
      </glp-card>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { defs } from './config'
@Component
export default class Detail extends Vue {
  @Prop(String) id!: string
  defs = defs
  $style!: any
}
</script>

<style lang="scss" module>

</style>
