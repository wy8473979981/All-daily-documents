<template>
<div>
<query-table title="应收账款信息" :columns="debtColumns" :data-source="debts" :pageable="false">
  <template v-slot:opt="{row}">
    <el-button type="text" @click="onViewDebt(row)">详情</el-button>
  </template>
</query-table>

<query-table title="发票信息" :columns="invoiceColumns" :data-source="invoices" :pageable="false" class="mt-4">
  <template v-slot:opt="{row}">
    <!-- <el-button type="text" @click="onViewInvoice(row)">详情</el-button> -->
    <glp-file-viewer :url="row.invoiceFileUrl"></glp-file-viewer>
  </template>
</query-table>

<glp-card title="风控及额度信息" class="mt-4">
  <detail-form :def="quotaDetailDef" :data-source="quotaInfo">
    <template v-slot:link="{ }">
      <a :href="quotaInfo.amountDetailsUrl" target="_blank" v-if="quotaInfo.amountDetailsUrl">点击查看额度明细</a>
    </template>
  </detail-form>
</glp-card>

<query-table title="放款前要件" :columns="loanFileColumns" :data-source="loanFiles" :pageable="false" class="mt-4">
  <template v-slot:extra>
    <el-button type="primary" size="small" plain @click="onAddFile" v-if="editable">上传附件</el-button>
  </template>
  <template v-slot:fileName="{row}">
    <glp-file-viewer :title="row.fileName" :name="row.fileName" :url="row.filePath"></glp-file-viewer>
  </template>
  <template v-slot:opt="{row}">
    <el-button type="text" @click="onRemoveFile(row)" v-if="String(row.fileType) !== '7' && editable">删除</el-button>
  </template>
</query-table>

<glp-card title="收款账户信息" class="mt-4">
  <detail-form :def="accountDetailDef" :data-source="order" label-width="120px"></detail-form>
</glp-card>

<glp-card title="放款金额确认" class="mt-4">
  <edit-form-group :disabled="!editable || projectType === '2'" ref="fm">
    <template v-slot:action><span></span></template>
    <edit-form :def="loanDetailDef" :form="accountForm" label-width="120px" label-position="right"></edit-form>
  </edit-form-group>

  <query-table :wrap="false" :pageable="false" show-summary :summary-method="loanDetailSummaryFn" :columns="loanDetailsColumns" :data-source="loanDetails"></query-table>
</glp-card>

<glp-card title="审批信息" class="mt-4">
  <!-- <workflow-steps :data-source="logs" :current="node"></workflow-steps> -->
  <audit-steps :current="node" :name="auditDictName" :data-source="logs"></audit-steps>
</glp-card>

<query-table title="操作日志" :columns="logColumns" :data-source="logs" class="mt-4"></query-table>

<add-file ref="af"></add-file>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Watch, Emit } from 'vue-property-decorator'
import WorkflowSteps from './workflow-steps/index.vue'
import AddFile from './add-file/index.vue'
import { debtColumns, invoiceColumns, quotaDetailDef, loanFileColumns, loanDetailsColumns, logColumns, accountDetailDef, loanDetailDef } from './config'
import { uploadToRequest, uploadFromResp } from '@/config/form'
import { filter } from '@/filters'

@Component({
  components: { WorkflowSteps, AddFile }
})
export default class OrderInfo extends Vue {
  @Prop() dataSource!: any

  @Prop(String) type!: 'view' | 'audit'

  @Ref() fm!: any

  @Ref() af!: AddFile

  debtColumns = debtColumns

  invoiceColumns = invoiceColumns

  logColumns = logColumns

  quotaDetailDef = quotaDetailDef

  loanFileColumns = loanFileColumns

  loanDetailsColumns = loanDetailsColumns

  accountDetailDef = accountDetailDef

  loanDetailDef = loanDetailDef

  accountForm: any = {}

  loanFiles: any[] = []

  get debts () {
    return this.dataSource?.orderApplication?.debtReceivableRes || []
  }

  get logs () {
    return this.order?.logs || []
  }

  get invoices () {
    return this.order?.invoiceInfos || []
  }

  get loanDetails () {
    return this.order?.loanDetailVOS || []
  }

  get order () {
    return this.dataSource?.orderApplication || {}
  }

  get quotaInfo () {
    return {
      materialList: (this.order?.materialList || []).filter((v: any) => !!v.fileUrl),
      amountDetailsUrl: this.order?.amountDetailsUrl
    }
  }

  get node () {
    return this.order?.flowNode
  }

  get atStep1 () {
    return this.node === 'operationManagement'
  }

  get editable () {
    return this.type === 'audit' && this.atStep1
  }

  get auditDictName () {
    return String(this.dataSource?.status) === '1' ? '_preauditFlowNodes' : '_orderAuditNode'
  }

  get projectType () {
    return String(this.dataSource?.projectType)
  }

  loanDetailSummaryFn ({ columns, data }: any) {
    return columns.map((v: any, i: number) => {
      if (i === 0) return '总计'
      if (['endDate', 'billNo'].includes(v.property)) return '-'
      const text = (data || []).map((w: any) => Number(w[v.property] || null)).reduce((t: any, n: any) => t + n, 0)
      return filter('currency', text)
    })
  }

  submit (): Promise<any> {
    const files = this.loanFiles.filter(v => String(v.fileType) !== '7').map(v => ({ fileName: v.fileName, filePath: v.filePath, desc: v.desc }))
    return this.fm.forSubmit().then(([params]: any) => {
      const req = {
        files,
        auditOfFactoringAmount: params?.amount,
        latestRepaymentDate: params.latestRepaymentDate,
        auditType: this.order?.flowNode || 'operationManagement'
      }
      return req
    })
  }

  onViewDebt (row: any) {
    window.open(window.location.origin + `/finance/debt/detail/${row.debtReceivableNumber}`)
  }

  onViewInvoice (row: any) {
    this.$message.warning('该功能正在开发中')
  }

  onAddFile () {
    this.af.add(this.dataSource?.orderNumber).then((data: any) => {
      this.loanFiles.push({
        fileName: data.files[0]?.name,
        filePath: data.files[0]?.url,
        desc: data.desc
      })
    }).catch(() => {
      // ignore
    })
  }

  onRemoveFile (row: any) {
    const idx = this.loanFiles.findIndex(v => v === row)
    if (idx >= 0) this.loanFiles.splice(idx, 1)
  }

  @Watch('order', { immediate: true }) orderChange() {
    if (this.order) {
      this.accountForm = Object.assign({}, this.order)
      this.accountForm.amount = +this.accountForm.amount || null
      this.accountForm.latestRepaymentDate = this.order?.latestRepaymentDate ? filter('date', this.order?.latestRepaymentDate, 'T') : ''
      this.loanFiles = (this.order?.loanFiles || []).slice()
    }
  }
}
</script>
