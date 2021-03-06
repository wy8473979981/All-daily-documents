<template>
<modal title="驳回至" ref="modal" width="360px">
  <el-radio-group v-model="value">
    <el-radio label="3">驳回至客户</el-radio>
    <el-radio label="2">驳回至客户经理</el-radio>
  </el-radio-group>
</modal>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop, Watch } from 'vue-property-decorator'

@Component
export default class DenyChooser extends Vue {
  @Ref() modal!: any

  value = '2'

  choose () {
    this.value = '2'
    return this.modal.open().then(() => this.value)
  }
}
</script>

<style lang="scss" module>

</style>
