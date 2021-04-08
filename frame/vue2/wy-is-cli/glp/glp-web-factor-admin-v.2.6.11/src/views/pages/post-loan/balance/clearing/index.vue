<template>
  <div>
    <glp-card title="清分及余额拨付">
      <detail-form :def="summaryformDefs" :data-source="amountInfo"></detail-form>
    </glp-card>
    <glp-card class="mt-4">
      <template slot="title">
        <span>回款信息</span>
        <span class="mx-4 money-title">
          未核销余额汇总:
          <span class="f-w-5 money-amount">{{toClearMoney|currency}}</span>
        </span>
      </template>
      <query-table
        :wrap="false"
        :columns="columns"
        :data-source="repayments"
        :show-checked-info="false"
        :pageable="false"
        :checkedRows.sync="checkedRows"
        row-key="repayment"
        class="mt-4 j-c-fs"
      ></query-table>
    </glp-card>

    <el-form :model="modle" size="small" ref="forms" class="mt-4">
      <finance
        :data-source="modle"
        ref="financetb"
        :caclList="caclList"
        @orderSelect="orderSelect"
        @billsChange="billsChange"
        :selectRepaymentRows="checkedRows"
      ></finance>
    </el-form>
    <preview :data-source="previewData" class="mt-4"></preview>
    <footer class="t-c mt-2">
      <el-button
        type="primary"
        size="small"
        class="mr-4"
        @click="()=>clear(1)"
        :disabled="multipleSelection.length === 0"
      >清分核销</el-button>
      <el-button
        type="normal"
        size="small"
        class="mr-4"
        @click="()=>clear(2)"
        :disabled="multipleSelection.length === 0"
      >提交拨付</el-button>
    </footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Watch } from 'vue-property-decorator'
import {
  formDefs,
  columns,
  financeColumns,
  summaryformDefs,
  mapping
} from './config'
import { loadDetail, simulate, apply } from '@/api/clear'
import { sub, add, addArray } from '@/utils/math'
import finance from './finance/index.vue'
import preview from './preview/index.vue'
import { confirm } from '@/utils/promp'
@Component({
  components: { finance, preview }
})
export default class Clear extends Vue {
  $style!: any

  @Ref() tb!: any

  @Ref() financetb!: any

  @Ref() forms!: any

  formDefs = formDefs

  columns = columns

  bills = []

  financeColumns = financeColumns

  summaryformDefs = summaryformDefs

  repayments = []

  multipleSelection = []

  distribution = ''

  amountInfo = {}

  checkedRows = []

  simulateData = []

  selfEditRows = []

  previewData: Record<string, any> = {
    principal: 0,
    interest: 0,
    gracePeriod: 0,
    penalty: 0,
    list: []
  }

  get toClearMoney() {
    let num = 0
    this.repayments.map((v: any) => {
      num = add(v.availableAmount, num)
    })
    return num
  }

  @Watch('checkedRows')
  onCheckedChange() {
    this.multipleSelection = []
    const model = Object.assign({}, this.modle)
    model.bills.map((item: any) => {
      item.prePrincipal = undefined
      item.preInterest = undefined
      item.preGracePeriod = undefined
      item.prePenalty = undefined
    })
    model.rules = this.modle.rules
    this.modle = model
    this.financetb.tb.clearSelection()
    // const that = this
    // setTimeout(function () {
    //   that.forms.clearValidate()
    // }, 2000)
  }

  @Watch('modle')
  onModleChange(newValue: any, oldValue: any) {
    const repayments = [].concat(this.checkedRows)
    let total = 0
    const previewData: Record<string, any> = {
      prePrincipal: 0,
      preInterest: 0,
      preGracePeriod: 0,
      prePenalty: 0,
      list: this.checkedRows
    }
    this.multipleSelection.map((item: any) => {
      previewData.prePrincipal = add(
        previewData.prePrincipal,
        item.prePrincipal
      )
      previewData.preInterest = add(previewData.preInterest, item.preInterest)
      previewData.preGracePeriod = add(
        previewData.preGracePeriod,
        item.preGracePeriod
      )
      previewData.prePenalty = add(previewData.prePenalty, item.prePenalty)
      total = add(
        previewData.prePrincipal,
        previewData.preInterest,
        previewData.preGracePeriod,
        previewData.prePenalty
      )
    })
    const newClear: Array<any> = []
    repayments.map((item: any) => {
      if (total > 0) {
        if (item.availableAmount > total) {
          item.preAvailableAmount = total
          item.remainAvailableAmount = sub(item.availableAmount, total)
          newClear.push(item)
          total = 0
        } else {
          item.preAvailableAmount = item.availableAmount
          item.remainAvailableAmount = 0
          newClear.push(item)
          total = sub(total, item.availableAmount)
        }
      }
    })
    previewData.list = newClear
    this.previewData = previewData
  }

  caclList() {
    this.onModleChange(this.modle, this.modle)
  }

  modle: any = {
    bills: [],
    companies: {},
    orders: {},
    rules: {
      prePrincipal: [
        {
          validator: this.validateFn,
          trigger: 'change'
        }
      ],
      preInterest: [
        {
          validator: this.validateFn,
          trigger: 'change'
        }
      ],
      preGracePeriod: [
        {
          validator: this.validateFn,
          trigger: 'change'
        }
      ],
      prePenalty: [
        {
          validator: this.validateFn,
          trigger: 'change'
        }
      ]
    }
  }

