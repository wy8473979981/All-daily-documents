<template>
  <div>
    <base-info :form="form"></base-info>
    <partner-info :form="form"></partner-info>
    <attachment :form="form"></attachment>
    <extra-attachment @onFormChange="onFormChange"></extra-attachment>
    <step-control :nextStepFun="nextStepFun"></step-control>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop, Watch } from 'vue-property-decorator'
import { addStep3 } from '@/api/plb-invoice'
import { columns, formDefs } from './config'
import BaseInfo from './base-info/index.vue'
import PartnerInfo from './partner-info/index.vue'
import Attachment from './attachment/index.vue'
import ExtraAttachment from './extra-attachment/index.vue'
import StepControl from '../step-control/index.vue'
import { namespace } from 'vuex-class'
const Plb = namespace('plb')
@Component({
  components: {
    BaseInfo,
    PartnerInfo,
    Attachment,
    ExtraAttachment,
    StepControl
  }
})
export default class StepTwo extends Vue {
  @Ref() tb!: any

  @Prop() taskId!: string

  @Plb.State('orderId') orderId!: any

  @Plb.State('paperContract') paperContract!: any

  formDefs = formDefs

  columns = columns

  dataSource: Array<any> = []

  get form() {
    if (!this.paperContract.supFiles) {
      this.paperContract.supFiles = []
    }
    return this.paperContract
  }

  onFormChange(value: any) {
    const _value = Object.assign({}, value)
    delete _value.status
    delete _value.uid
    this.form.supFiles.push(_value)
  }

  nextStepFun() {
    const data = Object.assign({}, this.form)
    const _supFiles: any = []
    const _conFiles: any = []
    data.supFiles.map((item: any, index: any) => {
      _supFiles.push({
        code: item.code,
        path: item.path,
        name: item.name
      })
    })

    data.conFiles.map((item: any, index: any) => {
      _conFiles.push({
        code: item.code,
        path: item.path,
        name: item.name
      })
    })
    data.supFiles = _supFiles
    data.conFiles = _conFiles
    data.orderId = this.orderId
    addStep3(data).then(res => {
      this.setCurrentStep(4)
    })
  }

  @Plb.Mutation('setCurrentStep') setCurrentStep(index: number) {
    return index
  }
}
</script>
