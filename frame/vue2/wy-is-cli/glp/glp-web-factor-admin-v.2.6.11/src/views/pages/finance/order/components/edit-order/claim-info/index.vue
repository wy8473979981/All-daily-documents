<template>
<div>
<div v-if="!isPuLianBao">
<glp-card title="基础债权信息" class="mt-4">
  <detail-form :def="baseDetailDef" :data-source="info" label-width="80px" :span="12" :xl="8"></detail-form>
</glp-card>

<query-table title="基础债权详情列表" :columns="claimColumns" :data-source="claims" :pageable="false" class="mt-4">
  <template v-slot:opt="{row}">
    <el-button type="text" @click="onViewClaim(row)">详情</el-button>
  </template>
</query-table>

<glp-card title="附件" class="mt-4" v-if="files.length > 0">
  <glp-file-link :data-source="files"></glp-file-link>
</glp-card>

<glp-card title="基础债权附件" class="mt-4" v-if="claimFiles.length > 0">
  <glp-file-link :data-source="claimFiles"></glp-file-link>
</glp-card>
</div>
<div v-else>
<query-table title="票据信息列表" :columns="billColumns" :data-source="bills" :pageable="false" class="mt-4">
  <template v-slot:header="">
    <span>签收状态:</span>
    <el-tag size="small" type="primary" class="ml-2">{{status | transcode('pledge_sign_status')}}</el-tag>
  </template>
  <template v-slot:opt="{row}">
    <el-button type="text" @click="onViewBill(row)">详情</el-button>
  </template>
</query-table>
<div class="mt-3 text-center" v-if="editable">
  <el-button size="small" type="primary" @click="onSign" :loading="submitting" v-if="canSign">票据签收</el-button>
  <el-button size="small" type="primary" @click="onResign" class="ml-5" v-if="canResign">票据重新签收处理</el-button>
</div>
</div>

</div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref, Watch, Emit } from 'vue-property-decorator'
import { baseDetailDef, claimColumns, billColumns } from './config'
import { uploadFromResp } from '@/config/form'

@Component
export default class ClaimInfo extends Vue {
  @Prop() dataSource!: any

  @Prop(String) type!: 'view' | 'audit'

  baseDetailDef = baseDetailDef

  claimColumns = claimColumns

  billColumns = billColumns

  submitting = false

  bills: any[] = []

  get info () {
    return this.dataSource?.claimInfo || {}
  }

  get claims () {
    return this.info?.baseClaims || []
  }

  get files () {
    return uploadFromResp(this.dataSource?.orderFiles || [])
  }

  get claimFiles () {
    return uploadFromResp(this.info?.uploadBaseClaims || [])
  }

  get isPuLianBao () {
    return String(this.dataSource?.projectType) === '2'
  }

  get status () {
    return this.info?.billStatus || '' // '01'
  }

  get canSign () {
    return this.status === '03'
  }

  get canResign () {
    return this.status === '01'
  }

  get editable () {
    return this.type === 'audit'
  }

  onViewClaim (row: any) {
    this.$router.push(`/assets/business-bill/detail/${row.claimNumber}`)
  }

  onViewBill (row: any) {
    this.$router.push(`/finance/order/ticket-detail/${this.dataSource?.orderNumber}_${row.paperNumber}`)
  }

  onSign () {
    const req = {
      opera: 1,
      orderNumber: this.dataSource?.orderNumber
    }
    this.submitting = true
    this.$http.post('/backend/plb/plbBillPledge', req).then(() => {
      this.$message.success('请求成功')
      return this.refreshBills()
    }).finally(() => {
      this.submitting = false
    })
  }

  onResign () {
    this.$router.push(`/finance/order/tickets/${this.dataSource?.orderNumber}`)
  }

  refreshBills () {
    return this.$http.get(`/backend/order/queryOrderDetail/${this.dataSource?.orderNumber}`).then(data => {
      this.bills = data?.claimInfo?.billInfos || []
    })
  }

  @Watch('info', { immediate: true }) infoChange () {
    this.bills = this.info?.billInfos || []
  }
}
</script>
