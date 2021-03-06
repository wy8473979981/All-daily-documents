<template>
<div>
  <query-form :def="formDefs" @query="onQuery"></query-form>
  <query-table :columns="columns" :checkedRows.sync="checkedRows" row-key="id" ref="tb" api="/backend/receive/getListPage" class="mt-4">
    <template slot="extra">
      <el-button type="primary" plain size="small" title="可选择多笔应收账款进行合并登记" @click="onFirstLog" v-if="$auth.accessSync('/finance/debt/zdw-log')">中登网初始登记</el-button>
      <el-button type="danger" plain size="small" :loading="submitting" @click="onGenContract" v-if="$auth.accessSync('/finance/debt/gen-contract')">生成融资合同</el-button>
    </template>
    <template v-slot:opt="{row}">
      <el-button type="text" size="small" @click="onView(row)" v-if="$auth.accessSync('/finance/debt/detail')">详情</el-button>
      <el-button type="text" size="small" @click="onLog(row)" v-if="$auth.accessSync('/finance/debt/zdw-list')">中登登记管理</el-button>
      <el-button type="text" size="small" @click="onAudit(row)" v-if="$auth.accessSync('/finance/debt/audit') && canAudit(row)">审批</el-button>
      <el-button type="text" size="small" @click="onViewContract(row)" v-if="$auth.accessSync('/finance/debt/contract-detail') && canViewContract(row)">查看融资合同</el-button>
      <el-button type="text" size="small" @click="onCancel(row)" v-if="$auth.accessSync('/finance/debt/cancel') && canCancel(row)">作废</el-button>
    </template>
  </query-table>
  <contract-detail ref="contractDetail"></contract-detail>
  <zdw-register ref="zdwRegister"></zdw-register>
</div>
</template>

<script lang="ts">

import { Vue, Component, Ref } from 'vue-property-decorator'
import { formDefs, columns } from './config'
import { tip, affirm } from '@/utils/promp'
import { same } from '@/utils/lang'
import ContractDetail from './components/contract-detail/index.vue'
import ZdwRegister from './components/zdw-register/index.vue'

@Component({
  components: { ContractDetail, ZdwRegister }
})
export default class Debt extends Vue {
  @Ref() tb!: any

  @Ref() contractDetail!: any

  @Ref() zdwRegister!: ZdwRegister

  formDefs = formDefs

  columns = columns

  checkedRows: any[] = []

  submitting = false

  onQuery (params: any = {}) {
    this.tb.query(params)
  }

  onRefresh () {
    this.tb.refresh()
  }

  onView (row: any) {
    this.$router.push(`/finance/debt/detail/${row.debtReceivableNumber}`)
  }

  onAudit (row: any) {
    this.$router.push(`/finance/debt/audit/${row.debtReceivableNumber}`)
  }

  onViewContract (row: any) {
    this.contractDetail
      .view(row.debtReceivableNumber)
      .catch(() => {
        // ignore
      })
  }

  onCancel (row: any) {
    const businessNo = row.debtReceivableNumber
    this.$http.post('/backend/dept/deptcheckcancel', null, { params: { businessNo } }).then(() => {
      this.$router.push(`/finance/debt/cancel/${businessNo}`)
    })
    // this.$http.post('/backend/dept/deptcheckcancel', null, { params: { businessNo: row.debtReceivableNumber } }).then(() => {
    // this.$http.post('/backend/dept/initdeptcancelorder', {}, { params: { businessNo } }).then(() => {
    //   this.$router.push(`/finance/debt/cancel/${row.debtReceivableNumber}`)
    // })
    // })
  }

  onLog (row: any) {
    const suffix = row.zdwBatchId ? `?batchId=${row.zdwBatchId}&status=${row.zdwStatus}` : `?debts=${row.id}`
    this.$router.push(`/finance/debt/zdw-list${suffix}`)
  }

  onFirstLog () {
    if (this.checkedRows.length < 1) {
      this.$message.warning('请选择至少一条记录')
      return
    }
    const registeredRow = this.checkedRows.find((v: any) => String(v.zdwStatus) !== '1')
    if (registeredRow) {
      this.$message.warning(`编号为${registeredRow.debtReceivableNumber}的应收账款已经做过登记，请重新选择`)
      return
    }
    const notSignedRow = this.checkedRows.find((v: any) => String(v.contractStatus) !== '3')
    if (notSignedRow) {
      this.$message.warning(`编号为${notSignedRow.debtReceivableNumber}的应收账款合同未签署完成、不允许登记`)
      return
    }
    if (!same(this.checkedRows, 'sellerCompanyName') || !same(this.checkedRows, 'buyerCompanyName')) {
      this.$message.warning('应收账款的商业保理合同编号不同，不能一起进行中登登记')
      return
    }
    this.zdwRegister.register('init', this.checkedRows.map(v => v.id)).then(() => {
      this.onRefresh()
    })
  }

  onGenContract () {
    if (this.checkedRows.length < 1) {
      this.$message.warning('请选择至少一条记录')
      return
    }
    if (this.checkedRows.some(v => String(v.contractStatus) !== '1')) {
      this.$message.warning('您选择的应收账款信息无法生成融资合同，请重新勾选')
      return
    }
    if (!same(this.checkedRows, 'projectName')) { // TODO projectId
      this.$message.warning('非同一项目，请重新勾选')
      return
    }
    if (String(this.checkedRows[0]?.productMode) === '2' && !same(this.checkedRows, 'sellerCompanyName')) { // 普链保 统一卖方
      this.$message.warning('非同一卖方，请重新勾选')
      return
    }
    const businessNos = this.checkedRows.map(v => v.debtReceivableNumber).join(',')
    this.submitting = true
    this.$http.post('/backend/dept/generatecontract', { businessNos }).then(() => {
      this.$message.success('生成合同成功')
      this.onRefresh()
    }).finally(() => {
      this.submitting = false
    })
  }

  canAudit (row: any) {
    return String(row.showTodoReview) === '1'
  }

  canCancel (row: any) {
    // const access = this.$auth.accessSync('/finance/debt/cancel')
    const pass = String(row.status) === '2' // 审批通过
    const unUsed = String(row.useStatus) === '1' // 未使用
    return pass && unUsed
  }

  canViewContract (row: any) {
    return String(row.contractStatus) === '3' // 签署完成
  }

  mounted () {
    this.onQuery()
  }
}
</script>
