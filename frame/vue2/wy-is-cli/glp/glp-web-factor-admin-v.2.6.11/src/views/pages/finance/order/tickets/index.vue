<template>
<div>
<query-table title="票据信息列表" :data-source="tickets" :pageable="false" class="mt-4" v-loading="loading">
  <template v-slot:header="">
    <span>签收状态:</span>
    <el-tag size="small" type="primary" class="ml-2">{{signStatus | transcode('pledge_sign_status')}}</el-tag>
    <!-- <el-tag size="small" type="danger" class="ml-3">合同生成状态: {{contractStatus}}</el-tag> -->
  </template>
  <el-table-column prop="paperNumber" label="票据号">
    <template v-slot="{row}">
      <el-input v-model.trim="row.paperNumber" clearable size="small"></el-input>
    </template>
  </el-table-column>
  <el-table-column prop="paperFrom" label="出票人">
    <template v-slot="{row}">
      <el-input v-model.trim="row.paperFrom" clearable size="small"></el-input>
    </template>
  </el-table-column>
  <el-table-column prop="paperUsed" label="承兑人">
    <template v-slot="{row}">
      <el-input v-model.trim="row.paperUsed" clearable size="small"></el-input>
    </template>
  </el-table-column>
  <el-table-column prop="paperAmount" label="票据金额">
    <template v-slot="{row}">
      <glp-number v-model="row.paperAmount" clearable size="small" :unit="false"></glp-number>
    </template>
  </el-table-column>
  <el-table-column prop="paperFromDate" label="出票日">
    <template v-slot="{row}">
      <el-date-picker v-model="row.paperFromDate" type="date" :format="format" clearable size="small"></el-date-picker>
    </template>
  </el-table-column>
  <el-table-column prop="paperExpiredDate" label="票据到期日">
    <template v-slot="{row}">
      <el-date-picker v-model="row.paperExpiredDate" type="date" :format="format" clearable size="small"></el-date-picker>
    </template>
  </el-table-column>
  <template v-slot:opt="{row}">
    <el-button type="text" @click="onViewBill(row)">详情</el-button>
  </template>
</query-table>

<div class="mt-5 text-center">
  <el-button type="primary" size="small" class="px-5 mx-3" @click="onSave" :loading="submitting === 'save'" :disabled="!!submitting">保存票据信息</el-button>
  <el-button type="danger" size="small" class="px-5 mx-3" @click="OnGenContract" :loading="submitting === 'contract'" :disabled="!!submitting || String(contractStatus) === '0'">重新生成票据质押合同</el-button>
  <el-button type="danger" size="small" class="px-5 mx-3" @click="onSign" :loading="submitting === 'sign'" :disabled="!!submitting || signStatus !== '01'">票据重新签收</el-button>
</div>
</div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import { date } from '@/config/form'

@Component
export default class Tickets extends Vue {
  @Prop(String) id!: string

  tickets: any[] = []

  loading = false

  format = date

  submitting: 'save' | 'contract' | 'sign' | '' = ''

  signStatus = ''

  contractStatus = ''

  loadData () {
    if (!this.id) {
      this.tickets = []
      return
    }
    this.loading = true
    this.$http.get(`/backend/order/plb/queryBillList/${this.id}`).then(data => {
      this.signStatus = data?.status || ''
      this.contractStatus = data?.contractStatus || ''
      this.tickets = (data?.billList || []).map((v: any) => {
        return {
          id: v.id,
          orderNum: v.orderNum || '',
          paperNumber: v.paperNumber || '',
          paperFrom: v.paperFrom || '',
          paperUsed: v.paperUsed || '',
          paperAmount: v.paperAmount ? Number(v.paperAmount) : null,
          paperFromDate: v.paperFromDate || '',
          paperExpiredDate: v.paperExpiredDate || '',
          paperFromBank: v.paperFromBank || '',
          paperGuarantee: v.paperGuarantee || '',
          paperUsedBank: v.paperUsedBank || '',
          tempId: v.tempId || '',
          fileId: v.fileId || '',
          fileName: v.fileName || '',
          fileUrl: v.fileUrl || ''
        }
      })
    }).finally(() => {
      this.loading = false
    })
  }

  onViewBill (row: any) {
    this.$router.push(`/finance/order/ticket-detail/${this.id}_${row.paperNumber}`)
  }

  onSave () {
    const req = {
      orderNum: this.id,
      aperEffectives: this.tickets.map((v: any) => {
        const r = Object.assign({}, v)
        return r
      })
    }
    this.submitting = 'save'
    this.$http.post('/backend/order/plb/updateBillList', req).then(() => {
      this.$message.success('保存成功')
      this.loadData()
    }).finally(() => {
      this.submitting = ''
    })
  }

  OnGenContract () {
    this.submitting = 'contract'
    this.$http.post(`/backend/plb/rebuildBillPledgeContract/${this.id}`).then(() => {
      this.$message.success('请求成功')
    }).finally(() => {
      this.submitting = ''
    })
  }

  onSign () {
    const req = {
      opera: 2,
      orderNumber: this.id
    }
    this.submitting = 'sign'
    this.$http.post('/backend/plb/plbBillPledge', req).then(() => {
      this.$message.success('请求成功')
      return this.loadData()
    }).finally(() => {
      this.submitting = ''
    })
  }

  created () {
    this.loadData()
  }
}
</script>

<style lang="scss" module>

</style>