  validateFn(rule: any, value: any, callback: Function) {
    const field = rule.field.split('.')
    const index = field[1]
    let type = field[2]
    const item: any = this.modle.bills[index]

    let caclItem = this.simulateData.filter((_item: any) => {
      return String(_item.billId) === String(item.billId)
    })[0]
    if (!caclItem) {
      caclItem = this.selfEditRows.filter((_item: any) => {
        return String(_item.billId) === String(item.billId)
      })[0]
      type = mapping[field[2]]
    }
    const numArray: any = []
    this.multipleSelection.map((v: any) => {
      if (v.preGracePeriod) {
        numArray.push(v.preGracePeriod)
      }
      if (v.preInterest) {
        numArray.push(v.preInterest)
      }
      if (v.prePrincipal) {
        numArray.push(v.prePrincipal)
      }
      if (v.prePenalty) {
        numArray.push(v.prePenalty)
      }
    })

    const total = addArray(numArray)
    const canClearTotal = addArray(
      this.checkedRows.map((v: any) => v.availableAmount)
    )
    if (isNaN(value)) {
      callback(new Error('请输入数字'))
    } else if (Number(value) > caclItem[type]) {
      callback(new Error('金额过大'))
    } else if (total > canClearTotal) {
      callback(new Error('总金额不能大于可清分金额'))
    }
    callback()
  }

  billsChange(val: any) {
    const model = Object.assign({}, this.modle)
    model.rules = this.modle.rules
    // model.bills
    const arr: any = []
    this.bills.map((v: any) => {
      if (val.some((j: any) => j.billId === v.billId)) {
        arr.push(v)
      }
    })
    model.bills = arr
    this.modle = model
    this.onCheckedChange()
  }

  orderSelect(val: any) {
    if (!val || val.length === 0) {
      const model = Object.assign({}, this.modle)
      const bills: any = model.bills
      for (let i = 0, len = bills.length; i < len; i++) {
        bills[i].prePrincipal = undefined
        bills[i].preInterest = undefined
        bills[i].preGracePeriod = undefined
        bills[i].prePenalty = undefined
        bills[i].disabled = false
      }
      model.rules = this.modle.rules
      this.modle = model
      return
    }
    this.multipleSelection = val
    const bills: any[] = []
    val.map((item: any) => {
      bills.push(item.billId)
    })
    const repaymentIds: any[] = []
    this.checkedRows.map((item: any, index) => {
      repaymentIds.push(item.repaymentId)
    })
    const data = {
      distribution: this.distribution,
      repaymentId: repaymentIds,
      bills
    }

    simulate(data).then((res) => {
      const model = Object.assign({}, this.modle)
      const bills: any = model.bills
      const selfEditRows: any = []
      this.simulateData = res
      for (let i = 0, len = bills.length; i < len; i++) {
        for (let j = 0, _len = res.length; j < _len; j++) {
          if (bills[i].billId === res[j].billId) {
            bills[i].prePrincipal = res[j].prePrincipal || undefined
            bills[i].preInterest = res[j].preInterest || undefined
            bills[i].preGracePeriod = res[j].preGracePeriod || undefined
            bills[i].prePenalty = res[j].prePenalty || undefined
            bills[i].disabled = true
            break
          } else {
            bills[i].prePrincipal = undefined
            bills[i].preInterest = undefined
            bills[i].preGracePeriod = undefined
            bills[i].prePenalty = undefined
            bills[i].disabled = this.multipleSelection.some(
              (v: any) => v.billId === bills[i].billId
            )
          }
        }
      }

      this.multipleSelection.map((v: any) => {
        if (!this.simulateData.some((k: any) => v.billId === k.billId)) {
          selfEditRows.push(Object.assign({}, v))
        }
      })
      this.selfEditRows = selfEditRows
      model.rules = this.modle.rules
      this.modle = model
    })
  }

  clear(type: any) {
    let msg = '是否确认清分'
    if (type === 2) {
      msg = '是否确认拨付'
    }
    confirm(msg, '提示').then(() => {
      const bills: any[] = []
      this.multipleSelection.map((item: any) => {
        bills.push({
          billId: item.billId,
          prePrincipal: item.prePrincipal || 0,
          preInterest: item.preInterest || 0,
          preGracePeriod: item.preGracePeriod || 0,
          prePenalty: item.prePenalty || 0
        })
      })
      const repaymentIds: any[] = []
      this.checkedRows.map((item: any, index) => {
        repaymentIds.push(item.repaymentId)
      })
      const data = {
        distribution: this.distribution,
        repaymentId: repaymentIds,
        bills
      }
      apply(data).then((res) => {
        this.$message('清分成功')
        if (type === 2) {
          this.$router.push({
            path: '/post-loan/balance-return/edit/edit',
            query: { ...res }
          })
        } else {
          this.$router.push('/post-loan/balance')
        }
      })
    })
  }

  loadDetail() {
    const query: any = this.$route.query
    const data = {
      projectId: query.projectId || 290,
      saleCompanyId: query.saleCompanyId || 1121595,
      repaymentIds: query.repaymentIds && query.repaymentIds.split(',')
    }
    loadDetail(data).then((res) => {
      this.repayments = res.repayments
      res.bills.map((item: any) => {
        item.prePrincipal = undefined
        item.preInterest = undefined
        item.preGracePeriod = undefined
        item.prePenalty = undefined
      })
      const obj: any = {}
      obj.rules = this.modle.rules

      obj.bills = res.bills
      obj.companies = res.companies
      obj.orders = res.orders
      obj.distribution = res.distribution
      this.modle = obj
      this.bills = res.bills
      this.distribution = res.distribution
      this.amountInfo = {
        project: res.project,
        saleCompany: res.saleCompany,
        currentTime: res.currentTime
      }
    })
  }

  mounted() {
    this.loadDetail()
  }
}
</script>

<style lang="scss" module>
</style>
