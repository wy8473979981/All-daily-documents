<template>
  <div>
    <apply-bill :def="accountDetailDefs" :refund="refund" :summary="summary" label-width="160px"></apply-bill>
    <entry-account
      :def="accountDetailDefs"
      :entryModel="entryModel"
      :summary="summary"
      @entryBankChange="entryBankChange"
      :type="type"
      :status="status"
      label-width="160px"
      class="mt-4"
    ></entry-account>
    <apply-bill-edit
      :def="accountDetailDefs"
      :model="model"
      :type="type"
      :status="status"
      :customerId="customerId"
      label-width="160px"
      class="mt-4"
    ></apply-bill-edit>
    <output-account
      v-if="!showAuditForm"
      :def="accountDetailDefs"
      :payAccount="payAccount"
      label-width="160px"
      class="mt-4"
    ></output-account>
    <operate-logs :logs="history" v-if="history.length>0"></operate-logs>
    <audit-form
      v-if="showAuditForm"
      class="mt-4"
      :passFn="(form)=>onExamine(form,4)"
      :rejectFn="(form)=>onExamine(form,2)"
      :isShowDeny="isShowDeny"
      :isShowReject="isShowReject"
      :denyFn="(form)=>onExamine(form,3)"
      :passText="passText"
      :denyText="denyText"
      :backFn="backFn"
      :isShowBack="isShowBack"
      :rejectText="rejectText"
    ></audit-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import { accountDetailDefs } from './config'
import ApplyBill from '../components/apply-bill/index.vue'
import EntryAccount from '../components/entry-account/index.vue'
import ApplyBillEdit from '../components/apply-bill-edit/index.vue'
import OutputAccount from '../components/output-account/index.vue'
import OperateLogs from '../components/operate-logs/index.vue'
import {
  balanceRetuenDetail,
  distributionDetail,
  apply,
  distributionAuditDetail,
  examine,
  repaymentDistributionAuditDetail
} from '@/api/balance'
import { getAuth } from '@/utils/perms'
@Component({
  components: {
    ApplyBill,
    EntryAccount,
    OutputAccount,
    ApplyBillEdit,
    OperateLogs
  }
})
export default class Abstract extends Vue {
  $style!: any

  @Prop() type!: string

  passText = '提交'

  denyText = '驳回'

  rejectText = '拒绝'

  isShowBack = false

  accountDetailDefs = accountDetailDefs

  summary = {}

  refund = ''

  status = 0

  customerId = ''

  showAuditForm = false

  isShowDeny = true

  isShowReject = true

  isShowSubmit = true

  isShowAudit = false

  entryModel = {
    accountNumber: '',
    accountBank: '',
    accountId: '',
    accountName: ''
  }

  payAccount = {}

  model = {
    repaymentItemList: [],
    rules: {
      applyAmount: [
        {
          validator: this.validateFn,
          trigger: 'blur'
        }
      ]
    }
  }

  @Prop(String) id!: string

  history = []

  backFn = () => {
    this.$rp.close()
  }

  entryBankChange(data: any) {
    const entryModel = {
      accountNumber: data.accountNumber,
      accountBank: data.accountBank,
      accountId: data.accountId,
      accountName: data.accountName
    }
    this.entryModel = entryModel
  }

  validateFn(rule: any, value: any, callback: Function) {
    const field = rule.field.split('.')
    const index = field[1]
    const type = field[2]
    const item: any = this.model.repaymentItemList[index]
    if (isNaN(item.applyAmount)) {
      callback(new Error('请输入数字'))
    } else if (Number(item.applyAmount) > item.availableAmount) {
      callback(new Error('金额过大'))
    }
    callback()
  }

