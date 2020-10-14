<template>
  <div class="p-h-c">
    <el-button @click="apply" plain type="primary">申请开通</el-button>
    <el-button @click="onFinance" plain type="primary">我要融资</el-button>
    <el-button @click="onEdit" plain type="primary">维护基本信息</el-button>
  </div>
</template>
<script lang='ts'>
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import { Getter, Mutation, namespace } from 'vuex-class'
import {
  goToFinance,
  applicationForProductOpening,
  insertAddition,
  stepNum,
  oneStep
} from '@/api/plb-invoice'
const Plb = namespace('plb')
@Component
export default class Attachment extends Vue {
  goToFinance = goToFinance
  mounted() {}

  @Plb.Mutation('setOrderId')
  setOrderId(id: string) {
    return id
  }

  @Plb.Mutation('setCurrentStep') setCurrentStep(index: number) {
    return index
  }

  onFinance() {
    goToFinance().then(res => {
      // this.$router.push('/service/account-info')
      insertAddition().then(res => {
        this.setOrderId(res)
        this.$router.push('order/apply/edit')
        this.setCurrentStep(1)
      })
    })
  }

  onEdit() {
    this.$router.push('service/account-info/edit')
  }

  apply() {
    applicationForProductOpening().then(res => {
      this.$confirm(
        '尊敬的客户您好，我们已收到您申请开通普链保的产品申请，将于1~2个工作日内联系您！',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }
      )
        .then(() => {})
        .catch(() => {})
    })
  }
}
</script>
<style lang='scss' scope>
.p-h-c {
  min-height: 1206px;
  text-align: center;
  margin-top: 40px;
}
</style>
