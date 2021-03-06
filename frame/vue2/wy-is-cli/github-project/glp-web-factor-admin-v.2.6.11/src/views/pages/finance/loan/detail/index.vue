<template>
  <div>
    <glp-card title="放款单详情">
      <detail-form :def="defs" :api="'/backend/loan/getLoanRecordDetail/' + id" label-width="120px"></detail-form>
    </glp-card>
    <div class="t-c mt-4">
      <el-button size="small" @click="onBack">返回</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import { defs } from './config'
@Component
export default class LoanDetail extends Vue {
  @Prop(String) id!: string

  defs = defs

  $style!: any

  onBack() {
    this.$rp.close()
  }
}
</script>

<style lang="scss" module>
</style>