  loadDetail() {
    const req = { refundId: this.$route.query.refundId }
    balanceRetuenDetail(req).then((data) => {
      this.summary = data.applyForm
      this.history = data.history || []
      this.entryModel = data.receiptAccount || {}
      this.payAccount = data.payAccount || {}
      this.status = data.status
      const model: any = {}
      model.rules = this.model.rules
      model.repaymentItemList = data.repaymentItemList
      this.model = model
      this.refund = data.refund
      this.auditFooterButtonInit(data.status)
    })
  }

  loadDistributionDetail(type: any) {
    const query: any = this.$route.query
    let fun: Function = distributionAuditDetail
    let data = {}
    if (type === 'audit') {
      data = {
        refund: query.refund,
        taskId: query.taskId
      }
    } else {
      fun = distributionDetail
      data = {
        projectId: query.projectId,
        saleCompanyId: query.saleCompanyId,
        distributionId: query.distributionId
      }
      if (query.from === 'bank-flow') {
        fun = repaymentDistributionAuditDetail
        data = {
          projectId: query.projectId,
          saleCompanyId: query.saleCompanyId,
          repaymentList: query.repaymentIds && query.repaymentIds.split(',')
        }
      }
    }
    fun(data).then((data: any) => {
      const model: any = {}
      model.rules = this.model.rules
      this.summary = data.applyForm
      this.history = data.history || []
      this.refund = data.refund
      this.entryModel = data.receiptAccount || {}
      model.repaymentItemList = data.repaymentItemList
      this.model = model
      this.customerId = data.customerId
      this.payAccount = data.payAccount || {}
      this.status = data.status
      this.auditFooterButtonInit(data.status)
    })
  }

  onApply(form: any, type: any) {
    const repaymentItemList: any[] = []

    const receiptAccount = {
      ...this.entryModel
    }
    if (
      this.entryModel.accountNumber === '' ||
      !this.entryModel.accountNumber
    ) {
      this.$message.error('请选择拨付到账账户')
      return
    }
    this.model.repaymentItemList.map((item: any, index) => {
      repaymentItemList.push({
        repaymentId: item.repaymentId,
        applyAmount: item.applyAmount
      })
    })
    if (this.status === 3 && type === 4) {
      type = 1
    }
    const data: any = {
      refund: this.refund,
      repaymentItemList,
      receiptAccount,
      remark: form.comment,
      type: type
    }
    apply(data).then((res) => {
      this.$router.push('/post-loan/balance')
    })
  }

  onExamine(form: any, type: any) {
    const data: Record<string, any> = {
      refund: this.$route.query.refund,
      suggestion: form.comment,
      type
    }
    examine(data).then((res) => {
      this.$router.push('/post-loan/balance')
    })
  }

  auditFooterButtonInit(status: any) {
    const authList = getAuth(this)
    if (this.type === 'edit') {
      this.passText = '提交'
      this.rejectText = '关闭'
      this.showAuditForm = authList.indexOf('submit') > -1
      this.isShowBack = true
      this.isShowDeny = false
      this.isShowReject = false
      this.onExamine = this.onApply
    } else if (this.type === 'audit' && status === 0) {
      this.passText = '提交'
      this.rejectText = '关闭'
      this.isShowBack = false
      this.isShowDeny = false
      this.showAuditForm = authList.indexOf('submit') > -1
    } else if (this.type === 'audit' && status === 3) {
      this.passText = '提交'
      this.rejectText = '关闭'
      this.isShowBack = false
      this.isShowDeny = false
      this.showAuditForm = authList.indexOf('submit') > -1
      this.onExamine = this.onApply
    } else if (this.type === 'audit') {
      this.passText = '通过'
      this.denyText = '驳回'
      this.isShowBack = false
      this.rejectText = '拒绝'
      this.showAuditForm = authList.indexOf('audit') > -1
    }
  }

  mounted() {
    switch (this.type) {
      case 'edit':
        this.loadDistributionDetail('edit')
        break
      case 'detail':
        this.loadDetail()
        break
      case 'audit':
        this.loadDistributionDetail('audit')
        break
    }
  }
}
</script>
<style lang="scss" module></style>
