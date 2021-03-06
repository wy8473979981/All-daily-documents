<template>
<div :class="[$style.container]" v-loading="loading">
<edit-form-group class="mt-4" ref="fm" :disabled="readonly || !editable" v-if="loaded">
  <template v-slot:action=""><span></span></template>
  <glp-card title="买卖方信息" class="mt-4">
    <edit-form :def="transFormDefs" :form="transForm"></edit-form>
  </glp-card>
  <glp-card title="法律文书送达信息" class="mt-4">
    <edit-form :def="receiveFormDefs" :form="receiveForm"></edit-form>
  </glp-card>
  <glp-card title="基本信息" class="mt-4">
    <edit-form :def="baseFormDefs" :form="baseForm"></edit-form>
  </glp-card>
  <glp-card title="审批信息" class="mt-4" v-if="type !== 'cancel' && auditLogs.length > 0">
    <debt-steps :current="node" :data-source="auditLogs" name="audit"></debt-steps>
    <debt-logs :data-source="auditLogs"></debt-logs>
  </glp-card>
  <glp-card title="作废信息" class="mt-4" v-if="type !== 'audit' && cancelLogs.length > 0">
    <debt-steps :current="node" :data-source="cancelLogs" name="cancel"></debt-steps>
    <debt-logs :data-source="cancelLogs"></debt-logs>
  </glp-card>
</edit-form-group>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Watch, Emit } from 'vue-property-decorator'
import DebtSteps from './debt-steps/index.vue'
import DebtLogs from './debt-logs/index.vue'
import { transFormDefs, receiveFormDefs, baseFormDefs } from './config'
import { toRequest, fromResp } from './transform'
import { store } from './store'

@Component({
  components: { DebtSteps, DebtLogs }
})
export default class EditDebt extends Vue {
  @Prop(String) id!: boolean

  @Prop(Boolean) readonly!: boolean

  @Prop(String) type!: 'view' | 'audit' | 'cancel'

  @Ref() fm!: any

  dataSource: any = null

  transFormDefs = transFormDefs

  baseFormDefs = baseFormDefs

  receiveFormDefs = receiveFormDefs

  loading = false

  loaded = false

  transForm: Record<string, any> = {}

  receiveForm: Record<string, any> = {}

  baseForm: Record<string, any> = {}

  get node () {
    return this.dataSource?.debtInfo?.node
  }

  get auditLogs () {
    return this.dataSource?.flowTaskHistoryDTOList || []
  }

  get cancelLogs () {
    return this.dataSource?.flowTaskCancelHistoryDTOList || []
  }

  get editable () {
    return String(this.node) === 'operationManagement' && this.type === 'audit'
  }

  get buyerContact () {
    return store.buyerContact
  }

  get sellerContact () {
    return store.sellerContact
  }

  submit (): Promise<Record<string, any>> {
    if (this.editable) {
      return this.fm.forSubmit().then(([trans, receive, base]: any) => {
        const form = toRequest({ base, receive, trans })
        return Object.assign({ auditType: this.node }, { updateInfo: form })
      })
    } else {
      return Promise.resolve({ auditType: this.node })
    }
  }

  loadData () {
    const vm = this as any
    // store.clearAll()
    if (!this.id) {
      this.dataSource = null
      postHandle(this.dataSource)
      this.$nextTick(() => {
        this.loaded = true
      })
      return
    }
    this.loading = true
    const url = this.type === 'view' ? '/backend/dept/deptmanagedetail' : '/backend/dept/deptreviewdetail'
    this.$http.post(url, {}, { params: { businessNo: this.id } }).then(data => {
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

  @Watch('buyerContact', { immediate: true }) buyerContactChange (newVal: any) {
    Object.assign(this.receiveForm, newVal || {})
  }

  @Watch('sellerContact', { immediate: true }) sellerContactChange (newVal: any) {
    Object.assign(this.receiveForm, newVal || {})
  }

  created () {
    this.loadData()
  }
}
</script>

<style lang="scss" module>
.container {
  min-height: 100vh;
}
</style>
