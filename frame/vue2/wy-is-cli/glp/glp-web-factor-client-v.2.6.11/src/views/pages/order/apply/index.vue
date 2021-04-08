<template>
  <div>
    <breadcrumb />
    <step :currentStep="currentStep"></step>
    <step-one v-if="currentStep === 1"></step-one>
    <step-one-two v-if="currentStep === 2"></step-one-two>
    <step-two v-if="currentStep === 3"></step-two>
    <step-three-one v-if="currentStep === 4"></step-three-one>
    <step-three-two v-if="currentStep === 5"></step-three-two>
    <step-four v-if="currentStep === 6"></step-four>
    <step-control v-if="currentStep !==3"></step-control>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import Step from '../components/steps/index.vue'
import StepOne from './step-one/index.vue'
import StepOneTwo from './step-one-two/index.vue'
import StepTwo from './step-two/index.vue'
import StepThreeOne from './step-three-one/index.vue'
import StepThreeTwo from './step-three-two/index.vue'
import StepFour from './step-four/index.vue'
import StepControl from './step-control/index.vue'

import { Getter, Mutation, namespace } from 'vuex-class'
const Plb = namespace('plb')
@Component({
  components: {
    Step,
    StepOne,
    StepTwo,
    StepThreeTwo,
    StepThreeOne,
    StepFour,
    StepOneTwo,
    StepControl
  }
})
export default class Product extends Vue {
  @Prop() taskId!: string

  dataSource: Array<any> = []

  @Plb.State('currentStep') currentStep!: number

  onQuery(params: any = {}) {}

  onAdd() {
    this.$router.push('/order/apply/12')
  }

  mounted() {}
}
</script>
<style lang="scss" scoped>
</style>
