<template>
<modal title="买方信息" width="960px" :before-confirm="beforeConfirmFn" ref="modal">
<edit-form-group :disabled="!editable" ref="fm">
  <template v-slot:action><span></span></template>
  <edit-form :def="formDef" :form="form" :span="12" :xl="12" label-width="120px"></edit-form>
</edit-form-group>
</modal>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop, Watch } from 'vue-property-decorator'
import { formDef } from './config'

@Component
export default class EditContact extends Vue {
  @Ref() modal!: any

  @Ref() fm!: any

  formDef = formDef

  form = {}

  editable = true

  edit (row: any) {
    this.editable = true
    this.initForm(row)
    return this.modal.open()
  }

  view (row: any) {
    this.editable = false
    this.initForm(row)
    return this.modal.open()
  }

  initForm (row: any) {
    this.form = {
      buyerCompName: row?.buyerCompName || '',
      buyerProvice: (row?.buyerProvice || '').split(','),
      buyerContactName: row?.buyerContactName || '',
      buyerContactEmail: row?.buyerContactEmail || '',
      buyerContactPhone: row?.buyerContactPhone || '',
      buyerSendAddress: row?.buyerSendAddress || ''
    }
  }

  beforeConfirmFn () {
    if (!this.editable) return Promise.resolve(null)
    return this.fm.forSubmit().then(([params]: any) => Object.assign({}, params, { buyerProvice: (params.buyerProvice || []).join(',') }))
  }
}
</script>

<style lang="scss" module>

</style>
