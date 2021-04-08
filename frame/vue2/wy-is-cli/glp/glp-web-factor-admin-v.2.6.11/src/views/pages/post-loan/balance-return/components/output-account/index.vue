<template>
  <glp-card title="出账账户信息">
    <detail-form
      :def="accountDetailDefs"
      :form="baseForm"
      :dataSource="dataSource"
      label-width="160px"
    ></detail-form>
  </glp-card>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop, Watch } from 'vue-property-decorator'
import { accountDetailDefs } from './config'
@Component
export default class OutAccount extends Vue {
  $style!: any

  accountDetailDefs = accountDetailDefs

  baseForm: Record<string, any> = {}

  dataSource: Record<string, any> = {}

  @Prop(Object) payAccount!: object

  @Watch('payAccount')
  onChangeValue (newVal: object, oldVal: string) {
    this.dataSource = newVal
  }
}
</script>
<style lang="scss" module></style>
