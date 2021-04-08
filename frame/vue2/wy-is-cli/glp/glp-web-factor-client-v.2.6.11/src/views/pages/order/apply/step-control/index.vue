<template>
  <div class="t-c">
    <el-button size="small" :disabled="currentStep === 1" @click="()=>onClick(-1)">上一步</el-button>
    <el-button size="small" @click="()=>onClick(1)" type="primary" v-if="currentStep < 6">下一步</el-button>
    <el-button size="small" @click="()=>onClick(1)" type="primary" v-if="currentStep === 6">提交</el-button>
  </div>
</template>
<script lang='ts'>
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import { addStep, invoiceInfoNext, reduceStep } from '@/api/plb-invoice'
import { Getter, Mutation, namespace } from 'vuex-class'
import Step from '../../components/steps/index.vue'
const Plb = namespace('plb')
@Component
export default class Attachment extends Vue {
  @Prop() nextStepFun: any
  @Prop() prevStepFun: any
  @Plb.Mutation('setCurrentStep') setCurrentStep(index: number) {
    return index
  }

  @Plb.State('currentStep') currentStep: any

  @Plb.State('orderId') orderId: any

  @Plb.Mutation('setNoteListWidthAttachment') setNoteListWidthAttachment(
    list: any
  ) {
    return list
  }

  @Plb.Mutation('setPaperContract') setPaperContract(list: any) {
    return list
  }

  @Plb.Mutation('setNoteList') setNoteList(list: any) {
    return list
  }

  @Plb.Mutation('initState') initState(list: any) {
    return list
  }

  onClick(step: number) {
    if (step === 1 && this.nextStepFun) {
      this.nextStepFun()
      return
    }
    let currentStep = this.currentStep
    currentStep = currentStep + step
    if (step === -1) {
      switch (currentStep) {
        case 1:
          this.setTwoToOne()
          break
        case 2:
          this.setThreeToTwo()
          break
        case 3:
          this.setFourToThree()
          break
        default:
          this.onReduceStep().then(res => {
            this.setCurrentStep(currentStep)
          })
      }

      return
    }

    if (currentStep === 2) {
      this.stepOneToTwo()
    }
    if (currentStep === 3) {
      this.stepTwoToThree()
    }
    if (currentStep === 5) {
      this.stepFourToFive()
    }
    if (currentStep === 6) {
      this.stepFiveToSix()
    }
    if (currentStep === 7) {
      this.submit()
    }
  }

  onAddStep() {
    return addStep(this.orderId)
  }

  onReduceStep() {
    return reduceStep(this.orderId)
  }

  // 一步跳转到第二步
  stepOneToTwo() {
    this.onAddStep().then(res => {
      this.setNoteListWidthAttachment(res.step2Resp.papers)
      this.setCurrentStep(2)
    })
  }

  // 二步跳三步
  stepTwoToThree() {
    this.onAddStep().then(res => {
      const paperContract: any = res.step3Resp.paperContract
      paperContract.supFiles = res.step3Resp.supFiles
      paperContract.conFiles = res.step3Resp.conFiles
      this.setPaperContract(paperContract)
      this.setCurrentStep(3)
    })
  }

  // 四步跳五步
  stepFourToFive() {
    // 1.提交发票信息
    this.onAddStep().then(res => {
      this.setCurrentStep(5)
    })
  }

  // 五步跳六步
  stepFiveToSix() {
    // 1.提交发票信息
    this.onAddStep().then(res => {
      const paperContract: any = res.step3Resp.paperContract
      paperContract.supFiles = res.step3Resp.supFiles
      paperContract.conFiles = res.step3Resp.conFiles
      this.setNoteListWidthAttachment(res.step2Resp.papers)
      this.setPaperContract(paperContract)
      this.setCurrentStep(6)
    })
  }

  // 二退一
  setTwoToOne() {
    this.onReduceStep().then(res => {
      this.setNoteList(res.step1Resp)
      this.setCurrentStep(1)
    })
  }

  // 三退二
  setThreeToTwo() {
    this.onReduceStep().then(res => {
      this.setNoteListWidthAttachment(res.step2Resp.papers)
      this.setCurrentStep(2)
    })
  }

  // 四退三
  setFourToThree() {
    this.onReduceStep().then(res => {
      const paperContract: any = res.step3Resp.paperContract
      paperContract.supFiles = res.step3Resp.supFiles
      paperContract.conFiles = res.step3Resp.conFiles
      this.setPaperContract(paperContract)
      this.setCurrentStep(3)
    })
  }

  // 最后一步保存
  submit() {
    this.onAddStep().then(res => {
      this.$router.push('/order')
      this.initState({})
    })
  }
}
</script>
<style lang='scss' module>
</style>
