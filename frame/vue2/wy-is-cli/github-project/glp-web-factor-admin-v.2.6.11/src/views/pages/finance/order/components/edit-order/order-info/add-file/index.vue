<template>
<div>
  <modal title="添加附件" :before-confirm="beforeConfirmFn" ref="modal">
    <el-alert :closable="false">
      <template v-slot:title>
        <span>关联订单:</span> <span class="ml-3 text-info">{{row}}</span>
      </template>
    </el-alert>
    <edit-form-group ref="efg" v-if="loaded">
      <template v-slot:action><span></span></template>
      <edit-form :def="formDefs" :form="form" :span="24" :xl="24"></edit-form>
    </edit-form-group>
  </modal>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Watch, Emit } from 'vue-property-decorator'
import { formDefs } from './config'

@Component
export default class AddFile extends Vue {
  formDefs = formDefs

  @Ref() modal!: any

  @Ref() efg!: any

  row: any = null

  form: any = {}

  loaded = false

  add (row: any) {
    this.row = row
    this.form = {}
    this.loaded = true
    return this.modal.open().then(([data]: any) => {
      return data
    }).finally(() => {
      this.loaded = false
    })
  }

  beforeConfirmFn () {
    return this.efg.forSubmit()
  }
}
</script>
