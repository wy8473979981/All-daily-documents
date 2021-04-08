<template>
  <div>
    <glp-card title="融资订单相关" class="my-4">
      <el-form
        size="small"
        ref="orderFormRef"
        :model="form"
        label-position="top"
        :disabled="pageType==='detail' || pageType==='auth' || !accessOrder"
      >
        <el-row :gutter="32">
          <el-col :span="8">
            <el-form-item label="资金流向">
              <el-select
                v-model="form.capitalFlow"
                :class="[$style.colwidth]"
                :disabled="true"
              >
                <dict-options name="project_zjlx"></dict-options>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="债权通知类型">
              <el-select
                v-model="form.debtTransNotice"
                :class="[$style.colwidth]"
                :disabled="true"
              >
                <dict-options name="project_zqzrtzlx"></dict-options>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="应收账款转让类型">
              <el-select
                v-model="form.billTransType"
                placeholder
                :class="[$style.colwidth]"
                :disabled="true"
              >
                <dict-options name="project_yszkzrlx"></dict-options>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :span="8">
            <el-form-item label="起息日">
              <el-select
                v-model="form.valueDate"
                placeholder
                :class="[$style.colwidth]"
                :disabled="valueDateFlag"
              >
                <dict-options name="project_qxr"></dict-options>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="放款审批流">
              <el-select
                v-model="form.makeLoanApproverFlow"
                placeholder
                :class="[$style.colwidth]"
                :disabled="disabledFlag"
              >
                <dict-options name="project_fkspl"></dict-options>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="最晚还款日">
              <el-select
                v-model="form.latestDueDateType"
                placeholder
                :class="[$style.colwidth]"
                :disabled="latestDueDateFlag"
              >
                <dict-options name="project_zwhkr"></dict-options>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </glp-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Emit, Watch } from 'vue-property-decorator'

@Component
export default class OrderForm extends Vue {
  $style!: any

  @Ref() orderFormRef!: any

  @Prop() pageType!: string

  @Prop() orderForm!: any

  @Prop() disabledFlag!: boolean

  accessOrder = false

  form: Record<string|number, any> ={
    capitalFlow: '',
    debtTransNotice: '',
    billTransType: '',
    valueDate: '',
    makeLoanApproverFlow: '',
    latestDueDateType: ''
  }

  valueDateFlag = false

  latestDueDateFlag = false

  @Emit('onOrderForm') getOrderForm () {
    return this.form
  }

  @Watch('orderForm') onChangeOrderForm () {
    // this.form = this.orderForm
    this.form.capitalFlow = String(this.orderForm?.capitalFlow)
    this.form.debtTransNotice = String(this.orderForm?.debtTransNotice)
    this.form.billTransType = String(this.orderForm?.billTransType)
    this.form.valueDate = String(this.orderForm?.valueDate)
    this.form.makeLoanApproverFlow = String(this.orderForm?.makeLoanApproverFlow)
    this.form.latestDueDateType = String(this.orderForm?.latestDueDateType) === '0' ? '2' : String(this.orderForm?.latestDueDateType)
    if (this.orderForm.businessType !== 'GLP_CHAIN_FACTORING' && this.orderForm.businessType !== 'GLP_TRANSPORT') {
      this.valueDateFlag = false
      this.latestDueDateFlag = false
    } else {
      this.valueDateFlag = true
      this.latestDueDateFlag = true
    }
  }

  mounted () {
    this.getOrderForm()
    const access = this.$auth.accessSync('/project/product/edit/order') || this.$auth.accessSync('/project/product/open-edit/order')
    if (access) {
      this.accessOrder = true
    }
  }
}
</script>

<style lang="scss" module>
.colwidth {
  width: 100%;
}
</style>
