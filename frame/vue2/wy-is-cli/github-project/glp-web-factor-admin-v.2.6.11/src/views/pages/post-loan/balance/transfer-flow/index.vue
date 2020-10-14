<template>
  <div>
    <query-form
      :def="formDefs"
      @query="onQuery"
      ref="form"
      :resetCallback="resetCallback"
      :mappingOptions="{dateType: 'F'}"
      :form="baseForm"
    ></query-form>
    <glp-card>
      <template slot="title">
        <span class="mr-4">回款交易流水</span>
        <span class="mr-4 money-title">
          未核销余额汇总:
          <span class="money-amount">{{sumBalance| number('￥')}}</span>
        </span>
      </template>
      <template slot="extra">
        <el-button
          type="primary"
          plain
          size="small"
          :disabled="baseForm.clearWay == 1 || toClearMoney === 0"
          @click="()=>onClear()"
          v-if="authList.indexOf('balance-clear')>-1"
        >发起回款核销</el-button>
        <el-button
          type="primary"
          plain
          size="small"
          @click="onBalanceReturn"
          v-if="authList.indexOf('balance-return')>-1"
          :disabled="toClearMoney === 0"
        >发起余额退回</el-button>
        <el-button type="danger" plain size="small" @click="onExport">导出</el-button>
        <el-button type="primary" plain size="small" @click="onSynchronize">流水同步</el-button>
      </template>
      <query-table
        :columns="columns"
        :checkedRows.sync="checkedRows"
        checkable
        :show-checked-info="false"
        :wrap="false"
        ref="tb"
        row-key="waterSerialNo"
        api="/backend/repayment/getRepaymentWaterBackListPage"
        class="mt-4"
      ></query-table>
    </glp-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import { formDefs, columns } from './config'
import { add } from '@/utils/math'
import {
  syncSingleAcctRepaymentWater,
  exportBackRepaymentWater,
  getBackSumBalance
} from '@/api/balance'
import { resp } from '@/utils/file'
import { format } from '@/utils/date'
import { getAuth } from '@/utils/perms'
@Component
export default class TransferFlow extends Vue {
  $style!: any

  @Prop() id!: any

  @Ref() tb!: any
  @Ref() form!: any

  formDefs = formDefs

  columns = columns

  checkedRows = []

  sumBalance = 0

  baseForm: Record<string, any> = {}

  get toClearMoney() {
    let num = 0
    this.checkedRows.map((v: any) => {
      num = add(v.creditNotAmount, num)
    })
    return num
  }

  onQuery(params: any = {}) {
    const query = this.requestParmDel(params)
    this.tb.query(query)
    this.backSumBalance(query)
  }

  get authList() {
    return getAuth(this)
  }

  requestParmDel(params: any) {
    const query = Object.assign({}, params)
    delete query.sellerName
    delete query.projectName
    delete query.clearWay
    delete query.projectId
    delete query.sellId
    delete query.ticket
    delete query.Time
    query.repaymentAccountBalanceId = this.id
    return query
  }

  backSumBalance(query: any) {
    getBackSumBalance(query).then((res: any) => {
      this.sumBalance = res.sumBalance
    })
  }

  onClear(url: string) {
    const repaymentIds: any[] = []
    this.checkedRows.map((item: any, index: any) => {
      repaymentIds.push(item.id)
    })
    const query = this.$route.query
    this.$router.push({
      path: url || '/post-loan/balance/clearing',
      query: {
        repaymentIds: repaymentIds.join(','),
        projectId: query.projectId,
        saleCompanyId: query.sellId,
        from: 'bank-flow'
      }
    })
  }

  onBalanceReturn() {
    this.onClear('/post-loan/balance-return/edit/edit')
  }

  onSynchronize() {
    syncSingleAcctRepaymentWater(this.id).then((res) => {
      this.onQuery()
      this.$message.success('流水同步成功')
    })
  }

  onExport() {
    const query = this.requestParmDel(this.baseForm)
    exportBackRepaymentWater(query).then((res) => {
      resp(res.data, `LS${format(new Date(), 'yyyyMMddHHmmss')}.xlsx`)
    })
  }

  resetCallback() {
    const url = decodeURIComponent(window.location.search)
    let arrObj = url.split('?')
    const params = Object.create(null)
    if (arrObj.length > 1) {
      arrObj = arrObj[1].split('&')
      arrObj.forEach((item: any) => {
        item = item.split('=')
        params[item[0]] = item[1]
      })
    }
    this.baseForm = params
  }

  mounted() {
    this.onQuery()
    const query: any = this.$route.query
    query.clearWay = query.clearWay + ''
    this.baseForm = query
  }
}
</script>

<style lang="scss" module>
</style>
