<template>
<div>
<edit-form-group class="mt-4" v-loading="loading" :submitting="submitting" :readonly="readonly" @submit="onSubmit" submit-text="提 交" v-if="loaded">
  <glp-section title="买卖方信息">
    <edit-form :def="transFormDefs" :form="transForm"></edit-form>
  </glp-section>
  <glp-section title="法律文书送达信息">
    <edit-form :def="receiveFormDefs" :form="receiveForm"></edit-form>
  </glp-section>
  <glp-section title="基本信息">
    <edit-form :def="baseFormDefs" :form="baseForm"></edit-form>
  </glp-section>
  <template v-slot:prepend="">
    <el-button size="small" type="info" class="px-5 mr-5" @click="onSave" :loading="submitting">保 存</el-button>
  </template>
</edit-form-group>

<query-table title="审批信息" class="mt-4" v-if="logs.length > 0" :columns="logColumns" :data-source="logs" :pageable="false">
  <template v-slot:header>
    <span>审核状态： <el-tag type="danger" size="small">{{status | transcode('debt_status_cust')}}</el-tag> </span>
  </template>
</query-table>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import { transFormDefs, receiveFormDefs, baseFormDefs, logColumns } from './config'
import { toRequest, fromResp } from './transform'
import { store } from './store'

@Component
export default class EditDebt extends Vue {
  @Prop(String) id!: boolean

  @Prop(Boolean) readonly!: boolean

  dataSource: any = null

  transFormDefs = transFormDefs

  baseFormDefs = baseFormDefs

  receiveFormDefs = receiveFormDefs

  logColumns = logColumns

  loading = false

  loaded = false

  submitting = false

  transForm: Record<string, any> = {}

  receiveForm: Record<string, any> = {}

  baseForm: Record<string, any> = {}

  get transferType () {
    return store.transferType
  }

  get buyerContact () {
    return store.buyerContact
  }

  get sellerContact () {
    return store.sellerContact
  }

  get debtDesc () {
    const buyerName = store.buyerName
    const sellerName = store.sellerName
    const transferStartTime = this.baseForm?.transferStartTime || ''
    const transferEndTime = this.baseForm?.transferEndTime || ''
    if (buyerName && sellerName && transferStartTime && transferEndTime) {
      return `${sellerName} ${buyerName} ${transferStartTime.slice(0, 10)} ${transferEndTime.slice(0, 10)} 产生的全部应收账款`
    }
    return ''
  }

  get logs () {
    return this.dataSource?.flowTaskHistoryDTOList || []
  }

  get status () {
    return this.dataSource?.debtInfo?.auditNode
  }

  loadDebtNumber () {
    if (this.id) return
    this.$http.post('/clientend/receive/debtReceivableNumber').then(data => {
      this.baseForm.debtReceivableNumber = data || ''
    })
  }

  onSubmit ([trans, receive, base]: any[]) {
    const req = toRequest({ base, receive, trans })
    this.doSubmit('submit', req)
  }

  onSave () {
    const base = this.baseForm
    const receive = this.receiveForm
    const trans = this.transForm
    const req = toRequest({ base, receive, trans })
    this.doSubmit('save', req)
  }

  doSubmit (action: 'save' | 'submit', req: any) {
    const map = {
      save: { add: '/clientend/receive/save', update: '/clientend/update/save' },
      submit: { add: '/clientend/receive/submit', update: '/clientend/update/submit' }
    }
    const type = this.id ? 'update' : 'add'
    const url = map[action][type]
    const request = this.$http.post(url, req)
    this.submitting = true
    request.then(() => {
      const message = action === 'save' ? '保存成功' : '提交成功'
      this.$message.success(message)
      this.$router.push('/finance/debt')
    }).finally(() => {
      this.submitting = false
    })
  }

  loadData () {
    const vm = this as any
    if (!this.id) {
      this.dataSource = null
      postHandle(this.dataSource)
      this.$nextTick(() => {
        this.loaded = true
      })
      return
    }
    this.loading = true
    this.$http.post('/clientend/receive/detail', {}, { params: { id: this.id } }).then(data => {
      this.dataSource = data || null
      postHandle(this.dataSource)
    }).finally(() => {
      this.loaded = true
      this.loading = false
    })

    function postHandle (data: any) {
      const { trans, receive, base } = fromResp(data)
      vm.transForm = trans
      vm.receiveForm = receive
      vm.baseForm = base
    }
  }

  mounted () {
    this.loadDebtNumber()
  }

  @Watch('transferType', { immediate: true }) transferTypeChange (newVal: any) {
    this.baseForm.transferType = newVal || ''
  }

  @Watch('buyerContact', { immediate: true }) buyerContactChange (newVal: any) {
    Object.assign(this.receiveForm, newVal || {})
  }

  @Watch('sellerContact', { immediate: true }) sellerContactChange (newVal: any) {
    Object.assign(this.receiveForm, newVal || {})
  }

  @Watch('id', { immediate: true }) idChange () {
    this.loadData()
  }

  @Watch('debtDesc') debtDescChange () {
    if (this.debtDesc) {
      this.baseForm.contentDescription = this.debtDesc
    }
  }

  created () {
    store.transferType = '' // 防止查出来的值与原值相同而不会触发watch
  }
}
</script>
