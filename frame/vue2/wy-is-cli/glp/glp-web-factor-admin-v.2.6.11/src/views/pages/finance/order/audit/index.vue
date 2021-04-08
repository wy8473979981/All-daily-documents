<template>
<div>
  <edit-order :id="id" type="audit" @load="onLoad" ref="order"></edit-order>
  <!-- <audit-form :pass-fn="passFn" :deny-fn="isPuLiaoBao ? undefined : denyFn" :reject-fn="atStep1 ? rejectFn : undefined" reject-text="关闭订单" class="mt-4">
    <template v-slot:extra>
      <el-button size="small" class="px-5 mx-3" @click="onDenyTo('1')" v-if="atStep3">退回运营处理</el-button>
      <el-button type="info" size="small" class="px-5 mx-3" @click="onDenyTo('100')">账户修改通知</el-button>
    </template>
  </audit-form> -->
  <edit-form-group class="mt-4">
    <template v-slot:action><span></span></template>
    <edit-form :def="auditFormDef" :form="form" :span="24" :xl="24" label-position="left" label-width="80px" class="mt-4"></edit-form>
  </edit-form-group>
  <div class="text-center mt-2">
    <el-button type="primary" size="small" class="px-5 mx-3" :loading="submitting === 'pass'" :disabled="!!submitting" @click="onPass">通 过</el-button>
    <el-button type="warning" size="small" class="px-5 mx-3" :loading="submitting === 'deny'" :disabled="!!submitting" @click="onDeny" v-if="!isPuLiaoBao">驳 回</el-button>
    <el-button type="danger" size="small" class="px-5 mx-3" :loading="submitting === 'close'" :disabled="!!submitting" @click="onClose" v-if="$auth.accessSync('/finance/order/audit/close-order')">关闭订单</el-button>
    <el-button size="small" class="px-5 mx-3" :loading="submitting === 'denyToOpt'" :disabled="!!submitting" @click="onDenyToOpt" v-if="$auth.accessSync('/finance/order/audit/deny-to-opt')">退回运营处理</el-button>
    <el-button size="small" class="px-5 mx-3" :loading="submitting === 'notify'" :disabled="!!submitting" @click="onNotify" v-if="$auth.accessSync('/finance/order/audit/account-notify') && !isPuLiaoBao">账户修改通知</el-button>
  </div>
</div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import EditOrder from '../components/edit-order/index.vue'
import { auditFormDef } from './config'

@Component({
  components: { EditOrder }
})
export default class Audit extends Vue {
  @Prop(String) id!: string

  @Ref() order!: EditOrder

  auditFormDef = auditFormDef

  dataSource: any = null

  form = {
    comment: ''
  }

  submitting: 'pass' | 'deny' | 'close' | 'notify' | 'denyToOpt' | '' = ''

  get node () {
    return this.dataSource?.orderApplication?.flowNode
  }

  get atStep1 () {
    return this.node === 'operationManagement'
  }

  get atStep3 () {
    return this.node === 'financialVoucherPreparation'
  }

  get isPuLiaoBao () {
    return String(this.dataSource?.projectType) === '2'
  }

  audit (action: 'PASS' | 'REJECT' | 'FAIL', type: 'pass' | 'deny' | 'close' | 'notify' | 'denyToOpt', to?: number) {
    const commment = this.form.comment
    if (['REJECT', 'FAIL'].includes(action) && !commment) {
      this.$message.warning('请填写审批意见')
      return
    }
    this.submitting = type
    this.order.submit().then((params: any) => {
      const req = Object.assign({ extraData: { to } }, { reviewType: action, approvalComments: commment, businessNo: this.id }, params || {})
      return this.$http.post('/backend/yunorder/yunorderreview', req)
    }).then(() => {
      this.$message.success('提交审核请求成功')
      this.$rp.replace('/todo')
    }).finally(() => {
      this.submitting = ''
    })
  }

  onPass () {
    this.audit('PASS', 'pass')
  }

  onClose () {
    this.audit('FAIL', 'close')
  }

  onDeny () {
    this.audit('REJECT', 'deny', 1)
  }

  onNotify () {
    this.audit('REJECT', 'notify', 100)
  }

  onDenyToOpt () {
    this.audit('REJECT', 'denyToOpt', 2)
  }

  // passFn ({ comment }: any) {
  //   return this.audit('PASS', comment)
  // }

  // denyFn ({ comment }: any) {
  //   return this.audit('REJECT', comment)
  // }

  // rejectFn ({ comment }: any) {
  //   return this.audit('FAIL', comment)
  // }

  // onDenyTo (to: string) {
  //   return this.audit('REJECT', '', to)
  // }

  onLoad (data: any) {
    this.dataSource = data || null
  }
}
</script>

<style lang="scss" module>

</style>
