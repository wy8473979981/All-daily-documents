<template>
<div :class="[$style.container]" v-loading="loading">
<edit-form-group class="mt-4" :submitting="submitting" @submit="onSubmit" v-if="loaded">
  <audit-steps :current="1" name="_orderSteps"></audit-steps>
  <!-- <config-info :project="project" class="mt-7"></config-info> -->
  <base-info :project="project" :form="form" class="mt-6"></base-info>
  <debt-info class="mt-6" :project="project" :buyerId.sync="buyerId" :debts.sync="debts" :order="dataSource"></debt-info>
  <account-info class="mt-6" :project="project" :form="form"></account-info>
  <claim-info class="mt-6" :claims.sync="claims" :debts="debts" :order="dataSource" v-if="transferMethod === '2'"></claim-info>
  <claim-material :form="form" v-else></claim-material>
</edit-form-group>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import ConfigInfo from './config-info/index.vue'
import BaseInfo from './base-info/index.vue'
import DebtInfo from './debt-info/index.vue'
import AccountInfo from './account-info/index.vue'
import ClaimInfo from './claim-info/index.vue'
import ClaimMaterial from './claim-material/index.vue'
import { addDays, format, parse, trunc } from '@/utils/date'
import { date, uploadToRequest, datetime } from '@/config/form'
import currency from '@/filters/currency'
import { filter } from '@/filters'

@Component({
  components: { ConfigInfo, BaseInfo, DebtInfo, AccountInfo, ClaimInfo, ClaimMaterial }
})
export default class EditOrder extends Vue {
  @Prop(String) projectId!: string // 新增模式

  @Prop(String) orderNumber!: string // 编辑模式

  // 项目信息汇总
  project: any = null

  form: any = {
    accountId: '', // 收款账户Id
    applicationAmount: null, // 本次申请融资金额
    // buyerId: '', // 买方ecif id
    // claims: [], // 基础债权编号集合
    // debts: [], // 应收账款编号
    latestRepaymentDate: '', // 最晚还款日
    // projectId: '', // 项目Id
    totalAmount: null, // 本次应收账款转让金额
    // local
    // capitalFlow: '', // 资金流向
    receiptBankNumber: '', // 收款账户号
    receiptBankFiliale: '', // 收款账户支行
    files: []
  }

  dataSource: any = null

  buyerId: any = null // 卖方ID

  loading = false

  loaded = false

  submitting = false

  debts: any[] = []

  claims: any[] = []

  get isEdit () {
    return !!this.orderNumber
  }

  get totalAmount () { // 总金额
    if (this.transferMethod === '1') return this.debts.reduce((sum, n) => sum + Number(n.amount), 0)
    return this.claims.reduce((sum, n) => sum + Number(n.tradeAmount), 0)
  }

  get applyAmount () { // 申请金额
    const amount = this.totalAmount * (this.project?.discount || 0)
    return Math.min(amount, this.project?.availAmount || 0)
  }

  get latestRepaymentDate () { // 最晚还款日
    if (!this.project) return null
    // if (this.project?.businessType !== 'GLP_TRANSPORT') return null // 非普运贷 不计算
    if (String(this.project?.latestDueDateType) === '1') {
      if (this.claims.length < 1) return null
      // const minDate = trunc(new Date()).getTime() // TODO
      const minDate = Math.min(...this.claims.filter(v => !!v.effectTime).map(v => parse(v.effectTime, datetime)?.getTime()), Date.now())
      const day = this.project?.creditDuration || 0
      return addDays(trunc(new Date(minDate)), day)
    }
    return null
  }

  get transferMethod () {
    return String(this.project?.transferMethod)
  }

