<template>
<div :class="[$style.container]" v-loading="loading">
  <process-steps :current="status" process name="_order5Steps"></process-steps>
  <edit-form-group :disabled="type === 'view'" ref="fm">
    <template v-slot:action><span></span></template>
    <glp-tabs v-model="tab" class="mt-4">
      <glp-tab-pane label="融资申请信息" name="order">
        <order-info :type="type" :data-source="dataSource" v-if="dataSource"></order-info>
      </glp-tab-pane>
      <glp-tab-pane label="商票信息" name="ticket">
        <ticket-info :type="type" :data-source="dataSource" v-if="dataSource"></ticket-info>
      </glp-tab-pane>
    </glp-tabs>

    <query-table title="操作日志" :columns="logColumns" :data-source="logs" class="mt-4"></query-table>

    <glp-card title="审批" class="mt-4">
      <audit-steps :current="node" name="_preauditFlowNodes" :data-source="logs"></audit-steps>
      <edit-form :def="auditFormDef" :form="auditForm" :span="24" :xl="24" label-position="left" label-width="120px" class="mt-4"></edit-form>
    </glp-card>
  </edit-form-group>

  <div class="mt-5 text-center mb-5" v-if="type === 'audit'">
    <el-button type="primary" size="small" class="mx-5 px-5" v-bind="submitProps('PASS')" @click="onPass">通过</el-button>
    <el-button type="info" size="small" class="mx-5 px-5" v-bind="submitProps('ADDITION')" @click="onAddition" v-if="$auth.accessSync('/finance/order/pre-audit/supplement')">待补充文件</el-button>
    <el-button type="warning" size="small" class="mx-5 px-5" v-bind="submitProps('REJECT')" @click="onDeny">驳回</el-button>
    <el-button type="danger" size="small" class="mx-5 px-5" v-bind="submitProps('FAIL')" @click="onReject" v-if="!atStep1">拒绝</el-button>
  </div>

  <deny-chooser ref="dc"></deny-chooser>
</div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop, Watch } from 'vue-property-decorator'
import OrderInfo from './components/order-info/index.vue'
import TicketInfo from './components/ticket-info/index.vue'
import DenyChooser from './components/deny-chooser/index.vue'
import { logColumns, auditFormDef } from './config'
import { uploadToRequest, uploadFromResp } from '@/config/form'

@Component({
  components: { OrderInfo, TicketInfo, DenyChooser }
})
export default class EditPreOrder extends Vue {
  @Prop(String) type!: 'view' | 'audit'

  @Prop(String) id!: string

  @Ref() fm!: any

  @Ref() dc!: DenyChooser

  tab = 'order'

  auditFormDef = auditFormDef

  logColumns = logColumns

  auditForm = {}

  dataSource: any = null

  loading = false

  submitting: 'PASS' | 'FAIL' | 'REJECT' | 'ADDITION' | '' = ''

  get logs () {
    return this.dataSource?.logs || []
  }

  get node () {
    return this.dataSource?.flowNode
  }

  get status () {
    return this.dataSource?.status
  }

  get atSecondStep () {
    return this.node === 'operationReview'
  }

  get atStep1 () {
    return this.node === 'BDReview'
  }

  submitProps (type: string) {
    return {
      disabled: !!this.submitting && this.submitting !== type,
      loading: !!this.submitting && this.submitting === type
    }
  }

  submit (type: 'PASS' | 'FAIL' | 'REJECT', rejectDirection?: '1' | '2' | '3') {
    this.fm.forSubmit().then(([auditForm, orderForm, contractForm, billForm, ...ticketForms]: any[]) => {
      if (['FAIL', 'REJECT'].includes(type) && !auditForm?.approvalComments) {
        this.$message.warning('请填写审批意见')
        return
      }
      const req = {
        businessNo: this.id,
        auditType: this.dataSource?.flowNode,
        reviewType: type,
        approvalComments: auditForm.approvalComments,
        rejectDirection: rejectDirection,
        reviewFiles: uploadToRequest(auditForm.reviewFiles),
        buyerUnifiedcode: orderForm.buyerUnifiedcode,
        ...billForm,
        ...contractForm,
        billList: (ticketForms || []).map(v => ({ billId: v.id, daysOfGracePeriod: v.graceUseDays, dueDate: v.endDate }))
      }
      delete req.files // 合同表单中冗余字段
      delete req.noFixed // 合同表单中冗余字段
      if (req.factoringContractRate) req.factoringContractRate = req.factoringContractRate / 100 // 利率转换
      if (req.useBasicContracts) req.useBasicContracts = uploadToRequest(req.useBasicContracts)
      this.submitting = rejectDirection === '1' ? 'ADDITION' : type
      this.$http.post('/backend/plb/lianorderreview', req).then(() => {
        this.$message.success('已提交审批请求')
        this.$rp.replace('/todo')
      }).finally(() => {
        this.submitting = ''
      })
    })
  }

  onPass () {
    this.submit('PASS')
  }

  onAddition () {
    this.submit('REJECT', '1')
  }

  onDeny () {
    if (!this.atSecondStep) {
      this.submit('REJECT', '2')
      return
    }
    this.dc.choose().then((data: any) => {
      this.submit('REJECT', data)
    }).catch(() => {
      // ignore
    })
  }

  onReject () {
    this.submit('FAIL')
  }

  loadData () {
    if (!this.id) {
      this.dataSource = null
      return
    }
    this.loading = true
    this.$http.get(`/backend/order/plb/queryPreOrderDetail/${this.id}`).then(data => {
      this.dataSource = data || null
    }).finally(() => {
      this.loading = false
    })
  }

  initAuditForm () {
    this.auditForm = {
      approvalComments: '',
      reviewFiles: uploadFromResp(this.dataSource?.reviewFiles || [])
    }
  }

  created () {
    this.loadData()
  }

  @Watch('dataSource') dataSourceChange () {
    this.initAuditForm()
  }
}
</script>

<style lang="scss" module>
.container {
  min-height: 80vh;
}
</style>
