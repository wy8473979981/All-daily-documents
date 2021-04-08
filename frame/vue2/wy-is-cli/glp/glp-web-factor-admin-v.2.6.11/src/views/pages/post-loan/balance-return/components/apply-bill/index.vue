<template>
  <glp-card>
    <template slot="title">
      拨付申请单
      <span class="money-title">{{refund}}</span>
    </template>
    <detail-form :def="accountDetailDefs" :data-source="summary" label-width="160px"></detail-form>
  </glp-card>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import { accountDetailDefs } from './config'

@Component
export default class ApplyBill extends Vue {
  $style!: any

  @Prop(Object) summary!: object

  @Prop() refund!: any

  accountDetailDefs = accountDetailDefs
}
</script>
<style lang="scss" module></style>