  onSubmit (params: any[]) {
    if (this.debts.length < 1) {
      this.$message.warning('请选择应收账款')
      return
    }
    if (this.transferMethod === '2' && this.claims.length < 1) {
      this.$message.warning('请选择基础债权')
      return
    }
    if (this.transferMethod === '1' && this.form.files?.length < 1) {
      this.$message.warning('请上传基础债权')
      return
    }
    const form = params[0] || {}
    const { accountId, totalAmount, applicationAmount, latestRepaymentDate, files } = form

    if (applicationAmount > this.applyAmount) {
      this.$message.warning('申请融资金额不能高于 ' + currency(this.applyAmount))
      return
    }

    if (this.latestRepaymentDate) {
      if (Math.abs(parse(latestRepaymentDate, datetime).getTime() - this.latestRepaymentDate.getTime()) > 1000) {
        this.$message.warning('最晚还款日超过最长用信期限，请重新选择 ' + format(this.latestRepaymentDate, date))
        return
      }
    }

    const req: any = { accountId, totalAmount, applicationAmount, latestRepaymentDate }
    req.projectId = this.project?.projectId
    req.debts = this.debts.map(v => v.debtReceivableNumber)
    req.claims = this.claims.map(v => v.claimNumber)
    req.files = uploadToRequest(files)
    req.buyerId = this.buyerId
    req.orderNum = this.orderNumber // 重新发起
    this.submitting = true
    this.$http.post('/clientend/order/create', req).then(data => {
      this.$message.success('创建融资订单成功')
      this.$router.push('/finance/order')
    }).finally(() => {
      this.submitting = false
    })
  }

  loadProject () {
    const projectId = this.projectId || this.dataSource?.projectId
    return this.$http.get(`/clientend/order/queryBaseInfo/${projectId}`).then(data => {
      this.project = {
        projectId: projectId,
        availAmount: data?.availableAmount || 0, // 可用信额度
        roi: data?.actualInterestRate || 0, // 融资利率
        discount: data?.discountRate || 0, // 折扣率
        balance: data?.totalOrderCount || 0, // 余额
        // capitalFlow: data?.capitalFlow || '', // 资金流向 1：无要求2：翻单支付 3：定向支付
        transferMethod: data?.transferMethod || '', // 基础债权获取方式 1：人工上传，2：数据对接
        businessType: data?.businessType || '', // GLP_TRANSPORT 普运贷, GLP_CHAIN_FACTORING 普链保,
        latestDueDateType: data?.latestDueDateType || '', // 最晚还款日 1：基础债权生效时间+风控审批最长期限 2：自定义 3：票据最晚还款日 4：经计算后自然月最后一天
        creditDuration: data?.creditDuration || 0, // 当前企业对应卖方额度的单笔最长用信期限
        debtType: data?.debtType || '' // 基础债权类型 1：商票，2：运单类，3：无要求
      }
      this.form.projectId = projectId
    })
  }

  loadData () {
    return this.$http.post('/clientend/order/queryOrderDetail', { orderNumber: this.orderNumber }).then(data => {
      this.dataSource = data || null
      const d = this.dataSource
      this.form = {
        accountId: d?.accountId || 160, // TODO 收款账户Id
        accountName: d?.bankAccountName || '', // TODO 收款账户Id
        applicationAmount: d?.approvalAmount || null, // 本次申请融资金额
        // buyerId: '', // 买方ecif id
        latestRepaymentDate: filter('date', 'T') || '', // 最晚还款日
        // projectId: '', // 项目Id
        totalAmount: 0, // 本次应收账款转让金额
        // local
        capitalFlow: '', // 资金流向
        receiptBankNumber: d?.bankAccountNumber || '', // 收款账户号
        receiptBankFiliale: d?.bankBranchName || '', // 收款账户支行
        files: []
      }
      // this.claims = d?.baseClaims || [] // 基础债权编号集合
      // this.debts = d?.debtReceivableRes || [] // 应收账款编号
      // this.buyerId = 42 // TODO
    })
  }

  loadAll () {
    this.loading = true
    if (this.isEdit) {
      this.loadData().then(() => {
        return this.loadProject()
      }).then(() => {
        this.loaded = true
      }).finally(() => {
        this.loading = false
      })
    } else {
      this.loadProject().then(() => {
        this.loaded = true
      }).finally(() => {
        this.loading = false
      })
    }
  }

  created () {
    this.loadAll()
  }

  @Watch('totalAmount') totalAmountChange () {
    this.form.totalAmount = this.totalAmount || 0
  }

  @Watch('applyAmount') applyAmountChange () {
    this.form.applicationAmount = this.applyAmount || 0
  }

  @Watch('latestRepaymentDate') latestRepaymentDateChange () {
    if (this.latestRepaymentDate && String(this.project?.latestDueDateType) === '1') {
      this.form.latestRepaymentDate = format(this.latestRepaymentDate, datetime)
    }
  }
}
</script>

<style lang="scss" module>
.container {
  min-height: 80vh;
}
</style>
