<template>
  <div>
    <glp-card title="融资申请单筛选">
      <el-form size="small" inline :model="searchForm" ref="form" :inline-message="true">
        <el-form-item label="融资申请单" prop="name">
          <el-select placeholder="请选择" v-model="searchForm.orderId" clearable>
            <el-option
              v-for="item in orderNo"
              v-bind:key="item.id"
              :value="item.id"
              :label="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="买方企业" prop="region">
          <el-select placeholder="请选择" v-model="searchForm.buyCompanyId" clearable>
            <el-option
              v-for="item in companyList"
              v-bind:key="item.id"
              :value="item.id"
              :label="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="dataSource.bills"
        @selection-change="handleSelectionChange"
        ref="tb"
        class="sc-c"
      >
        <el-table-column
          type="selection"
          width="55"
          :selectable="selectable"
          fixed="left"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="order" label="融资单号" width="180" fixed="left" show-overflow-tooltip></el-table-column>
        <el-table-column prop="loanTime" label="放款日期" width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="dueTime" label="还款到期日" width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="amount" label="放款金额" width="120" align="right" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.amount | currency}}</template>
        </el-table-column>
        <el-table-column
          prop="overDueAmount"
          label="未还合计"
          width="120"
          align="right"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{scope.row.overDueAmount | currency}}</template>
        </el-table-column>
        <el-table-column
          prop="principal"
          label="未还本金"
          width="120"
          align="right"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{scope.row.principal | currency}}</template>
        </el-table-column>
        <el-table-column
          prop="interest"
          label="未还利息"
          width="120"
          align="right"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{scope.row.interest | currency}}</template>
        </el-table-column>
        <el-table-column
          prop="gracePeriod"
          label="未还宽限期利息"
          align="right"
          width="120"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{scope.row.gracePeriod | currency}}</template>
        </el-table-column>
        <el-table-column
          prop="penalty"
          label="未还罚息"
          align="right"
          width="120"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{scope.row.penalty | currency}}</template>
        </el-table-column>
        <el-table-column prop="buyCompany" label="买方名称" width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="saleCompany" label="卖方名称" width="180" show-overflow-tooltip></el-table-column>
        <el-table-column
          prop="prePrincipal"
          label="预还本金"
          width="120"
          fixed="right"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-form-item
              :prop="`bills.${scope.$index}.prePrincipal`"
              :rules="dataSource.rules.prePrincipal"
            >
              <el-input
                v-model="scope.row.prePrincipal"
                @change="onInputChange"
                placeholder="预还本金"
                :disabled="!scope.row.disabled"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="preInterest" label="预还利息" width="120" fixed="right">
          <template slot-scope="scope">
            <el-form-item
              :prop="`bills.${scope.$index}.preInterest`"
              :rules="dataSource.rules.preInterest"
            >
              <el-input
                v-model="scope.row.preInterest"
                placeholder="预还利息"
                @change="onInputChange"
                :disabled="!scope.row.disabled"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="preGracePeriod" label="预还宽限期利息" width="120" fixed="right">
          <template slot-scope="scope">
            <el-form-item
              :prop="`bills.${scope.$index}.preGracePeriod`"
              :rules="dataSource.rules.preGracePeriod"
            >
              <el-input
                v-model="scope.row.preGracePeriod"
                placeholder="预还宽限期利息"
                :disabled="!scope.row.disabled"
                @change="onInputChange"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="prePenalty" label="预还罚息" width="120" fixed="right">
          <template slot-scope="scope">
            <el-form-item
              :prop="`bills.${scope.$index}.prePenalty`"
              :rules="dataSource.rules.prePenalty"
            >
              <el-input
                v-model="scope.row.prePenalty"
                placeholder="预还罚息"
                @change="onInputChange"
                :disabled="!scope.row.disabled"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </glp-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop, Watch, Emit } from 'vue-property-decorator'
import { getOrders } from '@/api/clear'
@Component
export default class Finance extends Vue {
  $style!: any

  @Ref() tb!: any

  @Ref() form!: any

  @Prop() dataSource!: Record<any, any>

  @Prop() caclList!: Function

  @Prop() selectRepaymentRows!: Array<any>

  @Emit('orderSelect') onSelectionChange(row: any) {
    this.checkedRows = row
    return row
  }

  checkedRows: any[] = []

  orderNo = []

  companyList = []

  searchForm = {
    buyCompanyId: undefined,
    orderId: undefined,
    distribution: undefined
  }

  @Emit('billsChange')
  onBillChange(value: any) {
    return value
  }

  @Watch('dataSource')
  onDataSourceChange(newValue: any, oldValue: any) {
    const orderNo: any = []
    const companyList: any = []
    Object.keys(newValue.orders).map((item: any) => {
      orderNo.push({
        id: item,
        value: newValue.orders[item]
      })
    })
    Object.keys(newValue.companies).map((item: any) => {
      companyList.push({
        id: item,
        value: newValue.companies[item]
      })
    })
    this.orderNo = orderNo
    this.companyList = companyList
    this.searchForm.distribution = newValue.distribution
  }

  selectable() {
    return this.selectRepaymentRows.length > 0
  }

  onInputChange() {
    this.caclList()
  }

  onSearch() {
    getOrders(this.searchForm).then((res) => {
      this.onBillChange(res)
    })
  }

  handleSelectionChange(val: any) {
    this.onSelectionChange(val)
  }

  mounted() {}
}
</script>

<style lang="scss" scope>
.sc-c {
  font-size: 14px;
  td {
    padding: 0px !important;
  }
  .el-form-item{
    margin: 16px 0;
  }
}
</style>
