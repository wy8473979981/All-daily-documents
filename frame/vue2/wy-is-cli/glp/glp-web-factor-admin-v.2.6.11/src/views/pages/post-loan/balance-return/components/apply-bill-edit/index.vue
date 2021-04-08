<template>
  <glp-card>
    <template slot="title">
      <span>拨付申请信息</span>
      <span class="ml-2 money-title">
        未核销余额汇总
        <span class="money-amount">{{unClearAmount | currency}}</span>
      </span>
    </template>
    <el-form v-model="model.repaymentItemList" ref="forms" size="small">
      <el-table :data="model.repaymentItemList" class="bf-a-i">
        <el-table-column prop="repayment" label="回款单号"></el-table-column>
        <el-table-column prop="tradeTime" label="回款日期"></el-table-column>
        <el-table-column prop="repaymentAmount" label="流水金额">
          <template slot-scope="scope">{{scope.row.repaymentAmount | currency}}</template>
        </el-table-column>
        <el-table-column prop="availableAmount" label="未核销金额">
          <template slot-scope="scope">{{scope.row.availableAmount | currency}}</template>
        </el-table-column>
        <el-table-column prop="applyAmount" label="申请拨付金额">
          <template slot-scope="scope">
            <el-form-item
              :prop="`repaymentItemList.${scope.$index}.applyAmount`"
              :rules="model.rules.applyAmount"
            >
              <el-input
                :disabled="disabled"
                v-model="scope.row.applyAmount"
                placeholder="预还本金"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </glp-card>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import { formDefs, columns } from './config'
import { add } from '@/utils/math'
@Component
export default class Index extends Vue {
  $style!: any

  @Prop() model!: any

  @Prop() type!: string

  @Prop() status!: number

  @Ref() financetb!: any

  get disabled() {
    if (this.status === 3) {
      return false
    }
    if (this.type !== 'edit') {
      return true
    }
    return false
  }

  get unClearAmount() {
    const data = this.model.repaymentItemList || []
    let num = 0
    data.map((item: any) => {
      num = add(num, item.availableAmount)
    })
    return num
  }

  formDefs = formDefs

  columns = columns
}
</script>
<style lang="scss" scope>
.bf-a-i {
  .el-form-item--small.el-form-item {
    margin-bottom: 0;
  }
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
