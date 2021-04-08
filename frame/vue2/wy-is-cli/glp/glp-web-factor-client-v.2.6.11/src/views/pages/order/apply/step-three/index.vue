<template>
  <div>
    <step-three-one></step-three-one>
    <step-three-two></step-three-two>
    <step-controll></step-controll>
  </div>
</template>
<script lang='ts'>
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import ProgressBar from './progress-bar/index.vue'
import ToolTip from './tool-tip/index.vue'
import Ocr from './ocr/index.vue'
import List from './list/index.vue'
import StepControl from '../step-control/index.vue'
import { Getter, Mutation, namespace } from 'vuex-class'
import { submitInvoiceInfo } from '@/api/plb-invoice'
const Plb = namespace('plb')
@Component({
  components: {
    ProgressBar,
    ToolTip,
    Ocr,
    List,
    StepControl
  }
})
export default class StepThree extends Vue {
  @Plb.State('currentStep') currentStep: any
  @Plb.State('orderId') orderId: any
  @Plb.Mutation('setCurrentStep') setCurrentStep(index: number) {
    return index
  }

  nextStepFun() {
    submitInvoiceInfo(this.orderId)
      .then(res => {
        if (res.length === 0) {
          this.setCurrentStep(1)
        }
      })
      .catch(() => {
        this.setCurrentStep(1)
      })
  }
}
</script>
<style lang='scss' scope>
</style>
