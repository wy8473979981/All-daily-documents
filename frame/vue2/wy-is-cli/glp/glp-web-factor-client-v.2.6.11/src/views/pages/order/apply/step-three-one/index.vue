<template>
  <div class="setp-three-container">
    <progress-bar></progress-bar>
    <tool-tip></tool-tip>
    <ocr></ocr>
  </div>
</template>
<script lang='ts'>
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import ProgressBar from '../step-three/progress-bar/index.vue'
import ToolTip from '../step-three/tool-tip/index.vue'
import Ocr from '../step-three/ocr/index.vue'
import List from '../step-three/list/index.vue'
import { Getter, Mutation, namespace } from 'vuex-class'
import { submitInvoiceInfo } from '@/api/plb-invoice'
const Plb = namespace('plb')
@Component({
  components: {
    ProgressBar,
    ToolTip,
    Ocr,
    List
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
